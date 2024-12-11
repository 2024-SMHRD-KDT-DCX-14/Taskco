// 프로필 이미지 가져오는 함수

// 이미지 파일명을 집어 넣으면 불러오는 구조. 
const btn = document.getElementById("getprofileImage-test-btn");

async function profileImage(email) {
	
	console.log(email)
	
	const imageUrl = `http://localhost:8089/api/images/${email}`; // 이미지 요청 보내는 url 
	// 매개변수를 email로 받을 것. 
	
	//console.log(profile_img)
	const response = await fetch(imageUrl); // 이미지 요청 들어가는 fetch함수 api, MemberRestController에 있음 

	if (response.ok) {
		const blob = await response.blob();
		const localBlobUrl = URL.createObjectURL(blob); // Blob 데이터를 로컬 URL로 변환


		// 이미지 표시
		const img = document.createElement("img");
		img.src = localBlobUrl;
		// img.alt = imageName;
		img.style.maxWidth = "200px"; // 이미지 크기 제한
		img.style.marginTop = "20px";

		// 이미지 담을 화면 상의 위치 가져오기	
		const container = document.getElementById("imageContainer");
		container.innerHTML = ""; // 기존 이미지 제거
		container.appendChild(img);
	}else{ // 이미지가 없으면 띄울 방법
		
		
		
	}

}