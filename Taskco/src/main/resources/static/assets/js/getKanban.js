
const project = document.getElementById("hidden-project-code");

let pjid = project.value;

// 페이지 접근 시 자동 실행. 
document.addEventListener("DOMContentLoaded", async function() {

   const kanList = await KanbanList(pjid)
   if (Array.isArray(kanList) && kanList.length > 0) {
      renderKanbanBoard(kanList); // 준비된 데이터로 렌더링
   } else {
      console.log("No Kanban data available.");
   }
});


// 1. 칸반보드에 카드를 집어 넣는 함수. 렌더링 함수
async function renderKanbanBoard(kanList) {
   const todoContainer = document.getElementById("todo-lane"); // To-Do 열 DOM
   const doingContainer = document.getElementById("doing"); // Doing 열 DOM
   const doneContainer = document.getElementById("done"); // Done 열 DOM


    for (const kanData of kanList) {
        const card = await addCard(kanData);
      if (kanData.status === "todo") { //칸반 status가 todo이면 todo 열에 추가. 밑에도 같음. 
         todoContainer.appendChild(card); //addCard는 DOM 요소이기 때문에 appendChild로 추가
      } else if (kanData.status === "doing") {
         doingContainer.appendChild(card);
      } else if (kanData.status === "done") {
         doneContainer.appendChild(card);
      }

   }

}

// 2. 칸반보드 정보를 DB에서 가져오는 함수. 각 칸반보드의 정보를 list로 가져옴. 리턴 값 : list 
async function KanbanList(pjid) { //db로 요청. callback 자료는 List 형태로 나옴.

   let url = "KanbanList"

   //get으로 프로젝트 고유번호 넣어서 보내기.
   const res = await axios.get(url + "?PJ_ID=" + pjid)
   let tasks = res.data;


   // 상태별 리스트 초기화
   let kanList = [];
   
   
   for(task of tasks){

      let data =
      {
         idx: task.kanIdx, // 칸반카드 인덱스
         title: task.kanTitle, // 칸반카드 제목
         content: task.kanContent, // 칸반카드 내용
         stDt: task.stDt,   // 칸반 카드 시작일
         edDt: task.edDt,   // 칸반 카드 종료일
         status: task.kanStatus, // 칸반 카드 상태
         pIdx: task.pidx,  // 프로젝트 인덱스 - 이유는 모르겠지만 스프링 필드명이 pIdx인데 pidx로 넘어온다. 
         order: task.kanOrder,  // 칸반카드 위치
         color: task.kanColor  // 칸반카드 색깔
      };
      
      // 담당자 정보 리스트
      data.assignerList = await reqKanAssinger(data.idx)
      
      // 카드의 정보를 모조리 담는 kanList
      kanList.push(data)


   }; // 반복문 끝

   console.log(kanList)
   // kanList라는 형식으로 내보내기
   return kanList;

}



/* 카드가 드래그 가능하게 만들어주는 함수. */
// 3. 칸반보드가 드래그 가능하게 하는 함수
function dragEnable(card) {
   /* 드래그를 시작할 때 이벤트 */
   card.addEventListener("dragstart", () => {
      card.classList.add("is-dragging");


   });
   /* 드래그를 종료할때 이벤트 */
   card.addEventListener("dragend", (event) => {

      const draggedCard = event.target;

      // 클릭된 카드의 부모 레인 찾기
      const swimLane = event.target.closest(".swim-lane")

      // 카드에  값에 추가.
      draggedCard.setAttribute("data-status", swimLane.dataset.status);


      card.classList.remove("is-dragging");
   });

}


// 카드 생성 메소드 : 가져올 때는 행 내의 순서로 가져올 것. assinged는 수행인원인데 별도 함수를 다시 만들 것.
// idx키 이용해서 정보 가져와야함. -> db도 복합 pk로 수정할 것. 
async function addCard(data) {


   // DOM 요소 생성
   // card 객체 생성
   let card = document.createElement("div") // div 요소 생성
   card.classList.add("task"); //card의 클래스를 task로 설정
   card.setAttribute("draggable", "true") // card의 draggable 속성을 true로 설정함. 

   // 카드에 data-*로 정보를 추가. 모든 정보를 자동으로 집어 넣음. 
   //Object.entries()는 객체의 속성과 값을 배열 형태로 변환
   // forEach롷 산출된 배열을 확인하면서 값을 dataset에 집어 넣음
   Object.entries(data).forEach(([key, value]) => {
      
   // 삼항 연산자로 data의 타입을 확인해서 json문자열로 변환해서 dataset에 집어넣음
   // 그냥 집어 넣을 경우 assignerList가 "object"로 담기게 됨.
   card.dataset[key] = typeof value === "object" ? JSON.stringify(value) : value;
});
   
   // 기존 방식 -> 하나씩 넣어주는 방식
   /*card.setAttribute("data-idx", data.idx);
   */
   

// 모달 인스턴스 생성 클래스로 불러옴
let kanbanModal = new KanbanModal();


// card 제목
let taskTitle = document.createElement("p") // p 태그로 생성
taskTitle.classList.add("task-head"); // 버튼의 클래스를 task-head로 설정
taskTitle.textContent = card.dataset.title;

// 수평선(hr) 추가
let separatorTop = document.createElement("hr");
separatorTop.classList.add("card-separator");
separatorTop.style.margin = "4px 0"; // 간격을 최소화하여 카드의 크기를 유지

// 시작일~ 종료일 날짜 표시
let taskDate = document.createElement("p") // p 태그로 생성
taskDate.classList.add("task-date"); // 버튼의 클래스를 task-date로 설정
taskDate.textContent = `${card.dataset.stDt} ~ ${card.dataset.edDt}`

// 카드 담당인원 목록 표시 
let assigners = document.createElement("div") // div 태그로 생성 
assigners.classList.add("task-assigner"); // div 클래스 task-assigner
assigners.appendChild(await createAssginerTagInCard(card.dataset.assignerList));

// 수평선(hr) 추가
let separatorBottom = document.createElement("hr");
separatorBottom.classList.add("card-separator");
separatorBottom.style.margin = "4px 0"; // 간격을 최소화하여 카드의 크기를 유지

// card 상세보기/수정 버튼 객체
let editCardBtn = document.createElement("button");
editCardBtn.classList.add("task-edit", "btn", "btn-outline-primary", "btn-sm"); // Bootstrap 스타일 추가-
editCardBtn.textContent = "상세보기";
editCardBtn.addEventListener("click", () => kanbanModal.open(card));

// card 삭제 버튼 객체
let deleteCardBtn = document.createElement("button");
deleteCardBtn.classList.add("task-delete", "btn", "btn-outline-primary", "btn-sm"); // Bootstrap 스타일 추가-
deleteCardBtn.textContent = "삭제";
deleteCardBtn.addEventListener("click", deleteTask);



//dom 요소 배치
card.appendChild(taskTitle) //제목
card.appendChild(separatorTop); // 수평선(hr)
card.appendChild(taskDate)  // 일정
card.appendChild(assigners) // 담당자 카드
card.appendChild(separatorBottom); // 수평선(hr)
card.appendChild(editCardBtn) //카드에 수정버튼 추가.
card.appendChild(deleteCardBtn) //카드에 삭제버튼 추가.



// 드래그 가능하게 해주는 이벤트 등록
dragEnable(card) //card는 dom 요소가 아니라 문자열이므로 card로 컨트롤 하면 안됨. 


return card;
}



//칸반 카드 삭제 함수.
function deleteTask(event) { //event는 자동으로 생성됨. 매개변수 별도로 안넣어줘도 됨. 

   // 클릭된 버튼의 부모요소 찾기. 
   const card = event.target.closest(".task")

   if (confirm("정말로 삭제하시겠습니까?")) {
      card.remove(); //해당 카드 삭제. 

   }

}



// 카드에 표시되는 담당자 정보를 렌더링. 매개변수 = JSON 문자열 
async function createAssginerTagInCard(assignerList) {

   // 1. 이메일에 해당되는 팀원 정보 전부 불러오기.
   //팀원 정보를 전체 다 가져오기.
   const teamMateList = await reqTeamMateList(pjid)
   
   
   /*console.log("assignerList")
   console.log(assignerList)*/

   // 배정된 팀원 정보 가져오기 assignerList
   // currentAssignerList를 Set으로 변환 / json String인 관계로 json으로 변환해줘야함.
   const emailSet = new Set(JSON.parse(assignerList, null, 2).map(item => item.email));

   // 전환된 set와 팀원리스트를 대조해서 emailset에 있는 팀원의 정보(emaillist에는 팀원 이메일만 있음)를 담은 리스트를 생성
   const filteredList = teamMateList.filter(item => emailSet.has(item.email))

   


   // DOM Fragment 생성 가상의 dom 컨테이너라고 생각하면 됨.
   const fragment = document.createDocumentFragment();

   filteredList.forEach(assigner => {
      let span = document.createElement("span");
        span.classList.add("badge", "text-bg-primary");
      span.textContent = assigner.teamMateName;
      span.dataset.email = assigner.email;
      
      // margin 추가
       span.style.margin = "3px";
      
      
      fragment.appendChild(span);
   });


   
   return fragment;



}




