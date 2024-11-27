const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const addCardBtn = document.getElementById("addCard");


// 테스트용 세션 설정. --> 나중에 제거
sessionStorage.setItem('PJ_ID', '27B74844-1F13-48A8-E060-16AC02006CBF');

// 세션에서 값 가져오기
const pjidx = sessionStorage.getItem('PJ_ID');


addCardBtn.addEventListener("click", (e)=>{

    e.preventDefault(); // 기본 폼 제출 동작 방지
    let value = input.value; // input 값 가져오기.

    // 입력 값이 없으면 "새로운 임무" 추가
    if(!value){
	value = "새로운 임무"
	};
	
	/* 카드 생성 양식 : 나중에 모듈로 바꿔서 불러오는게 좋을 듯 함. addCard 함수로 정의할 것. */ 
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true")

		// 카드에 data-*로 정보를 추가. 
	newTask.setAttribute("data-idx", "null");
	newTask.setAttribute("data-title", value);
	newTask.setAttribute("data-content", "");
	newTask.setAttribute("data-stDt", "");
	newTask.setAttribute("data-edDt", "");
	newTask.setAttribute("data-status", "todo");
	newTask.setAttribute("data-pIdx", pjidx);
	newTask.setAttribute("data-order", "");
	newTask.setAttribute("data-color", "");



    
    newTask.innerHTML = `
        <p class="task-head">${value}</p>
        <hr>
        <p class="task-date">시작일 ~ 완료일</p>
        <p class="task-performer">업무 수행인원 명단</p>
        <button class="task-view">상세보기</button>
        <button class="task-update">인원 수정</button>
        <button class="task-delete">삭제</button>
    `;

    //
    newTask.addEventListener("dragstart",()=>{
        newTask.classList.add("is-dragging");
    });

    /* 드래그를 종료할때 색깔 변화 */
    newTask.addEventListener("dragend",()=>{
        newTask.classList.remove("is-dragging");
    });

    todoLane.appendChild(newTask);

    //인풋값 초기화
    input.value = ""

})


