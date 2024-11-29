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
		이메일<input type="text" name="email" id=email><br> 
		<p id="result"></p> <!--중복처리 결과 여기에 출력 -->
		비밀번호<input type="text" name="pw"><br><br> <!-- 향후 눈알버튼 넣어서 눈알버튼 클릭시 text, 아닐 경우 password로 바꾸는 로직 추가 예정 -->
		이름<input type="text" name="name"><br><br>
		상태메시지<input type="text" name="status_msg"><br><br> 
		프로필 사진<input type="file" name="file"><br><br> 
		<input type="submit" value="회원가입">
	</form>

	
	<!-- axios -->
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<!--joinCheck.js -->
	<script src="assets/js/joinCheck.js"></script>
	
</body>
</html>