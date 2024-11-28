package com.taskco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.taskco.entity.Kanban;
import com.taskco.mapper.KanbanMapper;

@Controller
public class KanbanController {

	
	@Autowired
	private KanbanMapper mapper; // 맵퍼. 차후에 추가
	
	@RequestMapping("/kanbanTest") // 칸반보드 테스트 화면에 진입
	public void kanbanTest() {
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
