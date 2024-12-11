package com.taskco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.taskco.entity.Board;

@Mapper
public interface BoardMapper {
   
   public List<Board> list(String p_idx);
   
   public void write ( Board board );
   
   // 여기에 sql문 넣을까 고민중.. 일단 넣음
   // AND P_IDX 로 p_idx도 같이 갈아야할 필요잇음 
   // 시간나면 하기
   // a query 참고
   /*
    * @Delete("""
    * 
    * delete from Board where b_idx = #{b_idx}
    * 
    * """) public int delete(int b_idx);
    */

   public Board view(int b_idx);

   // 내가 쓴거 public List<Board> displayBoardDetail(Board board);

   // 이클립스가 자동완성해준거 -> 에러 떠서 이걸로 해놓음
   public void displayBoardDetail(Board board);
   
   public int updateBoardModal(Board board);
   
   public int deleteBoard(Board board);


}
