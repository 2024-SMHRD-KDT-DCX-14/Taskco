<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="assets/css/project.css">
<link rel="stylesheet" href="assets/css/style.css" />
<!-- 권한설정 모달창 관련 css -->
<link rel="stylesheet" href="assets/css/manageProject.css" />
<!-- <script src="sendCard.js" defer></script> -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>


</head>


<body>
	<div class="dashboard">
		<!-- Sidebar (정환수정) -->
		<aside class="sidebar">
			<div class="project-logo">
				<!-- 프로젝트 나가기 -->
				<a href="exit"> <img src="/images/TASKCO.png" alt="Taskco Logo"
					style="width: 200px; height: auto;">
				</a>
				<!-- 프로젝트 고유코드 복사 -->
				<div id="project-code-container" style="text-align: right;">
					<span>고유코드 복사</span> <img id="copy-code-img"
						src="https://cdn-icons-png.flaticon.com/512/9411/9411848.png"
						alt="Taskco Logo"
						style="width: 50px; height: auto; cursor: pointer;">
				</div>
			</div>
			<!-- 숨겨진 데이터: 프로젝트 코드 -->
			<input type="hidden" id="hidden-project-code"
				value="${project.p_idx}">

			<!-- 프로필, 이름, 직책 리스트 -->
			<!-- 이 부분 axios로 처리하기(JSTL X)  
				참여한 프로젝트 리스트 선택가능 하게
				->
			<%-- 			<tbody>
				<c:forEach var="team" items="${teamMate}">
					<tr>
						<td>${team.profile_img}</a></td>
						<td>${team.name}</td>
						<td>${team.role}</td>
					</tr>
				</c:forEach>
			</tbody> --%>
			<!--권한 설정 부분 -->
			<div class="user-info">
				<!-- 현재 내 프로필  -->
				<span>프로필사진</span> <span>${user.name }</span>
				<p>${join.role }</p>
				<!--권한 설정 버튼  -->
				<div id="authority-change-container" style="text-align: right;">
					권한 설정 <a onclick="openAuthorityModal()"> <img
						id="copy-code-img2"
						src="https://cdn-icons-png.flaticon.com/512/824/824700.png"
						alt="setting" style="width: 20px; height: auto; cursor: pointer;">
					</a>
				</div>
			</div>

			<!-- 권한 설정 모달창 (정환 추가, 공통 모달) -->
			<!-- 공통 모달 -->
			<div class="modal" id="modal1">
				<div class="modal_body" id="modal_content">
					<!-- JavaScript에서 동적으로 내용이 추가됩니다 -->
				</div>
				<button class="close-btn" onclick="closeModal('modal1')">닫기</button>
			</div>


		</aside>
		<!-- Main Content -->
		<main class="main-content">
			<header class="header">
				<h1>${project.p_title }</h1>
				<div class="date">${project.st_dt }~${project.ed_dt }</div>
			</header>

			<!-- Working List -->
			<section class="working-list">
				<div class="title">
					<h2>To Do List</h2>
					<form id="todo-form">
						<input type="text" placeholder="새로 할 일" id="todo-input">
						<button type="submit">카드 추가</button>
						<button id="send-card">저장</button>
						<button id="load-kanban">칸반 불러오기</button>
					</form>
				</div>
				<div class="board">
					<!-- 카드 추가 -->

					<!-- 컬럼 -->
					<div class="lanes">
						<!-- 할 일 -->
						<div class="swim-lane" id="todo-lane">
							<h3 class="heading">할 일</h3>
							<!-- task 카드 -->
							<div class="task" draggable="true">
								<p class="task-head">할 일 제목</p>
								<hr>
								<p class="task-date">시작일 ~ 완료일</p>
								<p class="task-performer">업무 수행인원 명단</p>
								<button class="task-view">상세보기</button>
								<!-- 클릭하면 내용 볼 수 있게 연결 -->
								<button class="task-update">인원 수정</button>
								<button class="task-delete">삭제</button>
							</div>

							<!-- <p class="task" draggable="true">할 일 2</p>
                        <p class="task" draggable="true">할 일 3</p> -->
						</div>

						<!-- 진행 -->
						<div class="swim-lane" id=doing>
							<h3 class="heading">진행</h3>
							<!-- <p class="task" draggable="true">할 일 1</p> -->

						</div>

						<!-- 완료 -->
						<div class="swim-lane" id=done>
							<h3 class="heading">완료</h3>
							<!-- <p class="task" draggable="true">할 일 1</p> -->

						</div>
					</div>
				</div>


			</section>

			<!-- Stats Overview -->
			<div class="dashboard-stats">
				<div class="stat-card">
					<p>1220 Total Tasks</p>
				</div>
				<div class="stat-card">
					<p>07 In Progress</p>
				</div>
				<div class="stat-card">
					<p>43 Pending</p>
				</div>
				<div class="stat-card">
					<p>1550 Completed</p>
				</div>
			</div>


			<!-- Calendar -->
			<section class="calendar">
				<h3>Chat& Calendar</h3>
				<!-- Calendar Grid (Placeholder) -->
				<div class="calendar-grid">
					<!-- Calendar dates go here -->
				</div>
			</section>
		</main>

		<!-- Sidebar Right -->
		<aside class="right-sidebar">
			<section class="working-status">
				<h2>Working Status</h2>
				<div class="progress-circle">
					<p>70% Member Working</p>
				</div>
			</section>

			<section class="chatting">
				<h2>Chat</h2>
				<div id="result"></div>
				<input type="text" id="chat" placeholder="Enter your message" />
				<button id="sendMessage">Send</button>
			</section>
		</aside>
	</div>





	<script>
      document.addEventListener("DOMContentLoaded", function() {
         // JSON 데이터를 세션에서 가져오기
         const chatMessages = JSON.parse('${chatMessagesJson}');
         console.log("Initializing chat messages from session:",
               chatMessages);

         initializeChatMessages(chatMessages);
      });

      // 채팅 메시지 초기화 함수
      function initializeChatMessages(chatMessages) {
         const resultDiv = document.getElementById("result");
         if (!resultDiv) {
            console.error("Result div not found in the DOM.");
            return;
         }

         chatMessages.forEach(function(chat) {
            if (chat.chatter && chat.chat) {
               displayMessage(chat.chatter, chat.chat);
               console.log(chat);
            } else {
               console.error("Invalid chat object:", chat);
            }
         });
      }

      // JSP 데이터를 JavaScript 변수로 전달
      var user_name = "${sessionScope.user.name}";
      var croom_idx = "${sessionScope.Croom.croom_idx}";

      console.log("User name:", user_name);
      console.log("Croom index:", croom_idx);

      const websocketUrl = "ws://localhost:8089/ws/view?croom_idx="
            + encodeURIComponent(croom_idx);
      console.log("Connecting to WebSocket URL:", websocketUrl);

      const socket = new WebSocket(websocketUrl);

      // WebSocket 연결 성공
      socket.onopen = function() {
         console.log("WebSocket connected to room:", croom_idx);
      };

      // WebSocket 메시지 수신
      socket.onmessage = function(event) {
         console.log("Raw message received:", event.data); // 원본 데이터 확인
         try {
            const message = JSON.parse(event.data); // JSON 파싱
            console.log("Parsed message:", message); // 파싱된 데이터 확인
            if (typeof message === 'object' && message.chatter
                  && message.chat) {
               displayMessage(message.chatter, message.chat); // 받은 메시지 표시
            } else {
               console.error("Invalid message structure:", message);
            }
         } catch (error) {
            console.error("Error parsing WebSocket message:", error); // JSON 파싱 오류
         }
      };

      // 메시지 전송
      document.getElementById('sendMessage').addEventListener(
            'click',
            function() {
               const chatMessage = document.getElementById('chat').value
                     .trim();

               if (!chatMessage) {
                  alert('메시지를 입력하세요.');
                  return;
               }

               const message = {
                  chatter : user_name,
                  chat : chatMessage
               };

               try {
                  // JSON 문자열 확인 및 WebSocket 전송
                  const jsonMessage = JSON.stringify(message);
                  console.log("Sending message:", jsonMessage); // 디버깅용 로그
                  socket.send(jsonMessage);

                  // 입력 필드 초기화
                  document.getElementById('chat').value = '';
               } catch (error) {
                  console.error("Error sending message:", error); // 전송 중 오류
               }
            });

      // WebSocket 오류 처리
      socket.onerror = function(error) {
         console.error("WebSocket error:", error);
      };

      // WebSocket 연결 종료
      socket.onclose = function(event) {
         console.log("WebSocket closed:", event);
      };

      function displayMessage(who, message) {
         const resultDiv = document.getElementById("result");
         if (!resultDiv) {
            console.error("Result div not found in the DOM.");
            return;
         }
         // 데이터 유효성 검사
          if (!who || !message) {
              console.error("Invalid message content:", { who, message });
              return;
          }

         console.log("Adding message to result div:");
         console.log("Who:", who);
         console.log("Message:", message);

         // 값 강제 변환 및 공백 제거
         const whoText = String(who).trim();
         const messageText = String(message).trim();

         console.log("Processed Who:", whoText);
         console.log("Processed Message:", messageText);

         // 새로운 메시지 HTML 생성
         let messageHTML = "";

         if (whoText === user_name.trim()) {
            // 보낸 메시지
            messageHTML = '<p class="sent-message"><strong>나:</strong>'
                  + messageText + '</p>';
         } else {
            // 받은 메시지
            messageHTML = '<p class="received-message"><strong>' + whoText
                  + ':</strong>' + messageText + '</p>';
         }

         // 메시지를 resultDiv에 추가
         resultDiv.innerHTML += messageHTML; // 기존 내용 뒤에 추가

         console.log("Result div after append:", resultDiv.innerHTML);

         // 스크롤을 최신 메시지로 이동
         resultDiv.scrollTop = resultDiv.scrollHeight;
      }
   </script>
	<script src="assets/js/kanDrag.js" defer></script>
	<script src="assets/js/kanInsertCard.js" defer></script>
	<script src="assets/js/getKanban.js" defer></script>
	<script src="assets/js/kanbanUpdate.js" defer></script>
</body>

</html>


	<!-- hiddenCode.js (프로젝트 고유번호 숨기기 , 정환추가) -->
	<script src="assets/js/hiddenCode.js"></script>
	<!--  권한설정 부분(정환추가) -->
	<script src="assets/js/manageProject.js"></script>