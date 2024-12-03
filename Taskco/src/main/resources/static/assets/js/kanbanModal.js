class KanbanModal {
	constructor() {
		this.modal = this.createModal();
		this.initEvents();
		this.currentCard = null; // 현재 편집 중인 카드
		this.state = {}; // 모달 상태
		this.isEditMode = false;
	}

	// 모달 생성
	createModal() {
		const modal = document.createElement("div");
		modal.id = "kanEditModal";
		modal.className = "hidden";

		modal.innerHTML = `
      <div id="modalBody">
        <h1>카드 상세보기</h1>
        <div id="modal-content">
          <label for="modalTitle">제목:</label>
          <input type="text" id="modalTitle"><br>
          <label for="modalStDt">시작일:</label>
          <input type="date" id="modalStDt">
          <span> ~ </span>
          <label for="modalEdDt">종료일:</label>
          <input type="date" id="modalEdDt"><br>
				<!-- 인원 추가 버튼 -->
			  <div class="btn-group">
			  	<button id ="kan-modal-add-assigner-btn" type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">인원 추가 </button>
				<!-- 추가할 인원이 나오는 드롭메뉴 -->	
			  	<ul class="dropdown-menu" id="assigner-dropdown-chose-menu"></ul>
			  </div>
				<!-- 추가할 인원 배지가 추가되는 곳 -->	
			  <div id = "current-assigner-area"></div>a
      		<label for="modalContent">내용:</label><br>
      		<textarea id="modalContent"></textarea><br>
        </div>
        <div id="modal-actions">
          <span id="kanModalSaveBtn">저장</span>
          <span id="kanModalEditBtn">수정</span>
          <span id="kanModalCloseBtn" style="cursor: pointer;">닫기</span>
        </div>
      </div>
    `;

		document.body.appendChild(modal);
		return modal;
	}

	// 이벤트 초기화
	initEvents() {
		this.modal.querySelector("#kanModalCloseBtn").addEventListener("click", () => this.close());
		this.modal.querySelector("#kanModalSaveBtn").addEventListener("click", () => this.save());
		this.modal.querySelector("#kanModalEditBtn").addEventListener("click", () => this.enableEditMode());
		this.modal.querySelector("#kan-modal-add-assigner-btn").addEventListener("click", () => this.dropDownMenu());

	}

	// 모달 열기
	open(card) {
		this.resetState();
		this.currentCard = card; // 현재 카드 참조
		this.state = { ...card.dataset }; // 카드 데이터 복사
		this.render(); // 데이터 주입
		this.setReadOnlyMode(true); // 읽기 전용 모드
		this.modal.classList.remove("hidden"); // 모달 표시
		this.isEditMode = false;
		console.log("isEditMode :",this.isEditMode)
		this.renderAssignerList() // 담당자 정보 렌더링
		this.toggleAssignerButtonVisibility(); // 인원 추가 버튼 표시함수
		this.toggleAssignerDeleteButtonVisibility(); // 담당자 삭제버튼 표시함수
		
	}

	// 모달 닫기
	close() {
		this.modal.classList.add("hidden"); // 모달 숨기기
		this.currentCard = null; // 현재 카드 참조 해제
	}
	
    // 상태 초기화
    resetState() {
        this.currentCard = null;
        this.state = {};
        let assignerArea = this.modal.querySelector("#current-assigner-area");
        assignerArea.innerHTML = ""; // 담당자 초기화
    }

	
	// 저장
	async save() {
		if (!this.currentCard) return;

		// 1. 모달 필드 값으로 `this.state` 업데이트
		this.state.title = this.modal.querySelector("#modalTitle").value; //제목
		this.state.stDt = this.modal.querySelector("#modalStDt").value; // 시작일
		this.state.edDt = this.modal.querySelector("#modalEdDt").value; // 종료일 
		this.state.content = this.modal.querySelector("#modalContent").value; // 내용
		this.state.assignerList = JSON.stringify(this.extractDataFromAssignerArea()) //업무 담당자 목록 이메일 문자열로 변환.
	/*	console.log("state.assignerList")
		console.log(this.state.assignerList)*/
		

		// 2.상태를 카드 데이터에 반영
		Object.entries(this.state).forEach(([key, value]) => {
			this.currentCard.dataset[key] = value;
		});

		// 3. DOM 업데이트
		this.currentCard.querySelector(".task-head").textContent = this.state.title;
		this.currentCard.querySelector(".task-date").textContent = `${this.state.stDt} ~ ${this.state.edDt}`;
		
	    // 담당자 업데이트
	    const assignersContainer = this.currentCard.querySelector(".task-assigner");
	   /* assignersContainer.textContent = ""; // 기존 내용을 초기화
	    assignersContainer.appendChild(await createAssginerTagInCard(this.state.assignerList));*/
	    assignersContainer.replaceChildren(await createAssginerTagInCard(this.state.assignerList));
		
		
		
		
		this.disableEditMode(); // 모달 닫기
		alert("카드 정보가 저장되었습니다.");
	}

	// 읽기 전용/편집 가능 모드 전환
	setReadOnlyMode(readonly) {
		const inputs = this.modal.querySelectorAll("#modal-content input, #modal-content textarea");
		inputs.forEach((input) => (input.readOnly = readonly));
		this.modal.querySelector("#kanModalSaveBtn").style.display = readonly ? "none" : "inline-block";
		this.modal.querySelector("#kanModalEditBtn").style.display = readonly ? "inline-block" : "none";
	}

	// 편집 모드 활성화
	enableEditMode() {
		this.isEditMode = true; // 편집모드 활성화 여부 
		this.setReadOnlyMode(false); // 읽기 전용 해제
		this.toggleAssignerButtonVisibility(); // 인원 추가 버튼 보이게 하기
		this.toggleAssignerDeleteButtonVisibility(); // 담당자 삭제버튼 보이게 하기
	}

	// 편집 모드 비활성화
	disableEditMode() {
		this.isEditMode = false; // 편집모드 활성화 여부
		this.setReadOnlyMode(true); // 읽기 전용 해제
		this.toggleAssignerButtonVisibility(); // 인원 추가 버튼 숨기기
		this.toggleAssignerDeleteButtonVisibility(); // 담당자 삭제버튼 숨기기
	}

	// 상태 기반으로 필드 렌더링
	render() {
		this.modal.querySelector("#modalTitle").value = this.state.title || "";
		this.modal.querySelector("#modalStDt").value = this.state.stDt || "";
		this.modal.querySelector("#modalEdDt").value = this.state.edDt || "";
		this.modal.querySelector("#modalContent").value = this.state.content || "";
	}

	// 인원추가 드롭다운 메뉴 
	async dropDownMenu() {
		
		//console.log("this.currentCard:", this.currentCard);

		// 1. 인원 비교해서 없는 인원만 산출	
		//팀원 정보를 전체 다 가져오기.
		let teamMateList = await reqTeamMateList(pjid)
		/*console.log("teamMateList:");
		console.log(teamMateList);*/
		
		//담당자 정보를 Current AREA에서 불러옴. -> 차후에 모달창 에어리어로 수정. 해당 함수는 getKanAssigner에 있음
		let inAreaAssignerList = this.extractDataFromAssignerArea()
		/*console.log("inAreaAssignerList:");
		console.log(inAreaAssignerList);*/
		
		
		// 담당자 정보를 저장. 팀원 전체 정보에서 담당자 정보를 제거.
		let emailToRemove = new Set(inAreaAssignerList.map(item => item.email)); //리스트의 각 요소 item을 순회하며 email을 추출
		/*console.log("emailToRemove:");
		console.log(emailToRemove);*/
		
		// list1에서 중복 id 제거
		let filteredList = teamMateList.filter(item => !emailToRemove.has(item.email));

		//콘솔 로그	-- 정상적으로 나옴
/*		console.log("filteredList:");
		console.log(filteredList);*/
		

		//버튼 드롭다운 메뉴에 정보 집어 넣을 위치. 
		//const dropDownMenu = document.getElementById("assigner-dropdown-chose-menu")
		let dropDownMenu = this.modal.querySelector("#assigner-dropdown-chose-menu")
		//console.log(dropDownMenu)
		
		
		// 5. DropDown 메뉴 초기화
        dropDownMenu.innerHTML = "";
		

		if (filteredList && filteredList.length > 0) { //가능한 팀원이 있는 경우

			//각각의 인원마다 드롭다운 메뉴에 추가.
			filteredList.forEach(teamMate => {

				/*// 잘 담김
				console.log("팀메이트 정보 :")
				console.log(teamMate)*/

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
				dropDownMenu.appendChild(li);
				
				// 드롭다운 클릭 이벤트 추가
				this.addAssignerToModal(a)

			});

		}


	}



	// 담당자 배지를 모달창 화면에 렌더링하는 함수.
	async renderAssignerList() {

		// 배지 생성에 필요한 정보를 가져오기 
		//팀원 정보를 전체 다 가져오기.
		let teamMateList = await reqTeamMateList(pjid)
		//현재 배정된 팀원 정보 가져오기
		let currentAssignerList = this.state.assignerList

		// currentAssignerList를 Set으로 변환 / json 객체인 관계로 json으로 변환해줘야함.
		let emailSet = new Set(JSON.parse(currentAssignerList, null, 2).map(item => item.email));

		// 전환된 set와 팀원리스트를 대조해서 emailset에 있는 팀원의 정보(emaillist에는 팀원 이메일만 있음)를 담은 리스트를 생성
		let filteredList = teamMateList.filter(item => emailSet.has(item.email))

		// 배지를  추가할 위치 지정
		let assignerArea = this.modal.querySelector("#current-assigner-area")
		assignerArea.textContent = "" // 초기화

		filteredList.forEach(assigner => {

			// 배지 생성에 필요한 정보 가져오기 
			let type = 'primary' // 스타일 설정 부트스트랩에서 선택
			let name = assigner.teamMateName
			let email = assigner.email

			// 배지 템플릿에 담아서 작성
			let badgeTemplate = this.createAssignerBadge(type, name, email)

			//이름 배지 생성
			const assignerBadge = document.createElement('div')
			assignerBadge.innerHTML = badgeTemplate
			assignerArea.append(assignerBadge)

		})


	}


	// 해당 칸반 카드의 Area안에 보관된 정보를 가져오는 함수
	extractDataFromAssignerArea() {
		// #test-area 안의 모든 배지를 선택
		let badges = this.modal.querySelectorAll("#current-assigner-area .alert"); //testArea에서 가져옴 나중에 바꿀 것.

		// email 값을 추출하여 JSON 리스트로 변환
		let emailList = Array.from(badges).map(badge => {
			return { email: badge.dataset.email };
		});
		//console.log(emailList);



		return emailList; // JSON 리스트 반환
	}

	// 담당자 표시 배지를 만드는 함수
	createAssignerBadge(type, name, email) { //type은 배지 스타일. // CSS는 나중에 따로 뺄 것.
		 // isEditMode 상태에 따라 버튼 스타일을 설정
    	const closeButtonStyle = this.isEditMode ? "" : "display: none !important;";
	
	
		let badge = [
			`<div class="alert alert-${type} alert-dismissible" role="alert" data-email="${email}"`,
			` style="display: inline-block; position: relative; font-size: 15px; padding: 5px $5px; max-width: 100%; word-break: break-word; text-align: center;">`,
			`   <div style="display: inline-block; margin-right: 20px;">${name}</div>`,
			`   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"`,
			` style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%);  ${closeButtonStyle} "></button>`,
			`</div>`, // 이거 집어넣기 display: none !important;
		].join('')

		return badge

	}

	// 드롭다운 메뉴에 인원정보 랜더링 
	addAssignerToModal(dropDownAtag) {

		//드롭다운의 해당 a태그클 클릭하면 발동.
		dropDownAtag.addEventListener("click", () => {

			// 배지 생성에 필요한 정보 가져오기 
			let type = 'primary' // 스타일 설정 부트스트랩에서 선택
			let name = dropDownAtag.dataset.name
			// console.log(name)
			let email = dropDownAtag.dataset.email

			// 배지 양식
			let badgeTemplate = this.createAssignerBadge(type, name, email)

			//이름 배지 생성
			const assignerBadge = document.createElement('div')
			assignerBadge.innerHTML = badgeTemplate


			// 추가할 위치 지정 및 추가
			let assignerArea = this.modal.querySelector("#current-assigner-area")
			assignerArea.append(assignerBadge)


		});
	}


	// "인원 추가" 버튼 표시 제어
	toggleAssignerButtonVisibility() {
		let addAssignerButton = this.modal.querySelector("#kan-modal-add-assigner-btn");
		if (this.isEditMode) {
			addAssignerButton.style.display = "inline-block"; // 수정 모드에서 표시
		} else {
			addAssignerButton.style.display = "none"; // 읽기 전용 모드에서 숨김
		}
	}


	// 담당자 삭제 버튼 표시 제어
	toggleAssignerDeleteButtonVisibility() {
		let deleteAssignerButtons = this.modal.querySelectorAll("#current-assigner-area .btn-close");


		deleteAssignerButtons.forEach(button => {
			if (this.isEditMode) {
				button.style.display = "inline-block"; // 수정 모드에서 표시
			} else {
				button.style.display = "none"; // 읽기 전용 모드에서 숨김
			}

		})

	}
	


	} // KanbanModal클래스 끝




