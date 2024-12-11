<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" href="assets/css/join.css">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
	crossorigin="anonymous">

</head>
<body>


	<div class="project-logo"
		style="text-align: center; margin-bottom: 20px;">
		<img id="copy-code-img" style="width: 900px;" src="/images/TASKCO.png"
			alt="Taskco Logo">
	</div>
	<div class="container d-flex align-items-center justify-content-center"
		style="min-height: 100vh;">
		<div class="row justify-content-between align-items-center"
			style="width: 100%; max-width: 1200px;">

			<div class="col-md-6">
				<div class="screen">
					<div class="screen__content">
						<form action="join" method="post" enctype="multipart/form-data" >
							<!-- 이메일 -->
							<label for="email" class="form-label">이메일</label> 
							<div class="mb-1">
								<input
									type="text" name="email" id="email" class="form-control">
								<div id="result" class="form-text"></div>
							</div>

							<!-- 비밀번호 -->
							<label for="pw" class="form-label">비밀번호</label>
							<div class="mb-1">
								 <input
									type="text" name="pw" id="pw" class="form-control">
							</div>

							<!-- 이름 -->
							<label for="name" class="form-label">이름</label>
							<div class="mb-1">
								 <input
									type="text" name="name" id="name" class="form-control">
							</div>

							<!-- 상태 메시지 -->
							<label for="status_msg" class="form-label">상태 메시지</label>
							<div class="mb-1">
								 <input
									type="text" name="status_msg" id="status_msg"
									class="form-control">
							</div>

							<!-- 사진  -->
							<label for="status_msg" class="form-label">프로필 사진</label>
							<div class="mb-1">
								 <input
									type="file" name="file" id="file" class="form-control">
							</div>

							<!-- 회원가입 버튼 -->
							<button type="submit" class="btn btn-primary">회원가입</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>




	<!--    <form action="join" method="post">
      이메일<input type="text" name="email" id=email><br>
      <p id="result"></p>
      중복처리 결과 여기에 출력
      비밀번호<input type="text" name="pw"><br>
      <br>
      향후 눈알버튼 넣어서 눈알버튼 클릭시 text, 아닐 경우 password로 바꾸는 로직 추가 예정
      이름<input type="text" name="name"><br>
      <br> 상태메시지<input type="text" name="status_msg"><br>
      
      <br> <input type="submit" value="회원가입">
   </form>  -->


	<!-- axios -->
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<!--joinCheck.js -->
	<script src="assets/js/joinCheck.js"></script>
</body>
</html>