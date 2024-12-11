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