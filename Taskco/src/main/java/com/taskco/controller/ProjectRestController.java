package com.taskco.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskco.entity.Join;

import com.taskco.entity.Project;
import com.taskco.service.ProjectService;

import jakarta.servlet.http.HttpSession;

@RestController
public class ProjectRestController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping("/getProjInfo")
    public ResponseEntity<Map<String, Object>> getSessionProject(HttpSession session) {
        Project project = (Project) session.getAttribute("project"); // 세션 구조 - 프로젝트 엔터티
        Join join = (Join) session.getAttribute("join");

        if (project == null || join == null) { //프로젝트와 조인 세션이 있을 때만 작동 오류 처리
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        
        List<Join> teamMembers = projectService.getTeamMembers(project.getP_idx()); // 매개변수(프로젝트 인덱스) => {해당 프로젝트에 참여하고 있는 이메일 정보}

        Map<String, Object> response = new HashMap<>();
        response.put("role", join.getRole());
        response.put("email", join.getEmail());
        response.put("project", project);
        response.put("teamMembers", teamMembers);

        return ResponseEntity.ok(response);
    }

    @RequestMapping("/updateProject")
    public ResponseEntity<?> updateProject(@RequestBody Map<String, Object> requestBody) {
        try {
            projectService.updateProjectAndMembers(requestBody);
            return ResponseEntity.ok("업데이트 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 실패: " + e.getMessage());
        }
    }
}

