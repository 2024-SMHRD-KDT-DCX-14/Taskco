package com.taskco.mapper;

import org.apache.ibatis.annotations.Mapper;


import com.taskco.entity.User;

@Mapper
public interface UserMapper {
	
	// 회원가입
	public int join(User user);
	
	// 로그인
	public User login(User user);
}
