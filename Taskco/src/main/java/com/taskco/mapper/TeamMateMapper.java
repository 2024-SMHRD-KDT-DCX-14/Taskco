package com.taskco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.taskco.entity.TeamMate;

@Mapper
public interface TeamMateMapper {
	
	public List<TeamMate> teamMateList(String pIdx);
	
}
