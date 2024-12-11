
let boardCounter = 1;

// 게시글 보기 모달 열기
function openViewModal(b_idx, b_title, b_content, email, b_dt) {
    console.log("openViewModal called with:", { b_idx, b_title, b_content, email, b_dt });

    // 전달받은 데이터를 모달에 삽입
    document.getElementById('modal-b-idx').value = b_idx || "";
    document.getElementById('modal-b-idx-for-del').value = b_idx || "";
    document.getElementById('modal-b-title').value = b_title || "";
    document.getElementById('modal-b-email').value = email || "";
    document.getElementById('modal-b-dt').value = b_dt || "";
    document.getElementById('modal-b-content').value = b_content || "";

    // 모달 열기
    openModal('displayBoardDetail');
}





