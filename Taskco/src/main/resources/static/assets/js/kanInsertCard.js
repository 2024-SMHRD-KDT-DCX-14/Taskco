const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const addCardBtn = document.getElementById("addCard");


// 테스트용 세션 설정. --> 나중에 제거
sessionStorage.setItem('PJ_ID', '27B74844-1F13-48A8-E060-16AC02006CBF');

// 세션에서 값 가져오기
const pjidx = sessionStorage.getItem('PJ_ID');


addCardBtn.addEventListener("click", (e) => {

	console.log("카드 추가 버튼 클릭")
	e.preventDefault(); // 기본 폼 제출 동작 방지
	let value = input.value; // input 값 가져오기.

	//인덱스 값을 uuid로 생성
	let uuid = generateUUID();



	// 입력 값이 없으면 "새로운 임무" 추가
	if (!value) {
		value = "새로운 임무"
	};

	/* 카드 생성 양식 : 나중에 모듈로 바꿔서 불러오는게 좋을 듯 함. addCard 함수로 정의할 것. */
	const newTask = document.createElement("div");
	newTask.classList.add("task");
	newTask.setAttribute("draggable", "true")

	// 카드에 data-*로 정보를 추가. 
	newTask.setAttribute("data-idx", uuid);
	newTask.setAttribute("data-title", value);
	newTask.setAttribute("data-content", "");
	newTask.setAttribute("data-stdt", "");
	newTask.setAttribute("data-eddt", "");
	newTask.setAttribute("data-status", "todo");
	newTask.setAttribute("data-pIdx", pjidx);
	newTask.setAttribute("data-order", "");
	newTask.setAttribute("data-color", "");


	//default값 설정. //dataset으로 태그에 data-*로 저장된 정보를 가져옴. 
	let title = newTask.dataset.title
	let status = newTask.dataset.status
	let stDt = newTask.dataset.stdt
	let edDt = newTask.dataset.eddt
	let content = newTask.dataset.content


	// 모달 인스턴스 생성 클래스로 불러옴
	let kanbanModal = new KanbanModal();

	// 카드 바깥에 표시될 객체 생성
	// card 제목
	const taskTitle = document.createElement("p") // p 태그로 생성
	taskTitle.classList.add("task-head"); // 버튼의 클래스를 task-head로 설정
	taskTitle.textContent = title;

	const separatorTop = document.createElement("hr");
	separatorTop.classList.add("card-separator");
	separatorTop.style.margin = "4px 0"; // 간격을 최소화하여 카드의 크기를 유지


	// 시작일~ 종료일 날짜 표시
	const taskDate = document.createElement("p") // p 태그로 생성
	taskDate.classList.add("task-date"); // 버튼의 클래스를 task-date로 설정
	taskDate.textContent = `${stDt} ~ ${edDt}`;

	// 카드 담당인원 목록 표시 
	let assigners = document.createElement("div") // div 태그로 생성 
	assigners.classList.add("task-assigner"); // div 클래스 task-assigner	

	// 수평선(hr) 추가
	const separatorBottom = document.createElement("hr");
	separatorBottom.classList.add("card-separator");
	separatorBottom.style.margin = "4px 0"; // 간격을 최소화하여 카드의 크기를 유지


	// card 상세보기/수정 버튼 객체
	let editCardBtn = document.createElement("button")
	editCardBtn.classList.add("task-edit", "btn", "btn-outline-primary", "btn-sm"); // 버튼의 클래스를 task-edit로 설정
	editCardBtn.textContent = "상세보기/수정"
	editCardBtn.addEventListener("click", () => kanbanModal.open(newTask));

	// card 삭제 버튼 객체
	const deleteCardBtn = document.createElement("button")
	deleteCardBtn.classList.add("task-delete", "btn", "btn-outline-primary", "btn-sm"); // 버튼의 클래스를 task-delte로 설정
	deleteCardBtn.textContent = "삭제"
	deleteCardBtn.addEventListener("click", deleteTask);



	//dom 요소 배치
	newTask.appendChild(taskTitle) //제목
	newTask.appendChild(separatorTop); // 수평선(hr)
	newTask.appendChild(taskDate)  // 일정
	newTask.appendChild(assigners) // 담당자 카드
	newTask.appendChild(separatorBottom); // 수평선(hr)
	newTask.appendChild(editCardBtn) //카드에 수정버튼 추가.
	newTask.appendChild(deleteCardBtn) //카드에 삭제버튼 추가.



	// 드래그 시작할 때 클래스 변경
	newTask.addEventListener("dragstart", () => {
		newTask.classList.add("is-dragging");
	});

	/* 드래그를 종료할때 클래스 변경 */
	newTask.addEventListener("dragend", (event) => {

		/* 클릭된 카드에 status(열 위치) 정보를 수정함.*/
		const draggedCard = event.target;
		const swimLane = event.target.closest(".swim-lane")	// 클릭된 카드의 부모 레인 찾기 
		console.log(swimLane)
		draggedCard.setAttribute("data-status", swimLane.dataset.status); // 카드에 값에 추가.
		//jsp에 status 값 추가. 

		newTask.classList.remove("is-dragging");
	});

	todoLane.appendChild(newTask);

	//인풋값 초기화
	input.value = ""

})


//uuid 생성 함수
function generateUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (Math.random() * 16) | 0; // 0~15 범위의 무작위 숫자 생성
		const v = c === 'x' ? r : (r & 0x3) | 0x8; // 'x'는 0~15, 'y'는 8~11 중 하나
		return v.toString(16); // 16진수로 변환
	});
}



