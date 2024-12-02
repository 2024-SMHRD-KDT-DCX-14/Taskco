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

<link href="assets/css/makeProject.css" rel="stylesheet">
<link href="assets/css/choose.css" rel="stylesheet">
<style>
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>
</head>
<body>
	<header id="upper_nav">
		<div class="project-logo">
			<a href="exit"> <img id="copy-code-img" style="width: auto;"
				src="/static/assets/images/TASKCO.png" alt="Taskco Logo">
			</a>
		</div>
		<nav>
			<a id="logout" href="/login">Logout</a>
		</nav>
	</header>


	<div id="side_nav">

		<!-- Project List -->
	<div></div>
		<div id="board">
			<table id="project-list" class="table table-bordered">
				<thead>
					<tr>
						<td>프로젝트명</td>
						<td>직책</td>
					</tr>
				</thead>
				<tbody id="list">
					<c:forEach var="item" items="${list}">
						<tr>
							<td OnClick="location.href ='view?p_idx=${item.p_idx}'"
								style="cursor: pointer;">${item.p_title}</a></td>

							<td>${item.role}</td>
						</tr>
					</c:forEach>

				</tbody>

				<div id="project_control">
					<button class="button btn-open-modal2"
						onclick="openModal('createModal')">프로젝트 생성</button>
					<input id="text" type="text">
					<button class="button btn-open-modal3"
						onclick="openModal('addModal')">프로젝트 추가</button>
				</div>
			</table>
		</div>
		<!-- Modal -->
		<div class="modal" id="modal1">
			<div class="modal_body" id="modal_content"></div>
			<button class="close-btn" onclick="closeModal('modal1')">닫기</button>
		</div>

	</div>




	<div class="container">
		<div class="profile">
			<img src="/images/${sessionScope.user.profile_img}"
				alt="Profile Picture"> <br>
			<div>
				<!-- 수정 버튼(모달) => 정환수정 -->
				<span>${sessionScope.user.name }</span> <a href="#"
					onclick="openModal('modal1')"> <img id="edit_icon"
					src="https://cdn-icons-png.flaticon.com/512/7033/7033287.png"
					alt="QR Code">
				</a>


			</div>

			<div class="contact-icons">${sessionScope.user.status_msg }</div>
		</div>



		<div class="details">



			<div class="modal" id="addModal">
				<div class="modal_body">
					<form action="joinProject" method="post"
						enctype="multipart/form-data">
						<h2>프로젝트 코드</h2>
						<span>코드 입력</span> <br> <input name="p_idx" type="text"
							placeholder="프로젝트 코드">
						<button class="addButton" type="submit">추가</button>
						<div class="close-btn">닫기</div>
					</form>
				</div>
			</div>

			<div class="modal" id="createModal">

				<div class="modal_body2">
					<form class="modal_input" action="createProject" method="post"
						enctype="multipart/form-data">

						<h2>프로젝트 생성</h2>
						<div id="form_text">
							<b>프로젝트 명</b> <input name="p_title" type="text" width="100%">
							<b>프로젝트 생성자</b> <input readonly width="100%;"
								value="${user.email }" name="email" type="text"> <b>내용</b>
							<textarea name="p_desc" rows="4" style="resize: none;"></textarea>
							종료 일자를 선택하세요<input type="date" name="ed_dt">
							<div id="form_btn">
								<tr>
									<td colspan="2"><input type="reset" value="초기화"> <input
										type="submit" value="생성"></td>
								</tr>
							</div>
						</div>


					</form>
					<div class="close-btn">닫기</div>
				</div>
			</div>


			<!--프로필 수정 모달창(정환수정) -->

			<div class="modal" id="modal1">
				<div class="modal_body">
					<h2>프로필 수정</h2>
					<form action="update" method="POST" enctype="multipart/form-data">
						<!-- 이름  -->
						<div>
							<label>이름</label> <input name="name" type="text"
								placeholder="변경 이름 입력">
						</div>
						<br>
						<!-- 비밀번호  -->
						<div>
							<label>비밀번호</label> <input name="pw" type="text"
								placeholder="새 이메일 입력">
						</div>
						<br>
						<!-- 상태메시지  -->
						<div>
							<label>상태메시지</label> <input name="status_msg" type="text"
								placeholder="새 상태메시지 입력">
						</div>
						<!-- 사진  -->
						<div>
							<label>사진</label> <input type="file" name="file">


						</div>

						<div class="submit">
							<input type="submit" value="수정">
						</div>
					</form>
					<div class="close-btn" onclick="closeModal('modal1')">닫기</div>
				</div>
			</div>

		</div>

		<!--프로젝트 생성 모달창 js  -->
		<script src="assets/js/makeProject.js"></script>
</body>
</html>
