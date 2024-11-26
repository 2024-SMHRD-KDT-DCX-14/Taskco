
//   handleCredentialResponse 함수: 디코딩된 정보를 출력하거나, 이를 서버로 전송하는 역할
// Google 로그인을 통해 생성된 ID Token을 서버로 전송하고, 성공 시 메인 페이지로 리다이렉트

// Google Identity Services 초기화
// Google 로그인 id 버튼 클릭시 일단 초기화
window.onload = function() {
	google.accounts.id.initialize({
		client_id: "938786367795-m2u4s4j4u6nhriskq4skss27m0dl82va.apps.googleusercontent.com",
		callback: handleCredentialResponse
	});
	google.accounts.id.renderButton(
		document.querySelector('.g_id_signin'),
		{ theme: "outline", size: "large" } // 버튼 스타일 설정
	);
	google.accounts.id.prompt(); // 자동 로그인 팝업
};

// ID Token 처리 함수
function handleCredentialResponse(response) {
	/* ID 토큰 생성해서 POST방식으로 보내기 */
	fetch('/googleLogin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ idToken: response.credential })
	})
		.then(response => response.ok ? response.json() : Promise.reject("Login failed"))
		.then(data => {
			if (data.success) {
				window.location.href = "/apiLogin"; // 로그인 성공 시 apiLogin 매핑값으로 리다이렉트
			} else {
				alert("로그인 실패: " + data.message);
			}
		})
		.catch(error => 
			alert("로그인 중 오류 발생" + err)
		);
		
	 console.log("Encoded JWT ID token: ", response.credential); // ID Token 출력
		
}




