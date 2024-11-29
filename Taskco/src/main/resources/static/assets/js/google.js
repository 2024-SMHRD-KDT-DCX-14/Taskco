
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
/*
1. googleLogin:
ID Token 검증 및 사용자 인증 (주로 비동기 요청으로 처리)
클라이언트는 fetch 요청을 통해 이 엔드포인트를 호출
2. apiLogin:
인증 후 브라우저가 리디렉트되는 화면 전환 엔드포인트
클라이언트의 window.location.href를 통해 호출

*/



function handleCredentialResponse(response) {
	/* ID 토큰 생성해서 POST방식으로 보내기 */
	fetch('/googleLogin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ credential: response.credential })

	})
		.then(response => response.ok ? response.json() : Promise.reject("Login failed"))
		.then(data => {
			console.log("Server response: ", data);
			if (data.success) {
				window.location.href = "/goTaskco"; // 로그인 성공 시 goTaskco 매핑값으로 리다이렉트
			} else {
				alert("로그인 실패: " + data.message);
			}
		})
		.catch(error => {

			console.error("error during login", error);
			alert("로그인 중 오류 발생" + error);

		});

	console.log("Credential token: ", response.credential); // ID Token 출력

}




