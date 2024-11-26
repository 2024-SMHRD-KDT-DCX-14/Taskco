package com.taskco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.taskco.entity.Kanban;

@Mapper
public interface KanbanMapper {

	public List<Kanban> list(String pIdx);
	
}
