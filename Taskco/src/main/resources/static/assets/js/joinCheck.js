// 이메일 중복 체크 기능
const ipt = document.getElementById("email"); // email input값
const msg = document.getElementById("result"); // 중복 상태 메시지 출력
let isEmailValid = false;


// 입력 시 이메일 중복 확인
ipt.addEventListener("input", request);

function request() {

	let url = "check"; // url
	let email = ipt.value; // 보내야 할 데이터
	axios.get(url + "?email=" + email) // get방식으로 데이터 전송(이후 컨트롤러, mapper에서 처리)
		.then(function(res) { // 응답받기
			console.log(res.data);

			if (res.data == "t") {

				msg.innerHTML = "사용가능한 이메일 입니다.";
				msg.style = "color: green";
				isEmailValid = true;

			} else {
				msg.innerHTML = "중복된 이메일입니다.";
				msg.style = "color:red";
				isEmailValid = false;
			}
		});


}
// 폼 제출 시 유효성 검증
function validateForm(event) {
	if (isEmailValid == false) { // 이메일이 유효하지 않을 경우
		alert("다시 회원가입 시도해주세요");
		event.preventDefault(); // 폼 제출 막기
	}
}

// 폼의 제출 이벤트에 validateForm 연결
const form = document.querySelector("form"); // 폼 선택
form.addEventListener("submit", (event) => validateForm(event));
