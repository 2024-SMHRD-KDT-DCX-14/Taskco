package com.taskco.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.taskco.entity.Board;
import com.taskco.entity.Project;
import com.taskco.entity.TeamMate;
import com.taskco.mapper.BoardMapper;
import com.taskco.mapper.ProjectMapper;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;

@Controller
public class BoardController { 
   
   @Autowired
   private BoardMapper mapper;
   
   @Autowired
   private ProjectMapper projectMapper;
   
   @Value("${save.path}")
   private String savePath;
   
//   @RequestMapping("/viewBoard")
//   public String viewBoard(@RequestParam("b_idx") int b_idx , Model model ) {
//      
//      Board board = mapper.view(b_idx);
//      model.addAttribute("board", board);
//      
//      return "viewBoard";
//   }
   @RequestMapping("/viewBoard")
   @ResponseBody // JSON 데이터를 반환
   public Board viewBoard(@RequestParam("b_idx") int b_idx) {
      System.out.println("게시판 정보"+mapper.view(b_idx));
      
       return mapper.view(b_idx); // DB에서 게시글 데이터를 조회하여 반환
   }
   
   
   

   @PostMapping("/createBoard")
   public String createBoard( Board board,@RequestParam("boardImgFile") MultipartFile file, HttpSession session, String p_idx) {
	  System.out.println(session.getAttribute("user"));
      try {
            if (!file.isEmpty()) { // //! ! 파일 존재 여부 확인
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path path = Paths.get(savePath, filename);
                file.transferTo(path.toFile()); // 파일 저장
                board.setB_file(filename); // 파일 경로 설정
            } else {
                board.setB_file("none"); // 파일 없을 경우 기본값 설정
            }
            mapper.write(board); // DB에 저장
            session.setAttribute("board", board);

        } catch (Exception e) {
            e.printStackTrace();
            //return "업로드 중 오류 발생"; // //! ! 오류 발생 시 메시지 반환
        }
       return "redirect:/view?p_idx="+p_idx;
   }
   
   @PostMapping("/createServerBoard")
   public String createServerBoard( Board board,@RequestParam("boardImgFile") MultipartFile file, HttpSession session) {

      try {
            if (!file.isEmpty()) { // //! ! 파일 존재 여부 확인
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path path = Paths.get(savePath, filename);
                file.transferTo(path.toFile()); // 파일 저장
                board.setB_file(filename); // 파일 경로 설정
            } else {
                board.setB_file("none"); // 파일 없을 경우 기본값 설정
            }
            mapper.write(board); // DB에 저장
            session.setAttribute("board", board);

        } catch (Exception e) {
            e.printStackTrace();
        }
       return "redirect:/loggedin";
   }
   
   @RequestMapping("/displayBoardDetail")
   public String displayBoardDetail(int b_idx , Board board) {
      
      mapper.displayBoardDetail(board);
      
      return "redirect:/view";
      
   }
   
   @RequestMapping("/displayServerBoardDetail")
   public String displayServerBoardDetail(int b_idx , Board board) {
      
      mapper.displayBoardDetail(board);
      
      return "redirect:/loggedin";
      
   }
   
   @PostMapping("/updateBoardModal")
   public String updateBoardModal(Board board , String p_idx ){
	   try {
         mapper.updateBoardModal(board);
               
      }catch(Exception e) {
            e.printStackTrace();
            //return "업로드 중 오류 발생"; // //! ! 오류 발생 시 메시지 반환
        }
      return "redirect:/view?p_idx="+p_idx;
   }
   
   @PostMapping("/updateServerBoardModal")
   public String updateServerBoardModal(Board board , String p_idx ){
	   try {
         mapper.updateBoardModal(board);
               
      }catch(Exception e) {
            e.printStackTrace();
            //return "업로드 중 오류 발생"; // //! ! 오류 발생 시 메시지 반환
        }
	   return "redirect:/loggedin";
   }

   
   
   @PostMapping("/deleteBoard")
   public String deleteBoard(Board board, String p_idx ) {
      
      try {
         mapper.deleteBoard(board);
      }catch(Exception e) {
            e.printStackTrace();
            //return "업로드 중 오류 발생"; // //! ! 오류 발생 시 메시지 반환
        }
      
      // view
      return "redirect:/view?p_idx="+p_idx;
   }
   
   @PostMapping("/deleteServerBoard")
   public String deleteServerBoard(Board board) {
      
      try {
         mapper.deleteBoard(board);
      }catch(Exception e) {
            e.printStackTrace();
            //return "업로드 중 오류 발생"; // //! ! 오류 발생 시 메시지 반환
        }
      
      // view
      return "redirect:/loggedin";
   }


}