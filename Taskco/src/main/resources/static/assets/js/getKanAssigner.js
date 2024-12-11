

// 업무에 배정된 담당자를 불러오기. 


/*
// 1. 이벤트 리스너 
const getKanAssignerBtn = document.getElementById("getAssignerList-test-btn")

getKanAssignerBtn.addEventListener("click", async () => {

	// 0.테스트용 매개변수 설정
	let kIdx = "e6ee6d41-0d9d-40c3-b06c-2b401571e958"
	currentAssignerList = await reqKanAssinger(kIdx)

	renderAssignerList(currentAssignerList);


})
*/


// 담당자 정보를 불러오는 함수 칸반 인덱스 -> 배정된 이메일 정보 
// DB로 요청함.
async function reqKanAssinger(kIdx) {

	//KanbanRestController에서 통합해서 처리. 
	let url = "reqKanAssinger"

	//get으로 프로젝트 고유번호 넣어서 보내기.
	const res = await axios.get(url + "?kan_Idx=" + kIdx)
	let assigners = res.data;

	// 담당자 정보를 배열로 변환
	const assignerList = assigners.map(assigner => ({
		email: assigner.email
	}));


	return assignerList;
}

// 해당 칸반 카드의 data 안에 보관된 정보를 가져오는 함수
function extractEmailsFromArea() {
	// #test-area 안의 모든 배지를 선택
	const badges = document.querySelectorAll("#test-area .alert"); //testArea에서 가져옴 나중에 바꿀 것.

	// email 값을 추출하여 JSON 리스트로 변환
	const emailList = Array.from(badges).map(badge => {
		return { email: badge.dataset.email };
	});
	console.log(emailList);



	return emailList; // JSON 리스트 반환
}

// 사용자 배지를 AREA에 로딩하는 함수. reqKanAssinger(kIdx)로 불러온 리스트를 집어 넣을 것. 
async function renderAssignerList(currentAssignerList) {

	// 배지 생성에 필요한 정보를 가져오기 
	// 1. 인원 비교해서 없는 인원만 산출	
	//팀원 정보를 전체 다 가져오기.
	const teamMateList = await reqTeamMateList(pjid)

	// currentAssignerList를 Set으로 변환
	const emailSet = new Set(currentAssignerList.map(item => item.email));

	// 담당자 정보 currentAssignerList
	const filteredList = teamMateList.filter(item => emailSet.has(item.email))




	// 배지를  추가할 위치 지정
	let testArea = document.querySelector("#test-area")


	filteredList.forEach(assigner => {
		console.log(assigner)

		// 배지 생성에 필요한 정보 가져오기 
		let type = 'primary' // 스타일 설정 부트스트랩에서 선택
		let name = assigner.teamMateName
		let email = assigner.email

		// 배지 템플릿에 담아서 작성
		let badgeTemplate = createAssignerBadge(type, name, email)

		//이름 배지 생성
		const assignerBadge = document.createElement('div')
		assignerBadge.innerHTML = badgeTemplate
		testArea.append(assignerBadge)

	})


}

