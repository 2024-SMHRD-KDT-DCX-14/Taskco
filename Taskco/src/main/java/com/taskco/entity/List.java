package com.taskco.entity;

import lombok.Data;



//choose화면 돌입 시 우측에 참여한 프로젝트를 조회할때
// join 테이블과 project 테이블을 인덱스 기준으로 합쳐서
// email이 join테이블에 등록 된 p_idx만 추출
@Data
public class List {
   private String p_idx;
   private String email;
   private String p_title;
   private String approval_yn;
   private String role;
   private String ed_dt;
}
