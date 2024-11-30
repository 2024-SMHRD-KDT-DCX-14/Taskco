package com.taskco.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskco.entity.Join;
import com.taskco.entity.Project;
import com.taskco.mapper.ProjectMapper;

import jakarta.servlet.http.HttpSession;

// 회원관리용 컨트롤러(정환 추가)
@RestController
public class ProjectRestController {

	@Autowired
	private ProjectMapper mapper;

	// json 방식 사용x => 세션에서 불러올 예정 
//	@RequestMapping("/reqProject") // RequestParam으로 PJ_ID 값을 받아옴
//	public List<Project> getProject(@RequestParam("p_idx") String p_idx) {
//		
//		// 1. 데이터 수집
//		System.out.println("p_idx"+p_idx);
//		// 2. 기능 실행
//		List<Project> list=mapper.getProjectInfo(p_idx);
//		System.out.println(list);
//		// 3. View 이동
//		return list; // json으로 자동으로 보내짐.js에서 매핑할 때 태그명과 필드명을 동일하게 주면 됨.
//	}
//		
	// ajax 요청을 통해 "project" 세션 데이터 가져오기
	@RequestMapping("/getSessionProject")
	public ResponseEntity<Project> getSessionProject(HttpSession session) {
		// project 세션 가져오기
		Project project = (Project) session.getAttribute("project");
		if (project == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		// 요청에 대한 응답
		return ResponseEntity.ok(project);
	}

}
