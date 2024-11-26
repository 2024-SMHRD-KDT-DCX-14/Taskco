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
    task.addEventListener("dragend",()=>{
        task.classList.remove("is-dragging");
    });
});

/* 모든 열의 각각의 존 = droppables */
droppables.forEach((zone)=>{
    zone.addEventListener("dragover",(e)=>{ //zone 안에서 drag가 끝나면.
        e.preventDefault(); 

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging")

        if(!bottomTask){
            zone.appendChild(curTask);

        }else{
            zone.insertBefore(curTask,bottomTask);
        }

    });
});

const insertAboveTask = (zone, mouseY) =>{
    const els = zone.querySelectorAll(".task:not(.is-dragging)")

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task)=>{
        const{top} = task.getBoundingClientRect();

        const offset = mouseY-top;

        if(offset<0 && offset > closestOffset){
            closestOffset = offset;
            closestTask = task;

        }

    })

    return closestTask;
};