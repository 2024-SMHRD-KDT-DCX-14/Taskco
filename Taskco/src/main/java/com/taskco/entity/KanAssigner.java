package com.taskco.entity;

import lombok.Data;

@Data
public class KanAssigner {
	
	 // 담당 식별자 
    private String assignIdx;

    // 칸반 식별자 
    private String kanIdx;

    // 담당자 이메일 
    private String email;

    // 등록 일자 
    private String assignDt;

}
