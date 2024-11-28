package com.taskco.entity;

import lombok.Data;

@Data
public class Join {
   private String p_idx;
   private String email;
   private String join_dt;
   private String approval_yn;
   private String role;
}