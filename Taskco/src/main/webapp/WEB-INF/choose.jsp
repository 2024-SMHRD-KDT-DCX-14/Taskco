<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profile Layout</title>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
	crossorigin="anonymous">

<link href="assets/css/choose.css" rel="stylesheet">

<style>
@font-face {
	font-family: 'GmarketSansMedium';
	src:
		url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff')
		format('woff');
	font-weight: normal;
	font-style: normal;
}
</style>
</head>
<body>
	<header id="upper_nav">
		<div class="project-logo">
			<a href="exit"> <img id="copy-code-img" src="/images/TASKCO.png"
				style="width: 60px; border-radius: 40%; border: 0.5px solid gray;"
				alt="Taskco Logo">
			</a>
		</div>
		<nav>
			<a id="logout" href="/login">Logout</a>
		</nav>
	</header>


	<div id="side_nav">

		<!-- Project List -->
		<div>
			<div id="project_control">
				<div class="joindiv" onclick="openModal('addModal')">
					참가하기
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
						fill="currentColor" class="bi bi-person-plus-fill"
						viewBox="0 0 16 16">
  						<path
							d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
  						<path fill-rule="evenodd"
							d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
					</svg>
				</div>
				<div class="creatediv" onclick="openModal('createModal')">
					생성하기
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
						fill="currentColor" class="bi bi-plus-circle-fill"
						viewBox="0 0 16 16">
  						<path
							d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
					</svg>
				</div>


			</div>
		</div>
		<div style="overflow-y: auto; border: 1px solid #ccc;">

			<div style="width: 100%;">
				<ul id="plist" class="list-group" style="max-width: auto;">
					<c:forEach var="item" items="${list}">
						<li class="list-group-item"><c:choose>
								<c:when test="${item.role == '팀장'}">
									<div class="d-flex justify-content-between"
										OnClick="location.href ='view?p_idx=${item.p_idx}'"
										style="cursor: pointer;">
										<span>${item.p_title}</span><span
											class="badge rounded-pill bg-primary text-white">${item.role}</span>
									</div>
								</c:when>
								<c:otherwise>
									<div class="d-flex justify-content-between"
										OnClick="location.href ='view?p_idx=${item.p_idx}'"
										style="cursor: pointer;">
										<span>${item.p_title}</span><span
											class="badge rounded-pill bg-secondary text-white">${item.role}</span>
									</div>
								</c:otherwise>
							</c:choose></li>
					</c:forEach>
				</ul>
			</div>
		</div>
		<div class="d-flex align-items-center ">
			<input id="search" type="text" placeholder="프로젝트명 검색"
				class="form-control" style="width: 100%">
		</div>
		<!-- Modal -->
		<div class="modal" id="modal1">
			<div class="modal_body" id="modal_content"></div>
			<button class="close-btn" onclick="closeModal('modal1')">닫기</button>
		</div>

	</div>




	<div class="container">
		<!-- 프로필 -->
		<div class="profile">
			<a href="#" onclick="openModal('profileModal')" id="edit_icon"> <!-- 우상단 프로필 수정버튼 -->
				<svg xmlns="http://www.w3.org/2000/svg" width="40px"
					height="
               40px" fill="#5066d6"
					class="bi bi-pencil-square" viewBox="0 0 16 16">
                 <path
						d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                 <path fill-rule="evenodd"
						d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
               </svg>
			</a>
			<div id="profile-img-container">
				<!-- 프로필 사진이 담기는 영역  -->
				<img src="/images/${sessionScope.user.profile_img}"
					alt="Profile Picture">
			</div>
			<br>
			<div id="profile-name-container">
				<!-- 이름 -->
				<span>${sessionScope.user.name }</span>
			</div>
			<div id="profile-status-msg-container">
				<!-- 상태 메시지 -->
				<span>${sessionScope.user.status_msg }</span>
			</div>
			<div id="profile-email-container">
				<!-- 이메일 -->
				<!-- 이메일 아이콘 -->
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
					fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
              <path
						d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
              <path
						d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
            </svg>
				<!-- 이메일 표시 -->
				<span>${sessionScope.user.email }</span>
			</div>
		</div>
		<!-- 프로필 끝 -->
		<hr class="vertical-hr">
		<div id="board"
			style="overflow-y: scroll; height: 85%; width: 90%; border: 1px solid;">
			<table id="list" class="table table-hover table-striped text-center"
				style="border: 1px solid;">
				<tr>
					<td colspan="2">
						<!-- 검색 입력 필드 추가 --> <input id="searchBoard" type="text"
						placeholder="검색..." style="width: auto;">
					</td>
					<td>
						<div class="btn btn-outline-primary"
							onclick="openModal('createBoardModal')">작성</div>
					</td>
				</tr>
				<c:forEach var="board" items="${cruitBoard}">
					<tr
						onclick="openViewModal(${board.b_idx}, '${board.b_title}', '${board.b_content}', '${board.email}', '${board.b_dt}')"
						style="cursor: pointer;">
						<td style="display: none;">${board.b_idx}</td>
						<td class="title_underline">${board.b_title}</td>
						<td>${board.email}</td>
						<td>${board.b_dt}</td>
					</tr>
				</c:forEach>
			</table>
		</div>


	</div>


	<div class="modal" id="addModal">
		<div class="modal_body p-4">
			<form class="modal_input" action="joinProject" method="post"
				enctype="multipart/form-data">
				<h4 class="text-center mb-4">프로젝트 코드 입력</h4>
				<div class="mb-3">
					<label for="p_idx" class="form-label">코드를 입력하세요</label> <input
						type="text" name="p_idx" id="p_idx" class="form-control"
						placeholder="프로젝트 코드" required>
				</div>
				<div class="d-flex justify-content-center gap-3">
					<input class="btn btn-primary px-4" type="submit" value="추가">
					<button type="button" class="btn btn-outline-primary px-4"
						onclick="closeModal('addModal')">닫기</button>
				</div>
			</form>
		</div>
	</div>

	<div class="modal modal-dialog-centered" id="createModal">
		<div class="modal_body2 p-4">
			<form action="createProject" method="post"
				enctype="multipart/form-data">
				<h2 class="text-center mb-4">프로젝트 생성</h2>
				<div class="form-floating mb-4">
					<input type="text" name="p_title" id="p_title" class="form-control"
						placeholder="프로젝트 명"> <label for="p_title"
						class="form-label">프로젝트 명</label>
				</div>
				<div class="form-floating mb-4">
					<textarea class="form-control" placeholder="프로젝트 내용" name="p_desc"
						id="p_desc" style="height: 120px;"></textarea>
					<label for="p_desc" class="form-label">프로젝트 내용</label>
				</div>
				<div class="mb-4">
					<label for="ed_dt" class="form-label">종료 일자를 선택하세요</label> <input
						type="date" name="ed_dt" id="ed_dt" class="form-control">
				</div>
				<div class="submit d-flex justify-content-center">
					<input class="btn btn-primary me-2" type="submit" value="생성">
					<button type="button" class="btn btn-outline-primary"
						onclick="closeModal('createModal')">닫기</button>
				</div>
			</form>
		</div>
	</div>


	<!--프로필 수정 모달창(정환수정) -->

	<div class="modal" id="profileModal">
		<div class="modal_body">
			<h3>프로필 수정</h3>
			<form class="modal_input d-flex flex-column" action="update"
				method="POST" enctype="multipart/form-data">
				<!-- 이름  -->
				<label for="name" class="form-label">이름</label>
				<div class="mb-1">
					<input value="${user.name}" type="text" name="name" id="name"
						class="form-control">
				</div>


				<br>
				<!-- 비밀번호  -->
				<label for="pw" class="form-label">비밀번호</label>
				<div class="mb-1">
					<input value="${user.pw}" type="text" name="pw" id="pw"
						class="form-control">
				</div>
				<br>
				<!-- 상태메시지  -->
				<div>

					<label for="status_msg" class="form-label">상태메시지</label>
					<div class="mb-4">
						<input value="${user.status_msg}" type="text" name="status_msg"
							id="status_msg" class="form-control">
					</div>
					<!-- 사진  -->

					<div class="input-group mb-3">
						<div class="custom-fil">
							<input type="file" class="custom-file-input" name="file"
								id="file"> <label for="file" class="custom-file-label">프로필
								사진 변경</label>
						</div>
					</div>

					<div class="submit d-flex justify-content-center">
						<input class="btn btn-primary" type="submit" value="수정">
						<button type="button" class="btn btn-outline-primary"
							onclick="closeModal('profileModal')">닫기</button>
					</div>
				</div>
			</form>

		</div>



	</div>



	</div>


	<!-- 게시글 작성 모달 -->
	<div class="modalBoard" id="createBoardModal">
		<div class="modal_board_body">
			<form id="boardModalcreate" action="createServerBoard" method="post"
				enctype="multipart/form-data">
				<h2 class="mb-3">게시글 작성</h2>
				<input type="hidden" name="p_idx" value="server">
				<div class="mb-3">
					<label for="b_title" class="form-label">게시글 명:</label> <input
						id="b_title" name="b_title" type="text" class="form-control"
						required>
				</div>
				<div class="mb-3">
					<label for="email" class="form-label">작성자:</label> <input
						id="email" name="email" type="text" value="${user.email}" readonly
						class="form-control">
				</div>
				<div class="mb-3">
					<label for="b_content" class="form-label">내용:</label>
					<textarea id="b_content" name="b_content" rows="5"
						class="form-control" required></textarea>
				</div>
				<div class="mb-3">
					<label for="boardImgFile" class="form-label">이미지:</label> <input
						id="boardImgFile" name="boardImgFile" type="file"
						class="form-control">
				</div>
				<button type="submit" class="btn btn-primary w-100">업로드</button>
			</form>
			<button type="button" class="btn btn-secondary mt-3 w-100"
				onclick="closeModal('createBoardModal')">닫기</button>
		</div>
	</div>

	<!-- 게시글 보기 모달 -->
	<div class="modalBoard" id="displayBoardDetail">
		<div class="modal_board_body">
			<form action="updateServerBoardModal" method="post"
				enctype="multipart/form-data">
				<input type="hidden" name="p_idx" value="server"> <input
					id="modal-b-idx" type="hidden" name="b_idx">
				<h2 class="mb-3">게시글 수정</h2>
				<div class="mb-2">
					<label for="modal-b-title" class="form-label">제목:</label> <input
						id="modal-b-title" name="b_title" type="text" class="form-control"
						required>
				</div>
				<div class="mb-2">
					<label for="modal-b-email" class="form-label">작성자:</label> <input
						id="modal-b-email" name="email" type="text" class="form-control"
						readonly>
				</div>
				<div class="mb-2">
					<label for="modal-b-dt" class="form-label">작성일:</label> <input
						id="modal-b-dt" name="b_dt" type="text" class="form-control"
						readonly>
				</div>
				<div class="mb-2">
					<label for="modal-b-content" class="form-label">내용:</label>
					<textarea id="modal-b-content" name="b_content" rows="5"
						class="form-control" required></textarea>
				</div>
				<button type="submit" class="btn btn-primary w-100">저장</button>
			</form>
			<form action="deleteServerBoard" method="post" class="mt-3">
				<input type="hidden" name="p_idx" value="server"> <input
					id="modal-b-idx-for-del" type="hidden" name="b_idx">
				<button type="submit" class="btn btn-danger w-100">삭제</button>
			</form>
			<button type="button" class="btn btn-secondary mt-3 w-100"
				onclick="closeModal('displayBoardDetail')">닫기</button>
		</div>
	</div>
	<script src="assets/js/makeProject.js" defer></script>
	<script src="assets/js/cruitBoard.js" defer></script>
	<script>
	const OnSearch = () => {
	    const input = document.querySelector("#search");
	    const filter = input.value.toUpperCase();

	    // 모든 li 요소를 선택
	    const list = document.querySelectorAll("#plist li");

	    if (!list.length) {
	        console.error("No list items found under #plist");
	        return;
	    }

	    list.forEach((el) => {
	        // 첫 번째 span 태그를 선택
	        const span = el.querySelector("span:first-child");

	        if (!span) {
	            console.warn("No <span> found inside li:", el);
	            el.style.display = "none";
	            return;
	        }

	        const text = span.textContent.toUpperCase().trim();
	        // 첫 번째 span 태그의 텍스트를 기준으로 필터링
	        el.style.display = text.includes(filter) ? "" : "none";
	    });
	};

	// 검색 기능이 input의 값이 변경될 때 동작하도록 연결
	document.addEventListener("DOMContentLoaded", () => {
	    const searchInput = document.querySelector("#search");
	    if (!searchInput) {
	        console.error("Search input not found.");
	        return;
	    }

	    searchInput.addEventListener("input", OnSearch);
	});

	</script>
</body>
</html>
