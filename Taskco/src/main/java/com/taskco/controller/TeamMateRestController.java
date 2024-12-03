package com.taskco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskco.entity.TeamMate;
import com.taskco.mapper.TeamMateMapper;

@RestController
public class TeamMateRestController {

	
	@Autowired
	private TeamMateMapper mapper;
	
	@RequestMapping("/reqTeamMateList")
	public List<TeamMate> reqTeamMate(@RequestParam("PJ_ID") String pIdx){
		
		System.out.println("프로젝트 인덱스"+pIdx);
		
		List<TeamMate> list = mapper.teamMateList(pIdx);
		
		return list;
		
		
	}
	
	
	
	
}
