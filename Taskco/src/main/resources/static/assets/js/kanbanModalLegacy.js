
// 모달창 상세보기 -> 수정 전환 이벤트
const kanModalSaveBtn = document.getElementById("kanModalSaveBtn"); // 모달 창 저장 버튼
const kanModalEditBtn = document.getElementById("kanModalEditBtn"); // 모달 창 수정 버튼
const inputFields = document.querySelectorAll("#modal-content input", "#modal-content textarea") // 모달 인풋필드

// 초기 상태 모드 : 보기 전용 모드
function setReadOnlyMode(readonly){
	inputFields.forEach(field => {
		field.readOnly = readonly;
		
		
	})

}


// 수정 버튼 클릭 이벤트
editButton.addEventListener('click', () => {
    setReadonlyMode(false); // 수정 가능 상태로 변경
    editButton.style.display = 'none'; // 수정 버튼 숨김
    saveButton.style.display = 'inline-block'; // 저장 버튼 표시
});

// 저장 버튼 클릭 이벤트
saveButton.addEventListener('click', () => {
    alert('변경 사항이 저장되었습니다.');
    setReadonlyMode(true); // 다시 보기 전용 상태로 전환
    saveButton.style.display = 'none'; // 저장 버튼 숨김
    editButton.style.display = 'inline-block'; // 수정 버튼 표시
});


//칸반 모달 생성 함수
function createModal(){
	
	function createKanbanEditModal() {
  // 모달 외부 컨테이너
  const modal = document.createElement("div");
  modal.id = "kanEditModal";
  modal.className = "hidden";

  // 모달 내부 컨테이너
  const modalBody = document.createElement("div");
  modalBody.id = "modalBody";

  // 모달 상단 태그
  const header = document.createElement("h1");
  header.textContent = "모달창 내용!";
  modalBody.appendChild(header);

  

  // 모달 컨텐츠 컨테이너
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";

  // 모달 컨텐츠
  const modalContent = document.createElement("div");
  modalContent.id = "modal-content";

  // 제목 입력
  const titleLabel = document.createElement("label");
  titleLabel.htmlFor = "modalTitle";
  titleLabel.textContent = "제목 : ";
  modalContent.appendChild(titleLabel);

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "modalTitle";
  modalContent.appendChild(titleInput);

  modalContent.appendChild(document.createElement("br"));

  // 상태 표시
  const statusParagraph = document.createElement("p");
  statusParagraph.id = "modalStatus";
  modalContent.appendChild(statusParagraph);

  modalContent.appendChild(document.createElement("br"));

  // 날짜 입력
  const startLabel = document.createElement("label");
  startLabel.htmlFor = "modalStDt";
  startLabel.textContent = "시작일 :";
  modalContent.appendChild(startLabel);

  const startDateInput = document.createElement("input");
  startDateInput.type = "date";
  startDateInput.id = "modalStDt";
  modalContent.appendChild(startDateInput);

  const dateSeparator = document.createElement("span");
  dateSeparator.textContent = " ~ ";
  modalContent.appendChild(dateSeparator);

  const endLabel = document.createElement("label");
  endLabel.htmlFor = "modalEdDt";
  endLabel.textContent = "종료일 :";
  modalContent.appendChild(endLabel);

  const endDateInput = document.createElement("input");
  endDateInput.type = "date";
  endDateInput.id = "modalEdDt";
  modalContent.appendChild(endDateInput);

  modalContent.appendChild(document.createElement("br"));

  // 담당자 입력
  const assignerContainer = document.createElement("div");
  assignerContainer.id = "assigner-container";

  const assignerLabel = document.createElement("label");
  assignerLabel.htmlFor = "assigner-current";
  assignerLabel.textContent = "담당자";
  assignerContainer.appendChild(assignerLabel);

  const assignerInput = document.createElement("input");
  assignerInput.type = "text";
  assignerInput.id = "assigner-current";
  assignerContainer.appendChild(assignerInput);

  const dropdownGroup = document.createElement("div");
  dropdownGroup.className = "btn-group";

  const dropdownButton = document.createElement("button");
  dropdownButton.id = "assigner-dropdown-btn";
  dropdownButton.type = "button";
  dropdownButton.className = "btn btn-danger dropdown-toggle";
  dropdownButton.setAttribute("data-bs-toggle", "dropdown");
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdownButton.textContent = "인원 추가";
  dropdownGroup.appendChild(dropdownButton);

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.className = "dropdown-menu";
  dropdownMenu.id = "assigner-dropdown-chose";
  dropdownGroup.appendChild(dropdownMenu);

  assignerContainer.appendChild(dropdownGroup);
  modalContent.appendChild(assignerContainer);

  modalContent.appendChild(document.createElement("br"));

  // 내용 입력
  const contentLabel = document.createElement("label");
  contentLabel.htmlFor = "modalContent";
  contentLabel.textContent = "내용";
  modalContent.appendChild(contentLabel);

  modalContent.appendChild(document.createElement("br"));

  const contentTextarea = document.createElement("textarea");
  contentTextarea.type = "text";
  contentTextarea.id = "modalContent";
  modalContent.appendChild(contentTextarea);

  modalContent.appendChild(document.createElement("br"));

  // 저장 및 수정 버튼
  const saveButton = document.createElement("button");
  saveButton.id = "kanModalSaveBtn";
  saveButton.textContent = "저장";
  modalContent.appendChild(saveButton);

  const editButton = document.createElement("button");
  editButton.id = "kanModalEditBtn";
  editButton.textContent = "수정";
  modalContent.appendChild(editButton);

   // 닫기 버튼
  const closeButton = document.createElement("span");
  closeButton.id = "kanModalCloseBtn";
  closeButton.innerHTML = "닫기"; // 닫기 버튼 내용
  closeButton.style.cursor = "pointer"; // 스타일 추가
  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden"); // 모달 숨기기
  });
  modalBody.appendChild(closeButton);	


  // 모달 컨텐츠 추가
  modalContainer.appendChild(modalContent);
  modalBody.appendChild(modalContainer);
  modal.appendChild(modalBody);

  // 생성된 모달을 body에 추가
  document.body.appendChild(modal);

  return modal;
}



// 모달 생성 및 사용
const kanbanModal = createKanbanEditModal();

// 모달 표시 예제
document.getElementById("openModalButton").addEventListener("click", () => {
  kanbanModal.classList.remove("hidden");
});
	
	
	
	
	
	
}




//칸반 모달 열기 함수
function openKanModal() { // onUpdate(콜백)

	// DOM 요소 불러오기 
	const modal = document.getElementById("kanEditModal"); // 모달 감싸는 객체.
	const title = document.getElementById("modalTitle"); // 제목
	const status = document.getElementById("modalStatus"); // 모달 상태(위치 -> todo 등)
	const stDt = document.getElementById("modalStDt"); // 시작일
	const edDt = document.getElementById("modalEdDt"); // 종료일
	const content = document.getElementById("modalContent"); // 내용
	const assignCurrent = document.getElementById("assigner-current"); // 현재 업무 수행자 칸
	const participant = document.getElementById("project-participant"); // 현재 업무 수행자 칸
	const editBtn = document.getElementById("kanModalEditBtn");// 수정버튼
	const saveBtn = document.getElementById("kanModalSaveBtn");// 저장버튼
	const closeBtn = document.getElementById("kanModalCloseBtn");// 닫기 버튼
	const inputFields = document.querySelectorAll(
        "#modal-content input, #modal-content textarea"
    ); // input 필드 전체 선택
	

	
	// 클릭된 버튼의 부모요소 찾기. 
	const card = event.target.closest(".task") // 클릭된 버튼의 부모요소 찾기.  
	const taskTitle = card.querySelector(".task-head") //제목 선택 card 내부의 요소 dom 선택 -> 최신화할 때 필요함. 
	const taskDate = card.querySelector(".task-date") //날짜 선택

	//모달 창 보이게 하기.
	modal.classList.remove("hidden"); // 버튼을 클릭하면 모달창이 뜸. 

	//default값 설정. //dataset으로 태그에 data-*로 저장된 정보를 가져옴. 
	title.value = card.dataset.title
	status.textContent = `상태 : ${card.dataset.status}`
	stDt.value = card.dataset.stdt
	edDt.value = card.dataset.eddt
	content.value = card.dataset.content
	
	// 보기 전용/수정 가능 상태 전환 함수
    function setReadOnlyMode(readonly) {
        inputFields.forEach((field) => {
            field.readOnly = readonly;
        });
    }

	 // 초기 상태: 보기 전용 모드
    setReadOnlyMode(true);
	saveBtn.style.display = "none"; // 저장 버튼 숨김


	// 수정 버튼 클릭 이벤트
    editBtn.addEventListener("click", () => {
        setReadOnlyMode(false); // 수정 가능 상태
        newSaveBtn.style.display = "inline-block"; // 저장 버튼 표시
        editBtn.style.display = "none"; // 수정 버튼 숨김
    });



	// 모달 저장함수 : 모달 창이 열린 상태에서 클릭하면 저장. 
	const modalSave = () => {

		//data 수정
		card.setAttribute("data-title", title.value);
		card.setAttribute("data-content", content.value);
		card.setAttribute("data-stdt", stDt.value);
		card.setAttribute("data-eddt", edDt.value);

		//DOM에 업데이트된 데이터 반영 표시정보 최신화
		taskTitle.textContent = title.value;
		taskDate.textContent = `${stDt.value} ~ ${edDt.value}`
		
		// 다시 보기 전용 모드로 전환
        setReadOnlyMode(true);
        newSaveBtn.style.display = "none"; // 저장 버튼 숨김
        editBtn.style.display = "inline-block"; // 수정 버튼 표시
				

	}

	// 모달창 수정. 이벤트 리스너 설정
	// 기존 문제 : 클로저로 인해 기존 값을 그대로 card가 기억하게 됨. 
	// 따라서 기존 이벤트 리스너를 제거하고 새로 복제해서 저장한 리스너에서 함수를 실행해야함. 
	// a.replaceWith(b) a를 b로 대체함.
	// b.cloneNode(true) : 깊은복사(true) - 부모요소와 자식요소 복제
	saveBtn.replaceWith(saveBtn.cloneNode(true)); // 기존이벤트 제거
	const newSaveBtn = document.getElementById("kanModalSaveBtn");
	newSaveBtn.addEventListener("click", modalSave)

	//모달창 닫기 함수
	function closeModal() {
		modal.classList.add("hidden"); // 버튼을 클릭하면 모달창을 닫음. 
		newSaveBtn.removeEventListener("click", modalSave) // 기존 이벤트 리스너 제거
		
	}

	// 닫기 버튼 이벤트 리스너
	closeBtn.addEventListener("click", closeModal); // 닫기 버튼
	// 다시 보기 전용 모드로 전환
    setReadOnlyMode(true);
    newSaveBtn.style.display = "none"; // 저장 버튼 숨김
    editBtn.style.display = "inline-block"; // 수정 버튼 표시


}


