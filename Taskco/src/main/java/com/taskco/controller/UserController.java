package com.taskco.controller;

import java.nio.file.Path;

import java.nio.file.Paths;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GooglePublicKeysManager;
import com.taskco.GoogleVerifier;
import com.taskco.entity.User;
import com.taskco.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Controller
public class UserController {

	@Autowired
	private UserMapper mapper;

	// 메인페이지 (taskco)
	@RequestMapping("/taskco")
	public String taskco() {
		return "taskco";
	}

	//회원가입 페이지
	@RequestMapping("/goJoin")
	public String goJoin() {
		return "join";
	}

	// 외부 사진 폴더 가져오기
	@Value("${save.path}") // application.properties에 선언된 외부 폴더
	private String savePath; // 필드로 선언

	// 회원가입
	@RequestMapping("/join")
	public String join(User user, MultipartFile file, HttpSession session) {

		// 1. 데이터 수집
		if (file == null) {
			user.setProfile_img("none");
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
				user.setProfile_img(filename);

			} catch (Exception e) {
				e.printStackTrace(); // 오류메시지 콘솔창 출력
			}
		}

		// 2. 특정 기능 실행
		mapper.join(user);

		// 세션에 사용자 정보 저장
		session.setAttribute("user", user);

		// 3. View 이동
		return "redirect:/taskco";
	}

	// 로그인
	@RequestMapping("/login")
	public String login(User user, HttpSession session, Model model) {

		// 1. 데이터 수집

		// 2. 기능 실행
		User result = mapper.login(user);

		if (result == null) {
			System.out.println("Login failed");
			model.addAttribute("loginError", "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
			return "redirect:/taskco"; // 로그인 페이지로 다시 이동
		} else {
			System.out.println("Login Succeeded");
			session.setAttribute("user", result);
			// 3. View 이동
			return "redirect:/loggedin";

		}

	}

	// googleLogin 처리
	// 구글 id 토큰을 검증한 뒤 DB에서 이메일 확인
	// {
	// "credential": "토큰값"
	// }
	// 위와 같은 json 데이터로 idToken을 전달해야 매핑처리가 가능함!
	@PostMapping("/googleLogin")
	// email을 전달하여 회원가입 페이지에서 기본값으로 활용
	public String googleLogin(@RequestParam(value = "email", required = false) String idToken, HttpSession session,
			Model model) {

		if (idToken == null || idToken.isEmpty()) {
			return redirectWithMessage("/login.jsp", "ID Token is missing", model);
		}

		try {
			System.out.println("Received ID Token: " + idToken);

			// Google Token 검증
			GoogleIdToken verifiedToken = GoogleVerifier.verifyToken(idToken);
			System.out.println(verifiedToken);
			if (verifiedToken != null) {
				String emailFromToken = verifiedToken.getPayload().getEmail(); // Google 토큰에서 이메일 추출

				if (emailFromToken == null || emailFromToken.isEmpty()) {
					return redirectWithMessage("/login.jsp", "Invalid email in token", model);
				}

				// User 객체 생성 및 이메일 설정
				User user = new User();
				user.setEmail(emailFromToken);
				System.out.println("User Email: " + user.getEmail());

				// DB에서 사용자 조회
				User userFromDB = mapper.loginWithEmail(user);

				if (userFromDB == null) {
					// DB에 사용자 정보 없음
					model.addAttribute("email", emailFromToken); // 회원가입용 데이터 전달
					return "redirect:/goJoin";
				}

				// 세션에 사용자 저장 및 메인 페이지로 이동
				session.setAttribute("user", userFromDB);
				model.addAttribute("user", userFromDB);
				return "redirect:/taskco";
			} else {
				return redirectWithMessage("/login.jsp", "유효하지 않은 토큰", model);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return redirectWithMessage("/login.jsp", "토큰 검증 중 오류 발생", model);
		}
	}

	private String redirectWithMessage(String url, String message, Model model) {
		model.addAttribute("message", message);
		return "redirect:" + url;
	}

}
