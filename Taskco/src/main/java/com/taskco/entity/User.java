package com.taskco.entity;

import java.sql.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class User {

	// 이메일
	private String email;

	// 패스워드
	private String pw;

	// 이름
	private String name;

	// 상태 메시지
	private String status_msg;

	// 프로필 사진
	private String profile_img;

	// 가입 일자
	private Date join_dt;

}
