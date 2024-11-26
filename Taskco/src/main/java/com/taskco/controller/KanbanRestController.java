package com.taskco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskco.entity.Kanban;
import com.taskco.mapper.KanbanMapper;

@RestController
public class KanbanRestController {

	@Autowired
	private KanbanMapper mapper;

	@RequestMapping("/reqKanban") //ReqeustParam으로 Pj_id 값을 받아옴. List<Kanban>
	public List<Kanban> getListKanban(@RequestParam("PJ_ID") String pIdx) {
		// 1. 데이터 수집
		System.out.println("PJ_id :" + pIdx); // 데이터 확인 콘솔.
		// 2. 기능실행
		List<Kanban> list = mapper.list(pIdx);
		
		System.out.println(list);
		// 3. view 이동
		return list; //JSON으로 자동으로 보내짐. .js에서 매핑할 때 태그명과 필드명을 동일하게 주면 됨. 
	}

}
