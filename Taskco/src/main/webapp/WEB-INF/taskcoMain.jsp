<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profile Layout</title>

<link rel="stylesheet" href="assets/css/profilepage.css">
<link href="assets/css/makeProject.css" rel="stylesheet">


</head>
<body>
	<div class="container">
		<div class="profile">
			<img
				src="https://i3n.news1.kr/system/photos/2022/4/7/5306119/high.jpg"
				alt="Profile Picture">
			<!-- 회원 들어갈 자리 -->
			
			<!-- not empty user: 일반 로그인 세션값 불러오기  -->
        	<!-- not empty sessionScope: 구글 로그인 세션값 불러오기  -->
			<c:choose>
				<c:when test="${not empty user}">
           			 ${user.name}
        		</c:when>
				<c:when test="${not empty sessionScope.sessionScope}">
           			 ${sessionScope.sessionScope.name}
        		</c:when>
			</c:choose>

			<!--전화번호,gmail,링크드인,깃허브,페이팔,QR생성기 -->
			<div class="contact-icons">
				<a href="tel:+123456789" target="_blank"><img
					src="https://cdn4.iconfinder.com/data/icons/social-media-2097/94/phone-512.png"
					alt="Mobile"></a> <a href="mailto:junjeonproject@gmail.com"
					target="_blank"><img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
					alt="Email"></a> <a
					href="https://www.linkedin.com/in/jun-jeon-abc123/" target="_blank"><img
					src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
					alt="LinkedIn"></a> <a href="https://github.com/username"
					target="_blank"><img
					src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
					alt="Github"></a> <a href="https://www.paypal.me/username"
					target="_blank"><img
					src="https://w7.pngwing.com/pngs/720/939/png-transparent-paypal-computer-icons-logo-paypal-blue-angle-service-thumbnail.png"
					alt="PayPal"></a> <a href="https://www.qr-code-generator.com"
					target="_blank"><img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s"
					alt="QR Code"></a>
			</div>
		</div>

		<div class="details">
			<div class="project">
				<div class="button" id="projBtn">프로젝트 생성</div>

			</div>

		</div>

		<!-- 모달 창 -->
		<div id="projectModal">
			<div class="modal-content">
				<span class="close" onclick="closeModal()">&times;</span>
				<h2>프로젝트 생성</h2>
				<form id="projectForm" action="ProjectMain.jsp" method="post"
					accept-charset="UTF-8">
					<label for="projectName">프로젝트명:</label> <input type="text"
						id="projectName" name="projectName" required> <br> <br>
					<button type="button" onclick="createProject()">생성</button>
				</form>
			</div>
		</div>


	</div>

	<!--프로젝트 생성 모달창 js  -->
	<script src="assets/js/makeProject.js"></script>

</body>
</html>
