package com.taskco.controller;

import java.nio.file.Path;

import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.taskco.entity.User;
import com.taskco.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;

@Controller
public class UserController {
	
	@Autowired
	private UserMapper mapper;
	
	// login.jsp(1page) -> join.jsp
	@RequestMapping("/goJoin")
	public String goJoin() {
		return "join";

	}
	
	// join -> taskcoMain(2page)
	@RequestMapping("/goTaskco")
	public String goTaskco() {
		return "taskcoMain"; //2번째 페이지로 가기
	}

	// 외부 사진 폴더 가져오기
	@Value("${save.path}") // application.properties에 선언된 외부 폴더
	private String savePath; // 필드로 선언
	
	// 회원가입
	@RequestMapping("/join")
	public String join(User user, MultipartFile file, HttpSession session) {

		// 1. 데이터 수집
		if (file == null) {
			user.setProf_img("none");
		} else {
			try {

				// 1. 앞에 랜덤한 문자열을 붙여서, 파일 이름 중복 방지
				// UUID: 랜덤 문자 만들기 위한 기능
				String uuid = UUID.randomUUID().toString();
				// 2. 전체 경로 만들기(폴더 경로 + 파일 이름)
				String filename = uuid + file.getOriginalFilename();
				Path path = Paths.get(savePath + filename);
				// 3. 저장
				file.transferTo(path);
				user.setProf_img(filename);

			} catch (Exception e) {
				e.printStackTrace(); // 오류메시지 콘솔창 출력
			}
		}

		// 2. 특정 기능 실행
		mapper.join(user);
		
		// 세션에 사용자 정보 저장
		session.setAttribute("user", user);

		// 3. View 이동
		return "redirect:/goTaskco";
	}
	
	
	// 로그인 
	@RequestMapping("/login")
	public String login(User user,HttpSession session, Model model) {
		
		// 1. 데이터 수집
		
		// 2. 기능 실행
		User result=mapper.login(user);
		
		if(result==null) {
			System.out.println("Login failed");
			model.addAttribute("loginError", "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
	        return "login"; // 로그인 페이지로 다시 이동
		}else {
			System.out.println("Login Succeeded");
			session.setAttribute("user", result);
			// 3. View 이동
			return "redirect:/goTaskco";
			
		}
		
		
	}
	
	
	

}
