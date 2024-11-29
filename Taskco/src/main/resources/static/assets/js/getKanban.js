

// 칸반 카드에 넣을 때 필요한 내용
// 카드 제목, 시작일, 종료일, 업무 수행자(차후에 제작), 행 위치(상태), 행 내의 순서

// 0. 매개변수가 되는 프로젝트 고유번호를 가져오기.
// 세션에서 가져옴. 
// 테스트용 세션 설정. --> 나중에 제거
sessionStorage.setItem('PJ_ID', '27DF12F8-F1EC-FFCF-E060-16AC02003201');

// 세션에서 값 가져오기
const pjid = sessionStorage.getItem('PJ_ID');

// 페이지 접근 시 자동 실행. 
document.addEventListener("DOMContentLoaded", async function() {


	console.log("reqKanban 스크립트 작동. ")
	const kanList = await reqKanban(pjid)
	if (Array.isArray(kanList) && kanList.length > 0) {
		renderKanbanBoard(kanList); // 준비된 데이터로 렌더링
	} else {
		console.log("No Kanban data available.");
	}
});


// 칸반보드에 카드를 집어 넣는 함수. 렌더링 함수
function renderKanbanBoard(kanList) {
	const todoContainer = document.getElementById("todo-lane"); // To-Do 열 DOM
	const doingContainer = document.getElementById("doing"); // Doing 열 DOM
	const doneContainer = document.getElementById("done"); // Done 열 DOM


	kanList.forEach(kanData => { //
		if (kanData.status === "todo") { //칸반 status가 todo이면 todo 열에 추가. 밑에도 같음. 
			todoContainer.appendChild(addCard(kanData)); //addCard는 DOM 요소이기 때문에 appendChild로 추가
		} else if (kanData.status === "doing") {
			doingContainer.appendChild(addCard(kanData));
		} else if (kanData.status === "done") {
			doneContainer.appendChild(addCard(kanData));
		}

	})

}



// 칸반보드 정보를 DB에서 가져오는 함수. 각 칸반보드의 정보를 list로 가져옴. 리턴 값 : list 
async function reqKanban(pjid) { //db로 요청. callback 자료는 List 형태로 나옴.

	let url = "reqKanban"

	//get으로 프로젝트 고유번호 넣어서 보내기.
	const res = await axios.get(url + "?PJ_ID=" + pjid)
	let tasks = res.data;


	// 상태별 리스트 초기화
	let kanList = [];

	tasks.forEach(task => {

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

		// 카드의 정보를 모조리 담는 kanList
		kanList.push(data)


	}); // 반복문 끝

	console.log(kanList)
	// 밖에서 사용할 수 있게 해주는 콜백 함수. 
	return kanList;

}



/* 카드가 드래그 가능하게 만들어주는 함수. */
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
function addCard(data) {


	// DOM 요소 생성
	// card 객체 생성
	const card = document.createElement("div") // div 요소 생성
	card.classList.add("task"); //card의 클래스를 task로 설정
	card.setAttribute("draggable", "true") // card의 draggable 속성을 true로 설정함. 

	// 카드에 data-*로 정보를 추가. 
	card.setAttribute("data-idx", data.idx);
	card.setAttribute("data-title", data.title);
	card.setAttribute("data-content", data.content);
	card.setAttribute("data-status", data.status);
	card.setAttribute("data-pIdx", data.pIdx);
	card.setAttribute("data-order", data.order);
	card.setAttribute("data-color", data.color);

	//날짜 값이 null이면 문자로 넣지 말고 빈칸으로 넣게 하기.
	if (data.stDt == 'null') {
		card.setAttribute("data-stdt", "");
	}
	else { 
	card.setAttribute("data-stdt", data.stDt);
	}
	
	if (data.edDt == 'null') {
		card.setAttribute("data-eddt", "");
	}
	else { 
	card.setAttribute("data-eddt", data.edDt);
	}
	
	

//default값 설정. //dataset으로 태그에 data-*로 저장된 정보를 가져옴. 
let title = card.dataset.title
let status = card.dataset.status
let stDt = card.dataset.stdt
let edDt = card.dataset.eddt
let content = card.dataset.content


// 카드 바깥에 표시될 객체 생성
// card 제목
const taskTitle = document.createElement("p") // p 태그로 생성
taskTitle.classList.add("task-head"); // 버튼의 클래스를 task-head로 설정
taskTitle.textContent = title;

// 시작일~ 종료일 날짜 표시
const taskDate = document.createElement("p") // p 태그로 생성
taskDate.classList.add("task-date"); // 버튼의 클래스를 task-date로 설정
taskDate.textContent = `${stDt} ~ ${edDt}`;


// card 수정 버튼 객체
const editCardBtn = document.createElement("button")
editCardBtn.classList.add("task-edit"); // 버튼의 클래스를 task-edit로 설정
editCardBtn.textContent = "상세보기/수정"
editCardBtn.addEventListener("click", openKanModal);

// card 삭제 버튼 객체
const deleteCardBtn = document.createElement("button")
deleteCardBtn.classList.add("task-delete"); // 버튼의 클래스를 task-delte로 설정
deleteCardBtn.textContent = "삭제"
deleteCardBtn.addEventListener("click", deleteTask);



//dom 요소 배치
card.appendChild(taskTitle) //제목
card.appendChild(taskDate)  // 일정
card.appendChild(editCardBtn) //카드에 수정버튼 추가.
card.appendChild(deleteCardBtn) //카드에 삭제버튼 추가.



// 드래그 가능하게 해주는 이벤트 등록
dragEnable(card) //card는 dom 요소가 아니라 문자열이므로 card로 컨트롤 하면 안됨. 


return card;
}


//칸반 모달 함수
function openKanModal() { // onUpdate(콜백)

	// DOM 요소 불러오기 
	const modal = document.getElementById("kanEditModal"); // 모달 감싸는 객체.
	const title = document.getElementById("modalTitle"); // 제목
	const status = document.getElementById("modalStatus"); // 모달 상태(위치 -> todo 등)
	const stDt = document.getElementById("modalStDt"); // 시작일
	const edDt = document.getElementById("modalEdDt"); // 종료일
	const content = document.getElementById("modalContent"); // 내용
	const assignCurrent = document.getElementById("assigner-current"); // 현재 업무 수행자 칸
	const participant = document.getElementById("project-participant"); // 현재 업무 수행자 칸
	const editBtn = document.getElementById("kanModalEditBtn");// 수정버튼
	const saveBtn = document.getElementById("kanModalSaveBtn");// 저장버튼
	const closeBtn = document.getElementById("kanModalCloseBtn");// 닫기 버튼
	const inputFields = document.querySelectorAll(
        "#modal-content input, #modal-content textarea"
    ); // input 필드 전체 선택
	

	
	// 클릭된 버튼의 부모요소 찾기. 
	const card = event.target.closest(".task") // 클릭된 버튼의 부모요소 찾기.  
	const taskTitle = card.querySelector(".task-head") //제목 선택 card 내부의 요소 dom 선택 -> 최신화할 때 필요함. 
	const taskDate = card.querySelector(".task-date") //날짜 선택

	//모달 창 보이게 하기.
	modal.classList.remove("hidden"); // 버튼을 클릭하면 모달창이 뜸. 

	//default값 설정. //dataset으로 태그에 data-*로 저장된 정보를 가져옴. 
	title.value = card.dataset.title
	status.textContent = `상태 : ${card.dataset.status}`
	stDt.value = card.dataset.stdt
	edDt.value = card.dataset.eddt
	content.value = card.dataset.content
	
	// 보기 전용/수정 가능 상태 전환 함수
    function setReadOnlyMode(readonly) {
        inputFields.forEach((field) => {
            field.readOnly = readonly;
        });
    }

	 // 초기 상태: 보기 전용 모드
    setReadOnlyMode(true);
	saveBtn.style.display = "none"; // 저장 버튼 숨김


	// 수정 버튼 클릭 이벤트
    editBtn.addEventListener("click", () => {
        setReadOnlyMode(false); // 수정 가능 상태
        newSaveBtn.style.display = "inline-block"; // 저장 버튼 표시
        editBtn.style.display = "none"; // 수정 버튼 숨김
    });



	// 모달 저장함수 : 모달 창이 열린 상태에서 클릭하면 저장. 
	const modalSave = () => {

		//data 수정
		card.setAttribute("data-title", title.value);
		card.setAttribute("data-content", content.value);
		card.setAttribute("data-stdt", stDt.value);
		card.setAttribute("data-eddt", edDt.value);

		//DOM에 업데이트된 데이터 반영 표시정보 최신화
		taskTitle.textContent = title.value;
		taskDate.textContent = `${stDt.value} ~ ${edDt.value}`
		
		// 다시 보기 전용 모드로 전환
        setReadOnlyMode(true);
        newSaveBtn.style.display = "none"; // 저장 버튼 숨김
        editBtn.style.display = "inline-block"; // 수정 버튼 표시
				

	}

	// 모달창 수정. 이벤트 리스너 설정
	// 기존 문제 : 클로저로 인해 기존 값을 그대로 card가 기억하게 됨. 
	// 따라서 기존 이벤트 리스너를 제거하고 새로 복제해서 저장한 리스너에서 함수를 실행해야함. 
	// a.replaceWith(b) a를 b로 대체함.
	// b.cloneNode(true) : 깊은복사(true) - 부모요소와 자식요소 복제
	saveBtn.replaceWith(saveBtn.cloneNode(true)); // 기존이벤트 제거
	const newSaveBtn = document.getElementById("kanModalSaveBtn");
	newSaveBtn.addEventListener("click", modalSave)

	//모달창 닫기 함수
	function closeModal() {
		modal.classList.add("hidden"); // 버튼을 클릭하면 모달창을 닫음. 
		newSaveBtn.removeEventListener("click", modalSave) // 기존 이벤트 리스너 제거
		
	}

	// 닫기 버튼 이벤트 리스너
	closeBtn.addEventListener("click", closeModal); // 닫기 버튼
	// 다시 보기 전용 모드로 전환
    setReadOnlyMode(true);
    newSaveBtn.style.display = "none"; // 저장 버튼 숨김
    editBtn.style.display = "inline-block"; // 수정 버튼 표시


}


//칸반 카드 삭제 함수.
function deleteTask(event) { //event는 자동으로 생성됨. 매개변수 별도로 안넣어줘도 됨. 

	// 클릭된 버튼의 부모요소 찾기. 
	const card = event.target.closest(".task")

	if (confirm("정말로 삭제하시겠습니까?")) {
		card.remove(); //해당 카드 삭제. 

	}

}

