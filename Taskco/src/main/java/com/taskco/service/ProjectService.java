package com.taskco.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskco.entity.Join;
import com.taskco.mapper.ProjectMapper;

@Service
public class ProjectService {

	@Autowired
	private ProjectMapper projectMapper;

	@Transactional
	public void updateProjectAndMembers(Map<String, Object> requestBody) { 
		String p_idx = (String) requestBody.get("p_idx");
		String p_title = (String) requestBody.get("p_title");
		String st_dt = (String) requestBody.get("st_dt");
		String ed_dt = (String) requestBody.get("ed_dt");
		String p_desc = (String) requestBody.get("p_desc");
		String p_status = (String) requestBody.get("p_status");
		List<String> deletedMembers = (List<String>) requestBody.get("deletedMembers");

		// 로그 추가
		System.out.println("Updating project with data: " + p_idx + ", " + p_title + ", " + st_dt + ", " + ed_dt + ", "
				+ p_desc + ", " + p_status);
		System.out.println("Members to delete: " + deletedMembers);

		// 1. 프로젝트 수정
		projectMapper.updateProject(p_idx, p_title, st_dt, ed_dt, p_desc, p_status);
		// 2. 삭제할 팀원 처리
		for (String email : deletedMembers) {
			System.out.println("Deleting member: " + email); // 로그 추가
			projectMapper.deleteMember(p_idx, email);
		}
	}

	public List<Join> getTeamMembers(String p_idx) {
		return projectMapper.getTeamMembers(p_idx);
	}
}
