<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!DOCTYPE html>

<html lang="en">

<head>
<meta charset="UTF-8">
    <meta name="viewport"
	content="width=device-width, initial-scale=1.0">
    <title>TaskNest</title>

    <link rel="stylesheet" href="./login1.css">
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
</head>

<body>
    <!-- 로그인 부분 -->
    <div class="container">
        <div class="screen">
            <div class="screen__content">

                <form class="login">
                    <div class="logo">
                        <img src="./KakaoTalk_20241106_120421742.png"
							alt="" id="logo">
                    </div>
                    <div class="login__field">
                        <i class="login__icon fas fa-user"></i>
                        <input type="text" class="login__input"
							placeholder="User name / Email">
                    </div>
                    <div class="login__field">
                        <i class="login__icon fas fa-lock"></i>
                        <input type="password" class="login__input"
							placeholder="Password">
                    </div>
                    <button class="button login__submit">
                        <span class="button__text">로그인</span>
                        <i class="button__icon fas fa-chevron-right"></i>
                    </button>
                </form>
                <div class="social_login">
                    <h3>소셜 계정으로 로그인</h3>
                    <div class="social_icons">
                        <div class="g_id_signin" data-type="standard"
							data-size="medium" data-theme="outline" data-text="sign_in_with"
							data-shape="rectangular" data-logo_alignment="left">
                        </div>
                        <a href="#"
							class="social-login__icon fab fa-facebook"></a>
                        <a href="#"
							class="social-login__icon fab fa-twitter"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="g_id_onload"
		data-client_id="938786367795-m2u4s4j4u6nhriskq4skss27m0dl82va.apps.googleusercontent.com"
		data-login_uri="https://www.naver.com/" data-auto_prompt="false">
    </div>


    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <script src="google.js"></script>

</body>

</html>
</body>
</html>