package com.taskco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskco.entity.KanAssigner;
import com.taskco.entity.Kanban;
import com.taskco.mapper.KanAssignerMapper;
import com.taskco.mapper.KanbanMapper;

@RestController
public class KanbanRestController {

	@Autowired
	private KanbanMapper mapper;
	
	@Autowired
	private KanAssignerMapper AssignerMapper;
	
	// 칸반보드 가져오기
	@RequestMapping("/KanbanList") // ReqeustParam으로 Pj_id 값을 받아옴. List<Kanban>
	public List<Kanban> getListKanban(@RequestParam("PJ_ID") String pIdx) {
		// 1. 데이터 수집
		//System.out.println("PJ_id :" + pIdx); // 데이터 확인 콘솔.
		// 2. 기능실행
		List<Kanban> list = mapper.list(pIdx);

		// System.out.println(list);
		// 3. view 이동
		return list; // JSON으로 자동으로 보내짐. .js에서 매핑할 때 태그명과 필드명을 동일하게 주면 됨.
	}
	
	// 칸반보드 저장
	@RequestMapping("/updateKanban")
	public String updateKanban(@RequestBody List<Kanban> list) {

		
		//System.out.println("list :" + list);

		// 2. 기능 실행
		try {
			mapper.deleteKanban(list);
			int cntU = mapper.updateKanban(list);

			if (cntU > 0) {
				//System.out.println("update t");
			} else {
				// System.out.println("update f");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "update complite";
	}
	// 칸반보드 
	
	
	
	
	
	//Assigner 접근
	@RequestMapping("/reqKanAssinger")
	public List<KanAssigner> reqKanAssinger(@RequestParam("kan_Idx") String kIdx) {

		// 1.데이터 수집. 포스트 방식으로 받음.
		// System.out.println("kIdx :" + kIdx);

		// 2. 기능 실행
		List<KanAssigner> list = AssignerMapper.reqKanAssinger(kIdx);

		
		return list;
	}
	
	
	@RequestMapping("/updateKanAssigner")
	public String updateKanAssigner(@RequestBody List<KanAssigner> assignerlist) {
		
		System.out.println("assignerlist"+assignerlist);
		
		try {
		int cnt = AssignerMapper.updateKanAssigner(assignerlist);
		

		
		if (cnt > 0) {
			System.out.println("update t");
		} else {
			System.out.println("update f");
		}
		
		
		}catch(Exception e){
			e.printStackTrace();
		}
		return "update t";
	}
	
	
	
	
	


}
