package com.taskco.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.taskco.entity.User;

@Mapper
public interface UserMapper {
	
	// 회원가입
	public int join(User user);
	
	// 로그인
	public User login(User user);
	
	// 구글api
	public User loginWithEmail(User user); // 이메일 기반 사용자 조회
	
	// email 중복처리(회원가입시)
	public User check(String email);
	
	// 프로필 수정
	public int update(User user);
	
}
