package com.taskco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskco.entity.User;
import com.taskco.mapper.UserMapper;
// email 중복체크 목적 생성
@RestController
public class MemberRestController {

	@Autowired
	private UserMapper mapper;
	
	
	@RequestMapping("/check")
	public String check(String email) {
		User user=mapper.check(email);
		
		if(user==null) {
			return "t";
		}else {
			return "f";
		}
	}

}
