
/* 칸반 보드 정보 저장 */

// 0. 매개변수가 되는 프로젝트 고유번호를 가져오기.
// 세션에서 가져옴. 
// 테스트용 세션 설정. --> 나중에 제거

// 세션에서 값 가져오기 getKanban에서 선언된 pjid

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
	let kanList = [];

	taskElements.forEach(taskElement => { // 각각의 태스크 별로. 


		console.log("idx" + taskElement.dataset.idx);
		console.log("title" + taskElement.dataset.title);
		console.log("idx" + taskElement.dataset.idx);

		// 보낼 카드별 데이터. 키 값이 DTO 테이블명과 같아야함. 
		let data =
		{
			kanIdx: taskElement.dataset.idx, // 칸반카드 인덱스
			kanTitle: taskElement.dataset.title, // 칸반카드 제목
			kanContent: taskElement.dataset.content, // 칸반카드 내용
			stDt: taskElement.dataset.stDt,   // 칸반 카드 시작일
			edDt: taskElement.dataset.edDt,   // 칸반 카드 종료일
			kanStatus: taskElement.dataset.status, // 칸반 카드 상태
			pIdx: pjid,  // 프로젝트 인덱스 -- 세션에서 값을 가져와서 집어 넣기.
			kanOrder: taskElement.dataset.order,  // 칸반카드 위치
			kanColor: taskElement.dataset.color  // 칸반카드 색깔
		};

		console.log(data)

		kanList.push(data); // 칸 리스트에 넣어서 보내기.


	});

	let url = "updateKanban";

	axios.post(url, kanList)
		.then(function(res) {
			console.log(res.data) // 업데이트 완료를 뜨게 할 것. 

		})


}


