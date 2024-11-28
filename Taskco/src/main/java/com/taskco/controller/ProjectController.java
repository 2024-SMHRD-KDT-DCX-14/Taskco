package com.taskco.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.taskco.entity.Join;
import com.taskco.entity.Project;
import com.taskco.entity.TeamMate;
import com.taskco.entity.User;
import com.taskco.mapper.ProjectMapper;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;

@Controller
public class ProjectController {
   
   @Autowired
   private ProjectMapper mapper;
   
   @RequestMapping("/loggedin")
   public String loggedin( Model model , HttpSession session ) {
      
      User user = (User) session.getAttribute("user");
      List<Project> list = mapper.list(user);
      System.out.println(list);
      model.addAttribute("list", list);
      
      return "choose";
   }
   
    @Value("${save.path}")
       private String savePath;
       
    @RequestMapping("/createProject")
    public String Create(String ed_dt , Project project) {
       
       String uuid = UUID.randomUUID().toString();
       project.setP_idx(uuid);
       project.setEd_dt(ed_dt);
       project.setP_status("진행중");
       System.out.println(project);
       
       mapper.createProject(project);
       mapper.createJoin(project);
       return "redirect:/loggedin";
    }
    
    @RequestMapping(value = "/joinProject", method = RequestMethod.POST)
    public String join(Model model, String p_idx, HttpSession session) {
       User user = (User) session.getAttribute("user");
       
       Join join = new Join();
       System.out.println(user);
       
       join.setP_idx(p_idx);
       join.setEmail(user.getEmail());
       join.setApproval_yn("N");
       join.setRole("팀원");
       System.out.println(join);
       try {
           int result = mapper.join(join);
           if(result > 0) {
               System.out.println("성공");
               return "redirect:/loggedin";  // Redirect to a project page or wherever you want on success
           } else {
               System.out.println("실패");
               return "redirect:/loggedin";  // Redirect to loggedin on failure
           }
       } catch(Exception e) {
           System.out.println("에러 발생: " + e.getMessage());
           return "redirect:/loggedin";  // Redirect to loggedin in case of exception
       }
   }
    
       
    @RequestMapping("/view")
    public String view(String p_idx, Model model, HttpSession session) {
       
       Project project = mapper.view(p_idx);
       //프로젝트 정보 세션에 저장
       session.setAttribute("project", project);
       //팀원 정보 세션에 저장
       List<TeamMate> teamMate = mapper.teamMate(project);
       session.setAttribute("teamMate", teamMate);
       return "projectMain";
    }
   

}