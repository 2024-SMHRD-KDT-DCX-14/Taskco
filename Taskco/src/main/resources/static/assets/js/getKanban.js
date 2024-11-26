

// 칸반 카드에 넣을 때 필요한 내용
// 카드 제목, 시작일, 종료일, 업무 수행자(차후에 제작), 행 위치(상태), 행 내의 순서

// 0. 매개변수가 되는 프로젝트 고유번호를 가져오기.
// 세션에서 가져옴. 
// 테스트용 세션 설정. --> 나중에 제거
sessionStorage.setItem('PJ_ID', '27B74844-1F13-48A8-E060-16AC02006CBF');

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
			pIdx: task.pIdx,  // 프로젝트 인덱스
			order: task.kanOrder,  // 칸반카드 위치
			color: task.kanColor  // 칸반카드 색깔
		};


		// 카드의 정보를 모조리 담는 kanList
		kanList.push(data)


	}); // 반복문 끝

	console.log(kanList);

	// 밖에서 사용할 수 있게 해주는 콜백 함수. 
	return kanList;


}

/* 카드가 드래그 가능하게 만들어주는 함수. */
function dragEnable(card) {
	/* 드래그를 시작할 때 색깔 변화 */
	card.addEventListener("dragstart", () => {
		card.classList.add("is-dragging");


	});
	/* 드래그를 종료할때 색깔 변화 */
	card.addEventListener("dragend", () => {
		card.classList.remove("is-dragging");
	});

}


// 카드 생성 메소드 : 가져올 때는 행 내의 순서로 가져올 것. assinged는 수행인원인데 별도 함수를 다시 만들 것.
// idx키 이용해서 정보 가져와야함. -> db도 복합 pk로 수정할 것. 
function addCard(data) {

	// DOM 요소 생성
	const card = document.createElement("div") // div 요소 생성
	card.classList.add("task"); //card의 클래스를 task로 설정
	card.setAttribute("draggable", "true") // card의 draggable 속성을 true로 설정함. 

	//수행인원 처리는 고민 해볼 것. 
	card.innerHTML =

		`
          <p class="task-head">${data.title}</p>
          <hr>
          <p class="task-date"> <span>${data.stDt}</span> ~ <span>${data.edDt}</span></p>
          <p class="task-performer">수행인원</p>
          <button class="task-view">상세보기</button> <!-- 클릭하면 내용 볼 수 있게 연결 -->
          <button class="task-update">인원 수정</button>
          <button class="task-delete">삭제</button>
  `
	dragEnable(card) //card는 dom 요소가 아니라 문자열이므로 card로 컨트롤 하면 안됨. 


	return card;
}


// 칸반보드에 카드 추가 메소드
function renderKanbanBoard(kanList) {
	const todoContainer = document.getElementById("todo-lane"); // To-Do 열 DOM
	const doingContainer = document.getElementById("doing"); // Doing 열 DOM
	const doneContainer = document.getElementById("done"); // Done 열 DOM


	kanList.forEach(kanData => { //
		if (kanData.status === "todo") {
			todoContainer.appendChild(addCard(kanData)); //addCard는 DOM 요소이기 때문에 appendChild로 추가
		} else if (kanData.status === "doing") {
			doingContainer.appendChild(addCard(kanData));
		} else if (kanData.status === "done") {
			doneContainer.appendChild(addCard(kanData));
		}

	})

}



