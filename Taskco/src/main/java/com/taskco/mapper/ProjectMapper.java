package com.taskco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.taskco.entity.Join;
import com.taskco.entity.Project;
import com.taskco.entity.TeamMate;
import com.taskco.entity.User;

@Mapper
public interface ProjectMapper {
   
   //매개변수로 Session에 담긴 이메일 필요
   public List<Project> list(User user);

    // 프로젝트 생성
    public int createProject(Project project);
    
    public int createJoin(Project project);
    
   public Project view(String p_idx);

   public int join(Join Join);
   
   //ProjectMain 에서 팀원 띄울때 사용하기 위함
   
   public List<TeamMate> teamMate(Project project);
}
