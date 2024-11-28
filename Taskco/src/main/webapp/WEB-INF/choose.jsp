<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profile Layout</title>

<link rel="stylesheet" href="assets/css/profilepage.css">
<link href="assets/css/makeProject.css" rel="stylesheet">


</head>
<body>
<div class="container">
        <div class="profile">
            <img src="https://i3n.news1.kr/system/photos/2022/4/7/5306119/high.jpg" alt="Profile Picture">
            <br>
            <div>   
            <!-- 수정 버튼 -->
            <!-- 모달  -->
                <span>${sessionScope.user.name }</span><img id= "edit_icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s" alt="QR Code"></a>
            </div>
            <p>${sessionScope.user.email }</p>
            <div class="contact-icons">
                ${sessionScope.user.status_msg }
            </div>
        </div>
        
        
                
        <div class="details">
            
            <div id="board">
                    <table id="project-list">
                        <thead>
                            <tr>
                                <td>프로젝트명</td>
                                <td>직책</td>
                            </tr>
                        </thead>
                        <tbody id="list">
                            <c:forEach var="item" items="${list}">
                                <tr>
                                    <div OnClick="location.href ='view?P_ID=${item.p_idx}'" style="cursor:pointer;">
                                       <td>${item.p_title}</a></td>
                                    
                                       <td>${item.role}</td>
                                    </div>
                                    <td> <a href="delete/${item.p_idx}"> X </a> </td>
                                </tr>
                            </c:forEach>    
                            
                        </tbody>
                    </table>
                    <div id="project_control">
                        <button class="button btn-open-modal2" onclick="openModal('createModal')">프로젝트 생성</button>
                        <input id="text" type="text">
                        <button class="button btn-open-modal3" onclick="openModal('addModal')">프로젝트 추가</button></div>
                    </div>
                    
            <div class="modal" id="addModal">
                <div class="modal_body">
                <form action="joinProject" method="post" enctype="multipart/form-data">
                    <h2>프로젝트 코드</h2>
                    <span>코드 입력</span> <br>
                    <input name="p_idx" type="text" placeholder="프로젝트 코드">
                    <button class="addButton" type="submit">추가</button>
                    <div class="close-btn">닫기</div>
                </form>
                </div>
            </div>

            <div class="modal" id="createModal">
                
                <div class="modal_body2">
                    <form class="modal_input" action="createProject" method="post" enctype="multipart/form-data">

                        <h2> 프로젝트 생성</h2>
                        <div id="form_text">
                                <b>프로젝트 명</b>
                                <input name="p_title" type="text" width="100%" >
                                <b>프로젝트 생성자</b>
                                <input readonly width="100%;" value="${user.email }" name="email" type="text">
                                <b>내용</b>
                                <textarea name="p_desc" rows="4" style="resize: none;"></textarea>
                                종료 일자를 선택하세요<input type="date" name="ed_dt">
                            <div id="form_btn">
                                <tr>
                                    <td colspan="2">
                                        <input type="reset" value="초기화"> 
                                        <input type="submit" value="생성">
                                    </td>
                                </tr>
                            </div>
                        </div>
                            
                        
                    </form>
                    <div class="close-btn">닫기</div>
                </div>
            </div>
        



            <div class="modal" id="modal1">
                <div class="modal_body">
                    <h2>프로필 수정</h2>
                    <div>
                        <label>이름</label>
                        <input name="phone" type="text" placeholder="변경 이름 입력">
                    </div>
                    <br>
                    <div>
                        <label>이메일</label>
                        <input name="email" type="text" placeholder="새 이메일 입력">
                    </div>
                    <br>
                    <div>
                        <label>상태메시지</label>
                        <input name="status_msg" type="text" placeholder="새 상태메시지 입력">
                    </div>
                    
                    <div class="submit">수정</div>
                    <div class="close-btn" onclick="closeModal('modal1')">닫기</div>
                </div>
            </div>
            
    </div>

   <!--프로젝트 생성 모달창 js  -->
   <script src="assets/js/makeProject.js"></script>

</body>
</html>
