
/* 칸반 보드 정보 저장 */

/* 저장 버튼  */
const sendbtn = document.getElementById("kanban-update")

// 클릭 시 이벤트 발생
sendbtn.addEventListener("click", updateKanban);


/* 칸반카드를 가져와서 보낼 것. */
function updateKanban() {

    /* 카드를 객체화 시켜서 가져옴.  */
    const taskElements = document.querySelectorAll('.task');
    console.log(taskElements);
    
    /* task 주요 내용을 담을 배열 */
    const tasks = [];    

    
  


}


