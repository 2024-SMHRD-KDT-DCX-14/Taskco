package com.taskco.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Path;

import java.nio.file.Paths;
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

   // 회원가입 페이지
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
	   if (file == null||file.isEmpty()) {
         user.setProfile_img("none.jpg");
      } else {
         try {
            // 1) 앞에 랜덤한 문자열을 붙여서, 파일 이름 중복 방지
            // UUID: 랜덤 문자 만들기 위한 기능
            String uuid = UUID.randomUUID().toString();
            // 2) 전체 경로 만들기(폴더 경로 + 파일 이름)
            String originalFilename = file.getOriginalFilename(); // 원본 파일 이름
            String extension = ""; // 파일 확장자 저장
            
            // 확장자가 있는 경우 추출
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            
            // UUID로 파일 이름 생성
            String filename = UUID.randomUUID().toString() + extension; //extension은 확장자
            
            // 파일 이름을 저장할 경로+파일이름
            Path path = Paths.get(savePath + filename);
            
            // 3) 저장
            try {
               file.transferTo(path);
               user.setProfile_img(filename);
               System.out.println("profile img: "+user.getProfile_img()); //dto에 저장된 프로필사진 파일명 디버깅
            } catch (IOException e) {
               
               e.printStackTrace();
            }
            // user에 프로필사진 저장
               
            

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

   // ========================================================================
   // 프로필 수정(회원 수정)

   // 외부 사진 폴더 가져오기=> 회원가입 부분에 있음

   @RequestMapping("/update")
   public String update(User user, HttpSession session, MultipartFile file) throws UnsupportedEncodingException {

      // 1. 데이터 수집
      // 1-1. 세션 가져오기
      User currentUser = (User) session.getAttribute("user");
      // 세션 없는 경우 로그인 페이지로 리다이렉트
      if (currentUser == null) {
           return "redirect:/login"; 
       }
      
      // 1-2. 세션에서 이메일 꺼내오기
      String email = currentUser.getEmail();

   // 1-3. 프로필 이미지 파일 저장
      // save.path는 회원가입 메소드 위에서 불러옴
      if (file == null || file.isEmpty()) { // 프로필 사진 업데이트 여부 확인
          // 기존 사진을 유지
          user.setProfile_img(((User) session.getAttribute("user")).getProfile_img()); // 기존 세션에서 프로필 사진 가져오기
      } else {

         // 1) 앞에 랜덤한 문자열을 붙여서, 파일 이름 중복 방지
         // UUID: 랜덤 문자 만들기 위한 기능
         String uuid = UUID.randomUUID().toString();
         System.out.println(uuid); // uuid 디버깅
         // 2) 전체 경로 만들기(폴더 경로 + 파일 이름)
         String originalFilename = file.getOriginalFilename(); // 원본 파일 이름
         String extension = ""; // 파일 확장자 저장

         // 확장자가 있는 경우 추출
         if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
         }

         // UUID로 파일 이름 생성
         String filename = UUID.randomUUID().toString() + extension; // extension은 확장자

         // 파일 이름을 저장할 경로+파일이름
         Path path = Paths.get(savePath + filename);

         // 3) 저장
         try {
            file.transferTo(path);
            user.setProfile_img(filename);
            System.out.println("profile img: " + user.getProfile_img()); // dto에 저장된 프로필사진 파일명 디버깅
         } catch (IOException e) {

            e.printStackTrace();
         }
         // user에 프로필사진 저장
      }

      // 2. 기능 실행
      // email을 세션에서 가져와 user객체에 저장
      user.setEmail(email);
      // user객체 업데이트
      int cnt= mapper.update(user);
      System.out.println(cnt);
      
      if (cnt>0) {
         // 세션에 변경된 user객체의 name, pw, status_msg, profile_img 저장 => 세션도 변경
         session.setAttribute("user", user); //세션 업데이트
      }

      // 3. view 이동
      return "redirect:/loggedin";

   }
   
   
   
   

}

