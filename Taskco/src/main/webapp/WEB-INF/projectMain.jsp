<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Project Page</title>

<!-- Bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
	crossorigin="anonymous">

<!-- Custom Styles -->
<link rel="stylesheet" href="assets/css/style.css" />
<link rel="stylesheet" href="assets/css/project.css" />
<link rel="stylesheet" href="assets/css/manageProject.css" />
<style>
@font-face {
	font-family: 'GmarketSansMedium';
	src:
		url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff')
		format('woff');
	font-weight: normal;
	font-style: normal;
}
</style>

</head>

<body>
	<!-- Header -->
	<header id="upper_nav">
		<div class="project-logo">
			<a href="exit"> <img id="copy-code-img" style="width: auto;"
				src="/static/assets/images/TASKCO.png" alt="Taskco Logo">
			</a>
		</div>
		<nav>
			<a id="logout" href="/login">Logout</a>
		</nav>
	</header>

	<!-- Sidebar -->
	<div id="side_nav">
		<div id="project-code-container" style="text-align: center;">
			<span id="copy-code"> 초대코드 복사 <img
				src="https://cdn-icons-png.flaticon.com/512/9411/9411848.png"
				alt="Taskco Logo"
				style="width: 40px; height: auto; cursor: pointer;">
			</span> <input type="hidden" id="hidden-project-code"
				value="${project.p_idx}">
		</div>


		<!-- Project List -->
		<div id="board">
			<table id="project-list" class="table table-bordered">
				<thead>
					<tr>
						<td>프로젝트명</td>
						<td>직책</td>
					</tr>
				</thead>
				<tbody id="list">
					<c:forEach var="item" items="${list}">
						<tr class="${project.p_idx == item.p_idx ? 'active-project' : ''}">
							<td OnClick="location.href ='view?p_idx=${item.p_idx}'"
								style="cursor: pointer;">${item.p_title}</td>
							<td>${item.role}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>

		<!-- User Info -->
		<div class="user-info">
			<span id="bottomProfileImg">프로필사진</span> <span id="user_name">${user.name}</span>
			<span id="currentRole">${join.role}</span>

			<!-- 권한 설정 버튼 -->
			<div id="authority-change-container" style="text-align: right;">
				<a onclick="openAuthorityModal()"> 
				<img id="copy-code-img2"
					src="https://cdn-icons-png.flaticon.com/512/824/824700.png"
					alt="setting" style="width: 20px; height: auto; cursor: pointer;">
				</a>
			</div>
		</div>


	</div>
	<!-- Modal -->
	<!-- 권한 설정 모달창 -->
	<div class="modal" id="modal1">
		<div class="modal_body" id="modal_content">
			<!-- JavaScript에서 동적으로 내용이 추가됩니다 -->
		</div>
	</div>
	<!-- Main Content -->
	<div class="dashboard">
		<main class="main-content">
			<section class="working-list">
				<div class="title">
					<div class="kanban-header">
						<b class="projectName">${project.p_title}</b>
						<form id="todo-form">
							<input type="text" placeholder="새로 할 일" id="todo-input">
							<button type="submit">카드 추가</button>
							<button id="send-card">저장</button>
							<button id="load-kanban">칸반 불러오기</button>
						</form>
					</div>
				</div>
				<div class="board">
					<div class="lanes">
						<!-- To Do -->
						<div class="swim-lane" id="todo-lane">
							<h3 class="heading">할 일</h3>
							<div class="task" draggable="true">
								<span class="task-head">할 일 제목</span>
								<hr style="margin: 3px 0;">
								<p class="task-date">시작일 ~ 완료일</p>
								<p class="task-performer">업무 수행인원 명단</p>
								<button class="task-view">상세보기</button>
								<button class="task-update">인원 수정</button>
								<button class="task-delete">삭제</button>
							</div>
						</div>

						<!-- In Progress -->
						<div class="swim-lane" id="doing">
							<h3 class="heading">진행</h3>
						</div>

						<!-- Done -->
						<div class="swim-lane" id="done">
							<h3 class="heading">완료</h3>
						</div>
					</div>
				</div>
			</section>

			<!-- Stats Overview -->
			<div class="dashboard-stats">
				<div class="stat-card totalTasks">
					<strong>Total Tasks</strong><br> 1220
				</div>
				<div class="stat-card inProgress">
					<strong>In Progress</strong><br> 07
				</div>
				<div class="stat-card pending">
					<strong>Pending</strong><br> 43
				</div>
				<div class="stat-card completed">
					<strong>Completed</strong><br> 1550
				</div>
			</div>

			<!-- Calendar -->
			<h5>
				게시판 & 캘린더
				</h3>
				<section class="center-bottom">
					<div class="teamBoard"></div>
					<div class="Calendar"></div>
					<div class="teamMate"></div>
				</section>
		</main>

		<!-- Right Sidebar -->
		<aside class="right-sidebar">
			<section class="taskDashboard">
				<h2>전체 진척도</h2>
				<div></div>
			</section>

			<section class="chatting">
				<div id="result" style="overflow-y: auto; padding: 10px;"></div>
				<div id=toSendMessage>
					<input type="text" id="chat" placeholder="Enter your message">
					<button id="sendMessage">
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
							fill="white" class="bi bi-send" viewBox="0 0 16 16">
  <path
								d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
</svg>
					</button>
				</div>
			</section>
		</aside>
	</div>



	<script>
        document.addEventListener("DOMContentLoaded", function () {
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

            chatMessages.forEach(function (chat) {
                if (chat.chatter && chat.chat) {
                    displayMessage(chat.chatter, chat.chat , chat.chat_dt);
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
        socket.onopen = function () {
            console.log("WebSocket connected to room:", croom_idx);
        };

        // WebSocket 메시지 수신
        socket.onmessage = function (event) {
            console.log("Raw message received:", event.data); // 원본 데이터 확인
            try {
                const message = JSON.parse(event.data); // JSON 파싱
                console.log("Parsed message:", message); // 파싱된 데이터 확인
                if (typeof message === 'object' && message.chatter
                    && message.chat) {
                    displayMessage(message.chatter, message.chat, message.chat_dt); // 받은 메시지 표시
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
            function () {
                const chatMessage = document.getElementById('chat').value
                    .trim();

                if (!chatMessage) {
                    alert('메시지를 입력하세요.');
                    return;
                }

                const message = {
                    chatter: user_name,
                    chat: chatMessage
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
        socket.onerror = function (error) {
            console.error("WebSocket error:", error);
        };

        // WebSocket 연결 종료
        socket.onclose = function (event) {
            console.log("WebSocket closed:", event);
        };

        function displayMessage(who, message, time) {
            const resultDiv = document.getElementById("result");
            if (!resultDiv) {
                console.error("Result div not found in the DOM.");
                return;
            }

            // 값 정리 및 처리
            const whoText = String(who).trim();
            const messageText = String(message).trim();
            const timeText = String(time).trim();

            let messageHTML = '';

            // 조건별 메시지 생성
            if (whoText === user_name.trim()) {
                // 보낸 메시지
               messageHTML =
                   '<div class="message-container sent"><div class="sent-message">'
                            +messageText+
                            '<br><span class="timestamp">'+timeText+
                            '</span></div></div>'
                ;
            } else {
                // 받은 메시지
                messageHTML = 
                    '<div class="message-container received"><div class="received-message"><strong>'
                    +whoText+
                    '</strong><br>'
                            +messageText+
                            '<br><span class="timestamp">'
                            +timeText+
                            '</span></div></div>';
            }

            // 메시지를 결과 영역에 추가
            resultDiv.innerHTML += messageHTML;

            // 스크롤 최신 메시지로 이동
            resultDiv.scrollTop = resultDiv.scrollHeight;
        }
    </script>

	<script>
	document.addEventListener("DOMContentLoaded", function () {
	    console.log("스크립트 로드 완료");

	    const container = document.getElementById("copy-code");
	    const hiddenCode = document.getElementById("hidden-project-code");

	    if (!container || !hiddenCode) {
	        console.error("필수 요소를 찾을 수 없습니다.");
	        return;
	    }

	    console.log("요소 찾기 성공:", container, hiddenCode);

	    container.addEventListener("click", function () {
	        console.log("클릭 이벤트 실행");
	        console.log("복사할 값:", hiddenCode.value);

	        if (!navigator.clipboard) {
	            console.error("클립보드 API가 지원되지 않는 브라우저입니다.");
	            alert("현재 브라우저는 클립보드 복사를 지원하지 않습니다.");

	            // 대체 방식 실행
	            hiddenCode.style.display = "block";
	            hiddenCode.select();
	            document.execCommand("copy");
	            hiddenCode.style.display = "none";
	            alert("복사가 완료되었습니다.");
	            return;
	        }

	        navigator.clipboard.writeText(hiddenCode.value)
	            .then(() => {
	                alert("복사 성공! 클립보드에 저장되었습니다.");
	            })
	            .catch(err => {
	                console.error("복사 실패:", err);
	                alert("복사 실패: " + err.message);
	            });
	    });
	});

</script>


	<!-- Axios -->
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	<!-- Bootstrap Bundle -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
		crossorigin="anonymous"></script>
	<!-- JavaScript -->
	<script src="assets/js/kanDrag.js" defer></script>
	<script src="assets/js/getKanban.js" defer></script>

	<!--  권한설정 부분(정환추가) -->
	<script src="assets/js/manageProject.js"></script>
</body>
</html>
