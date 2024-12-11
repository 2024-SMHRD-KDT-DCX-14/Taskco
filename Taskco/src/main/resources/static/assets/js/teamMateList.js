// 세션에서 값 가져오기 -> getkanban에서 정의되어 있음. 



//버튼 클릭 시 실행 




// teamMateList를 가져오는 함수
async function reqTeamMateList(pjid){ //매개변수는 session에 담긴 프로젝트 고유번호 pidx
	
	let url = "reqTeamMateList"
	
	//get으로 프로젝트 고유번호 넣어서 보내기.
	const res = await axios.get(url + "?PJ_ID=" + pjid)
	let teamMateListData = res.data;
	
	// 상태별 리스트 초기화
	let teamMateList = [];
	
	
	teamMateListData.forEach(teamMate => {
		
	
		let data = {
			jIdx : teamMate.join_idx,
			profileImg : teamMate.profile_img,
			teamMateName : teamMate.name,
			teamMateRole : teamMate.role,
			email : teamMate.email
		};

		teamMateList.push(data)
		
		
	})
	//console.log("teamMateList":+teamMateList)
		
	return teamMateList;
}







