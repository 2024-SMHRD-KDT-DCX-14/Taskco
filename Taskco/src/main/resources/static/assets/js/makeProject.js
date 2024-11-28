// 프로젝트 증가
let projectCounter = 1;

// ID값으로 모달창 띄우는 기능
function openModal(modalId) {
   const modal = document.getElementById(modalId);
   if (modal) {
      modal.style.display = "flex";
   }
}

// ID값으로 모달창 닫는 기능
function closeModal(modalId) {
   const modal = document.getElementById(modalId);
   if (modal) {
      modal.style.display = "none";
   }
}


// 새 프로젝트 생성
function createProject() {
   const titleInput = document.querySelector('input[name="title"]');
   const contentInput    = document.querySelector('textarea[name="content"]');

   const title = titleInput.value.trim();
   const content = contentInput.value.trim();

   if (!title) {
      alert("프로젝트 이름을 입력하세요.");
      return;
   }
   // 프로젝트 리스트에 새로운 항목 추가
   const projectList = document.getElementById('project-list');
   const newRow = document.createElement('tr');

   newRow.innerHTML = `
                        <td>${projectCounter}</td>
                        <td>${title}</td>
                        <td>${content}</td>
                        <td><button onclick="deleteProject(this)">삭제</button></td>
                    `;

   projectList.appendChild(newRow);
   projectCounter++;

   // 입력 필드 초기화 및 모달 닫기
   titleInput.value = "";
   contentInput.value = "";
   closeModal('createModal');
}


// 프로젝트 삭제
function deleteProject(button) {
   const row = button.closest('tr');
   row.remove();
}

// 이벤트 리스너 연결
document.querySelectorAll('.close-btn').forEach(btn => {
   btn.addEventListener('click', () => {
      closeModal(btn.closest('.modal').id);
   });
});

// Event listener for opening modals
document.querySelectorAll('[data-modal]').forEach(button => {
   button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      openModal(modalId);
   });
});

// Event listener for closing modals
document.querySelectorAll('.close-btn').forEach(button => {
   button.addEventListener('click', (e) => {
      const modalId = e.target.closest('.modal').id;
      closeModal(modalId);
   });
});

// 프로젝트 추가 기능
function addProject() {
   let projectCode = document.getElementsByName("projectcode")[0];

   if (projectCode === "") {
      alert("고유번호를 입력하세요.");
      return;
   }

   const newProjectButton = document.getElementsByClassName('button');




   // 입력 필드 초기화 및 모달 닫기
   projectNameInput.value = "";
   closeModal('modal-project');
}




 










