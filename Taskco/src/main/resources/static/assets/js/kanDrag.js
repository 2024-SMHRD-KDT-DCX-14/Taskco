/* 변수 선언 */
const draggables = document.querySelectorAll(".task");/* 카드 */
const droppables = document.querySelectorAll(".swim-lane") /* 열 */

/* 드래그 시작 */
draggables.forEach((task)=>{
    /* 드래그를 시작할 때 해당 요소의 class에 is-dragging을 추가 */
    task.addEventListener("dragstart",()=>{

        task.classList.add("is-dragging");


    });
    /* 드래그를 종료할때 클래스에 is-dragging을 제거*/ 
    task.addEventListener("dragend",(event)=>{
		
		/* 클릭된 카드에 status(열 위치) 정보를 수정함. 생성쪽이랑 불러오는 쪽에 각각 추가해야함. */
		const draggedCard = event.target;
		const swimLane = event.target.closest(".swim-lane")	// 클릭된 카드의 부모 레인 찾기 
        draggedCard.setAttribute("data-status", swimLane.dataset.status); // 카드에  값에 추가.

		
        task.classList.remove("is-dragging");
    });
});

/* 모든 열의 각각의 존 = droppables */
droppables.forEach((zone)=>{
    zone.addEventListener("dragover",(e)=>{ //zone 안에서 drag가 끝나면.
        e.preventDefault(); // 기본 드래그 동작(예: 페이지 이동)을 방지

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging")// 드래그 중인 카드

        if(!bottomTask){ // 밑에 태스크가 없으면.
            zone.appendChild(curTask); // 드롭 영역의 마지막에 카드 추가

        }else{
            zone.insertBefore(curTask,bottomTask); // 현재 카드 바로 위에 삽입
        }

    });
});

const insertAboveTask = (zone, mouseY) =>{ //mouse Y위치
    const els = zone.querySelectorAll(".task:not(.is-dragging)") //현재 드래그 중인 카드를 제외한 모든 카드를 선택

    let closestTask = null; 
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task)=>{
        const{top} = task.getBoundingClientRect();// 카드의 화면상 Y 좌표 가져오기

        const offset = mouseY-top; // 마우스 위치와 카드 위치의 차이

        if(offset<0 && offset > closestOffset){
            closestOffset = offset; // 가장 가까운 카드 위치 계산
            closestTask = task; // 놓일 카드 갱신

        }

    })

    return closestTask;
};