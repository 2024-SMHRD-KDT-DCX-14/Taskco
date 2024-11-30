// 권한 설정(프로젝트 관리 부분)



// 프로젝트 관리에 필요한 정보를 DB에서 갖져오는 함수. 프로젝트 관리와 관련된 정보를 list로 가져옴
// json 방식 사용x => 세션에서 불러올 예정 
/*async function reqProject(p_idx) {


	let url = "reqProject";

	// get으로 프로젝트 고유번호 넣어서 보내기(URL 생성 부분에서 reqProject 호출)
	const res = await axios.get(url + "?p_idx=" + p_idx)
	let projects = res.data;
	console.log("projects:", projects);



	// 상태별 리스트 초기화 
	let projList = [];

	projects.forEach(project => {

		let projList = projects.map(project => ({
			title: project.p_title, // 프로젝트 제목
			startDate: project.st_dt, // 프로젝트 시작일
			endDate: project.ed_dt, // 프로젝트 마감일
			description: project.p_desc // 프로젝트 상세설명
		}));


	});
	console.log("projList:", projList)
	return projList;


}*/





async function openAuthorityModal() {
    const modal = document.getElementById("modal1");
    const content = document.getElementById("modal_content");

    if (!modal || !content) {
        console.error("Modal or content element not found!");
        return;
    }

    try {
        // AJAX 요청으로 세션 데이터 가져오기
        const response = await axios.get('/getSessionProject');
        const project = response.data;

        if (!project) {
            console.error("Project data is null");
            return;
        }

        // 팀원용 모달
        content.innerHTML = `
            <h2>프로젝트 관리</h2>
            <form action="update" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="p_title">프로젝트 제목</label>
                    <input id="p_title" name="p_title" type="text" style="width: 100%;" 
                           value="${project.p_title}" readonly>
                </div>
                <div class="form-group">
                    <label>시작일</label>
                    <input type="date" name="st_dt" style="margin-right: 10px;" 
                           value="${project.st_dt}" readonly>
                    <label>종료일</label>
                    <input type="date" name="ed_dt" value="${project.ed_dt}" readonly>
                </div>
                <div class="form-group">
                    <label>프로젝트 세부내용</label>
                    <textarea name="p_desc" rows="4" style="resize: none; width: 100%;" readonly>
                        ${project.p_desc}
                    </textarea>
                </div>
                <div id="form_btn" style="text-align: center; margin-top: 20px;">
                    <input type="submit" value="탈퇴" style="margin-right: 10px;">
                </div>
            </form>
        `;
        modal.style.display = "block";
    } catch (error) {
        console.error("Error displaying modal:", error);
    }
}

// 모달창 닫기
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}


