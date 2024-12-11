// 세션에서 값 가져오기 -> getkanban에서 정의되어 있음. 
// 프로젝트 고유번호 pjid

// 0.테스트용 매개변수 설정
let kIdx = "e6ee6d41-0d9d-40c3-b06c-2b401571e958"


// 담당자 정보를 불러온느 함수 칸반 인덱스 -> 배정된 이메일 정보
//reqKanAssinger(kIdx) 

// 프로젝트 참여자 전체의 정보를 불러오는 함수
//reqTeamMateList(pjid)


/*
// 테스트 버튼
testBtn = document.getElementById("test-btn")

testBtn.addEventListener("click", getTmDropDownMenu);
*/


//버튼 드롭다운 메뉴에 정보 집어 넣을 위치. 
const tMDropDownMenu = document.getElementById("assigner-dropdown-chose-test")

//드롭다운 메뉴 가져오기. getTmDropDownMenu 
async function getTmDropDownMenu() {

	// 1. 인원 비교해서 없는 인원만 산출	
	//팀원 정보를 전체 다 가져오기.
	const teamMateList = await reqTeamMateList(pjid)

	// 담당자 정보를 불러오는 함수 칸반 인덱스 -> 배정된 이메일 정보 이건 나중에 HTML에 있는데 데이터에서 가져오게 바꿀 것.
	const currentAssigners = await reqKanAssinger(kIdx)
	
	//담당자 정보를 AREA에서 불러옴. -> 차후에 모달창 에어리어로 수정. 해당 함수는 getKanAssigner에 있음
	let inAreaEmailList = extractEmailsFromArea()

	// 담당자 정보를 저장. 팀원 전체 정보에서 담당자 정보를 제거.
	const emailToRemove = new Set(inAreaEmailList.map(item => item.email)); //리스트의 각 요소 item을 순회하며 email을 추출

	// list1에서 중복 id 제거
	const filteredList = teamMateList.filter(item => !emailToRemove.has(item.email));

	//콘솔 로그	
	console.log("filteredList:" + filteredList);




	//2. 산출된 인원을 리스트에 추가
	// 드롭다운 초기화
	tMDropDownMenu.innerHTML = ""; // 기존 항목 제거

	if (filteredList && filteredList.length > 0) { //가능한 팀원이 있는 경우

		//각각의 인원마다 드롭다운 메뉴에 추가.
		filteredList.forEach(teamMate => {


			// 형식 - class가 부트스트랩인 관계로 바꾸지 말 것.
			// <li><a class="dropdown-item" href="#">Action</a></li> 태그 형식으로 집어 넣어야함. 
			// 1. <li> 태그 생성
			let li = document.createElement('li');

			// 2. <a> 태그 생성
			let a = document.createElement('a');
			a.className = 'dropdown-item'; // 클래스 설정
			a.href = '#';                 // href 속성 설정
			a.textContent = `${teamMate.teamMateRole} - ${teamMate.teamMateName}`     // 들어갈 텍스트 설정
			a.setAttribute("data-email", teamMate.email) //이메일을 데이터 형식으로 보관
			a.setAttribute("data-role", teamMate.teamMateRole) //역할을 데이터 형식으로 보관
			a.setAttribute("data-name", teamMate.teamMateName) //이름을 데이터 형식으로 보관

			// 3. <a> 태그를 <li> 태그에 추가
			li.appendChild(a);



			// 4. <li> 태그를 <ul id="menu">에 추가
			tMDropDownMenu.appendChild(li);

			addAssignerToCard(a)

		});

	}
	else { //가능한 팀원이 없는 경우
		// 1. <li> 태그 생성
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.className = 'dropdown-item'; // 클래스 설정
		a.href = '#';                 // href 속성 설정
		a.textContent = "가능한 인원이 없습니다"     // 들어갈 텍스트 설정

		// 3. <a> 태그를 <li> 태그에 추가
		li.appendChild(a);

		// 4. <li> 태그를 <ul id="menu">에 추가
		tMDropDownMenu.appendChild(li);

	}

}


//해당 드롭다운 메뉴에서 클릭 시 태그가 추가되게 하는 함수
function addAssignerToCard(dropDownAtag) {

	//드롭다운의 해당 a태그클 클릭하면 발동.
	dropDownAtag.addEventListener("click", () => {

		// 배지 생성에 필요한 정보 가져오기 
		let type = 'primary' // 스타일 설정 부트스트랩에서 선택
		let name = dropDownAtag.dataset.name
		console.log(name)
		let email = dropDownAtag.dataset.email

		// 배지 양식
		let badgeTemplate = createAssignerBadge(type, name, email)

		//이름 배지 생성
		const assignerBadge = document.createElement('div')
		assignerBadge.innerHTML = badgeTemplate


		// 추가할 위치 지정 및 추가
		let testArea = document.querySelector("#test-area")
		testArea.append(assignerBadge)


	});
}


// 이름배지를 만드는 함수
function createAssignerBadge(type, name, email) { //type은 배지 스타일. // CSS는 나중에 따로 뺄 것.
	let badge = [
		`<div class="alert alert-${type} alert-dismissible" role="alert" data-email="${email}"`,
		` style="display: inline-block; position: relative; font-size: 15px; padding: 5px $5px; max-width: 100%; word-break: break-word; text-align: center;">`,
		`   <div style="display: inline-block; margin-right: 20px;">${name}</div>`,
		`   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"`,
		` style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%);"></button>`,
		`</div>`,
	].join('')

	return badge

}


