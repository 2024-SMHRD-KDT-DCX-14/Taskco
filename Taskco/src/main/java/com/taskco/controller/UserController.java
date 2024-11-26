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

	// login.jsp(1page) -> join.jsp
	@RequestMapping("/goJoin")
	public String goJoin() {
		return "join";

	}

	// join -> taskcoMain(2page)
	@RequestMapping("/goTaskco")
	public String goTaskco() {
		return "taskcoMain"; // 2번째 페이지로 가기
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
		return "redirect:/goTaskco";
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
			return "login"; // 로그인 페이지로 다시 이동
		} else {
			System.out.println("Login Succeeded");
			session.setAttribute("user", result);
			// 3. View 이동
			return "redirect:/goTaskco";

		}

	}

	// googleLogin 처리
	// 구글 id 토큰을 검증한 뒤 DB에서 이메일 확인
	@PostMapping("/googleLogin")
	public ResponseEntity<?> googleLogin(@RequestParam Map<String, String> body, HttpSession session) {
		try {
			// id 토큰 검증
			// GoogleVerifier에서 verifyToken 호출
			GoogleIdToken idToken = GoogleVerifier.verifyToken(body.get("idToken"));

			// id토큰이 있는 경우
			if (idToken != null) {
				// email을 토큰에서 가져오기
				String email = idToken.getPayload().getEmail();
				// UserMapper.loginWithEmail 호출로 이메일 기반 사용자 확인
				User user = mapper.loginWithEmail(email); // DB 조회
				// sessionScope 객체로 저장
				if (user != null) {
					session.setAttribute("sessionScope", user); // 세션에 사용자 정보 저장
					return ResponseEntity.ok(Map.of("success", true));
				} else {
					return ResponseEntity.status(401).body(Map.of("message", "등록되지 않은 사용자"));
				}
			} else {
				return ResponseEntity.status(401).body(Map.of("message", "유효하지 않은 토큰"));
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body(Map.of("message", "토큰 검증 중 오류 발생"));
		}
	}

	@GetMapping("/apiLogin")
	public String redirectToMain(HttpSession session) {
		// 세션 확인 후 메인 페이지로 이동
		if (session.getAttribute("sessionScope") != null) {
			return "taskcoMain"; // JSP 파일명 (포워딩)
		} else {
			return "redirect:/login.jsp"; // 로그인 페이지로 리다이렉트
		}
	}

}
