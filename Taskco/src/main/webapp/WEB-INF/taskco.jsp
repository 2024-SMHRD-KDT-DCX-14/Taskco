<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>


<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Taskco Login</title>
<!-- 부트스트랩 및 스타일 -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
	crossorigin="anonymous">
<link rel="stylesheet" href="assets/css/login1.css">



<script>
	// 로그인 실패 메시지 처리
	window.onload = function() {
		var loginError = '${loginError}';
		if (loginError) {
			alert(loginError); // JavaScript alert로 실패 메시지 표시
		}
	}
</script>
</head>

<body>
	<!-- 로고 섹션 -->

	<div class="project-logo"
		style="text-align: center; margin-bottom: 20px;">
		<img id="copy-code-img" style="width: 900px;" src="/images/TASKCO.png"
			alt="Taskco Logo">
	</div>

	<div class="container d-flex align-items-center justify-content-center"
		style="min-height: 100vh;">
		<div class="row justify-content-between align-items-center"
			style="width: 100%; max-width: 1200px;">


			<!-- 로그인 폼 섹션 -->
			<div class="col-md-6">
				<div class="screen">
					<div class="screen__content mt-3">
						<form class="login" action="login" method="post">
							<!-- 이메일 -->
							<div class="form-floating mb-2">
								<input type="text" name="email" id="email" class="form-control"
									placeholder="name@example.com"><label for="email">Email</label>
							</div>

							<div class="form-floating mb-4">
								<input type="password" name="pw" id="password"
									class="form-control" placeholder="PassWord"><label
									for="password">Password</label>
							</div>

							<!-- 로그인 버튼 -->
							<button type="submit" class="btn btn-primary">로그인</button>
						</form>

						<!-- 회원가입 버튼 -->
						<form class="login" action="goJoin" method="post">
							<button type="submit" class="btn btn-secondary mt-3">회원가입</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>


</html>
</body>
</html>

