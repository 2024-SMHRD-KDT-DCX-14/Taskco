<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Taskco Login</title>
<script src="https://accounts.google.com/gsi/client" async defer></script>
<script src="google.js"></script>
</head>
<body>
	<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TaskNest</title>

<link rel="stylesheet" href="assets/css/login1.css">
<style>
@font-face {
	font-family: 'STUNNING-Bd';
	src:
		url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-2@1.0/STUNNING-Bd.woff2')
		format('woff2');
	font-weight: normal;
	font-style: normal;
}

body {
	font-family: 'STUNNING-Bd', sans-serif;
}
</style>


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
	<!-- 로그인 부분 -->
	<div class="container">
		<div class="screen">
			<div class="screen__content">

				<form class="login" action="login" method="post">
					<!--post방식 로그인 전송 -->
					<div class="logo">
						<img src="./KakaoTalk_20241106_120421742.png" alt="" id="logo">
					</div>
					<!--이메일  -->
					<div class="login__field">
						<i class="login__icon fas fa-user"></i> <input type="text"
							name="email" class="login__input" placeholder="User name / Email">
					</div>
					<!--비밀번호 -->
					<div class="login__field">
						<i class="login__icon fas fa-lock"></i> <input type="password"
							name="pw" class="login__input" placeholder="Password">
					</div>
					<button class="button login__submit">
						<span class="button__text">로그인</span> <i
							class="button__icon fas fa-chevron-right"></i>
					</button>
				</form>
				<!--회원가입 부분 -->
				<form  class="login" action="goJoin" method="post">
					<button type="submit" class="button login__submit">
						<span class="button__text">회원가입</span> <i
							class="button__icon fas fa-chevron-right"></i>
					</button>
				</form>

				<!--구글 로그인 버튼 부분  -->
				<div class="social_login">
					<h3>소셜 계정으로 로그인</h3>
					<!-- Google Identity Services 초기화 -->
					<div id="g_id_onload"
						data-client_id="938786367795-m2u4s4j4u6nhriskq4skss27m0dl82va.apps.googleusercontent.com"
						data-login_uri="/googleLogin" data-auto_prompt="false"></div>
					<div class="g_id_signin" data-type="standard" data-size="large"></div>
				</div>
			</div>
		</div>
	</div>


	<!-- Google Identity Services 초기화 -->
	<!-- 	<div id="g_id_onload"
		data-client_id="938786367795-m2u4s4j4u6nhriskq4skss27m0dl82va.apps.googleusercontent.com"
		data-login_uri="/googleLogin" data-auto_prompt="false"></div> -->




</body>

</html>
</body>
</html>