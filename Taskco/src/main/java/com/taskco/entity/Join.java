package com.taskco.entity;

import lombok.Data;

//프로젝트에 참여하거나 참여한 사람을 조회하기 위해
//생성할때도 사용이 되긴 하지만
@Data
public class Join {
	//join_idx는 3페이지에서 팀원 정보 보여주기 위해 사용
   private int join_idx;
   private String p_idx;
   private String email;
   private String join_dt;
   private String approval_yn;
   private String role;
}