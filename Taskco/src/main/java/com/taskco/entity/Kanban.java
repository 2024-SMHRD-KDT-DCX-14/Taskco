package com.taskco.entity;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor // 모든 필드를 초기화하는 생성자. 
@Data
public class Kanban {
	
    // 칸반 식별자 
    private String kanIdx;

    // 칸반 제목 
    private String kanTitle;

    // 칸반 내용 
    private String kanContent;

    // 시작 일자 
    private String stDt;

    // 종료 일자 
    private String edDt;

    // 업무 상태 코드 
    private String kanStatus;

    // 프로젝트 고유번호 
    private String pIdx;

    // 표시 순서 
    private Integer kanOrder;

    // 칸반 칼라 
    private String kanColor;
    
	
	
	
	
}
