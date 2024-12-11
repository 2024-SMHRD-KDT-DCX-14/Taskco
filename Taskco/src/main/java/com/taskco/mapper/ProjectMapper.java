package com.taskco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.taskco.entity.Croom;
import com.taskco.entity.Join;
import com.taskco.entity.Project;
import com.taskco.entity.TeamMate;
import com.taskco.entity.User;

@Mapper
public interface ProjectMapper {

	// 선택화면에 참여중인 프로젝트 띄우기용
	public List<Project> list(User user);

	// 프로젝트 생성
	public int createProject(Project project);

	public int createJoin(Project project);

	public int createCroom(Croom croom);

	// 프로젝트 진입용
	public Project view(String p_idx);

	// 프로젝트 참가용
	public int join(Join Join);

	// ProjectMain 에서 팀원 띄울때 사용하기 위함
	public List<TeamMate> teamMate(Project project);

	// 프로젝트 관리에 필요한 정보 가져오기(
	public List<Project> getProjectInfo(String p_idx);

	//
	public Join viewJoin(Join join);

	public void updateProject(@Param("p_idx") String p_idx, @Param("p_title") String p_title,
			@Param("st_dt") String st_dt, @Param("ed_dt") String ed_dt, @Param("p_desc") String p_desc,
			@Param("p_status") String p_status);

	// 프로젝트 나가기
	public int leaveProject(Join join);

	// 팀원 방출
	public void deleteMember(Join join);
	
	public List<Join> getTeamMembers(@Param("p_idx") String p_idx);

}
