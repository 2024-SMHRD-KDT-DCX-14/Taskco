<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	
	<form action="join" method="post">
		이메일<input type="text" name="email"><br>
		비밀번호<input type="text" name="pw"><br>
		이름<input type="text" name="name"><br>
		상태메시지<input type="text" name="status_msg"><br>
		프로필 사진<input type="file" name="file"><br>
		<br>
		<input type="submit" value="로그인">
	</form>
</body>
</html>