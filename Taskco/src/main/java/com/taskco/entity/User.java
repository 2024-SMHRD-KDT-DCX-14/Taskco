package com.taskco.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class User {
	
	private String email;
	private String pw;
	private String user_name;
	private String status_msg;
	private String prof_img;

}
