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
<!-- axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<!-- 칸반 css파일 -->
<link rel="stylesheet" href="assets/css/kanbanTestStyle.css" />
<link rel="stylesheet" href="assets/css/kanbanModalStyle.css" />

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
	<header id="upper_nav" style="">
		<div class="project-logo">
			<a href="exit"> <img id="copy-code-img" style="width: 60px; border-radius:40%; border:0.5px solid gray; "
				src="/images/TASKCO.png" alt="Taskco Logo"></a>
		</div>
		<nav>
			<a id="logout" href="/login">Logout</a>
		</nav>
	</header>

	<!-- Sidebar -->
	<div id="side_nav">
		<div id="project-code-container" style="text-align: center;">
			<b id="copy-code"> 초대코드 복사 <img
				src="https://cdn-icons-png.flaticon.com/512/9411/9411848.png"
				alt="Taskco Logo"
				style="width: 35px; height: auto; cursor: pointer;">
			</b> <input type="hidden" id="hidden-project-code"
				value="${project.p_idx}">
		</div>

		<div
			style="overflow-y: auto; border: 1px solid #ccc; max-width: 700px;">

			<div style="width: 100%;">
				<ul id="plist" class="list-group">
					<c:forEach var="item" items="${list}">
						<li class="list-group-item"><c:choose>
								<c:when test="${item.role == '팀장'}">
									<div class="d-flex justify-content-between"
										OnClick="location.href ='view?p_idx=${item.p_idx}'"
										style="cursor: pointer;">
										<span>${item.p_title}</span><span
											class="badge rounded-pill bg-primary text-white">${item.role}</span>
									</div>
								</c:when>
								<c:otherwise>
									<div class="d-flex justify-content-between"
										OnClick="location.href ='view?p_idx=${item.p_idx}'"
										style="cursor: pointer;">
										<span>${item.p_title}</span><span
											class="badge rounded-pill bg-secondary text-white">${item.role}</span>
									</div>
								</c:otherwise>
							</c:choose></li>
					</c:forEach>
				</ul>
			</div>

		</div>
		<div class="d-flex align-items-center ">
			<input id="search" type="text" placeholder="프로젝트명 검색"
				class="form-control" style="width: 100%">
		</div>
		<!-- User Info -->
		<div class="user-info">
			
			<img src='/images/${sessionScope.user.profile_img}' id="bottomProfileImg"> <span
				id="user_name">${user.name}</span> <span id="currentRole">${join.role}</span>
			<svg id="manageImg"
				style="width: 40px; height: auto; cursor: pointer;"
				onclick="openAuthorityModal()" xmlns="http://www.w3.org/2000/svg"
				width="16" height="16" fill="white" class="bi bi-gear"
				viewBox="0 0 16 16">
  <path
					d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
  <path
					d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
</svg>
		</div>


	</div>
	<!-- Modal -->

	<div class="modal-overlay" id="overlay">
		<div class="modal" id="modal1">
			<div class="modal_body" id="modal_content">
				<!-- Modal 내부 스크롤 영역 -->
				<div class="scrollable-content">
					<!-- 여기에 내용이 동적으로 추가됨 -->
				</div>
			</div>
		</div>
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
							<button id="addCard">카드 추가</button>
							<button id="kanban-update" type="button">저장</button>
						</form>
					</div>
				</div>
				<div class="board">
					<!-- 카드 추가 -->

					<!-- 칸반보드 -->
					<div class="kanbanBoard">
						<!-- 할 일 -->
						<div class="swim-lane" id="todo-lane" data-status="todo">
							<h3 class="heading">할 일</h3>
							<!-- task 카드 -->

							<!-- <p class="task" draggable="true">할 일 2</p>
        					<p class="task" draggable="true">할 일 3</p> -->
						</div>

						<!-- 진행 -->
						<div class="swim-lane" id=doing data-status="doing">
							<h3 class="heading">진행</h3>
							<!-- <p class="task" draggable="true">할 일 1</p> -->

						</div>

						<!-- 완료 -->
						<div class="swim-lane" id=done data-status="done">
							<h3 class="heading">완료</h3>
							<!-- <p class="task" draggable="true">할 일 1</p> -->
						</div>
					</div>



				</div>
				<!-- board 클래스 끝 -->



				<section class="center-bottom">


					<div id="board"
						style="overflow-y: scroll; max-height: 420px; border: 1px solid;">
						<table id="list"
							class="table table-hover table-striped text-center"
							style="border: 1px solid;">
							<tr>
								<td colspan="2">
									<!-- 검색 입력 필드 추가 --> <input id="searchBoard" type="text"
									placeholder="검색..." style="width: auto;">
								</td>
								<td>
									<div class="btn btn-outline-primary"
										onclick="openModal('createBoardModal')">작성</div>
								</td>
							</tr>
							<c:forEach var="item" items="${boards}">
								<tr
									onclick="openViewModal(${item.b_idx}, '${item.b_title}', '${item.b_content}', '${item.email}', '${item.b_dt}')"
									style="cursor: pointer;">
									<td style="display: none;">${item.b_idx}</td>
									<td class="title_underline">${item.b_title}</td>
									<td>${item.email}</td>
									<td>${item.b_dt}</td>
								</tr>
							</c:forEach>
						</table>
					</div>
					<div class="justify-content-end " style="width: auto;">
						<ul class="list-group" style="max-width: auto;">

							<c:forEach var="team" items="${teamMate}">
								<li class="list-group-item d-flex justify-content-around">
										<img id='teamImg'
										src='/images/${team.profile_img}'><span>${team.name}</span>
									<c:choose>
										<c:when test="${team.role == '팀장'}">
											<span class="badge rounded-pill bg-primary text-white">${team.role}</span>
										</c:when>
										<c:otherwise>
											<span class="badge rounded-pill bg-secondary text-white">${team.role}</span>
										</c:otherwise>
									</c:choose>
								</li>
							</c:forEach>
						</ul>
					</div>
				</section>

				<!-- 게시판 모달 -->
				<!-- 작성 모달 -->
				<!-- 게시글 작성 모달 -->
				<div class="modalBoard" id="createBoardModal">
					<div class="modal_board_body">
						<form id="boardModalcreate" action="createBoard" method="post"
							enctype="multipart/form-data">
							<h2 class="mb-3">게시글 작성</h2>
							<input type="hidden" name="p_idx"
								value="${sessionScope.project.p_idx}">
							<div class="mb-3">
								<label for="b_title" class="form-label">게시글 명:</label> <input
									id="b_title" name="b_title" type="text" class="form-control"
									required>
							</div>
							<div class="mb-3">
								<label for="email" class="form-label">작성자:</label> <input
									id="email" name="email" type="text" value="${user.email}"
									readonly class="form-control">
							</div>
							<div class="mb-3">
								<label for="b_content" class="form-label">내용:</label>
								<textarea id="b_content" name="b_content" rows="5"
									class="form-control" required></textarea>
							</div>
							<div class="mb-3">
								<label for="boardImgFile" class="form-label">이미지:</label> <input
									id="boardImgFile" name="boardImgFile" type="file"
									class="form-control">
							</div>
							<button type="submit" class="btn btn-primary w-100">업로드</button>
						</form>
						<button type="button" class="btn btn-secondary mt-3 w-100"
							onclick="closeModal('createBoardModal')">닫기</button>
					</div>
				</div>

				<!-- 게시글 보기 모달 -->
				<div class="modalBoard" id="displayBoardDetail">
					<div class="modal_board_body">
						<form action="updateBoardModal" method="post"
							enctype="multipart/form-data">
							<input type="hidden" name="p_idx"
								value="${sessionScope.project.p_idx}"> <input
								id="modal-b-idx" type="hidden" name="b_idx">
							<h2 class="mb-3">게시글 수정</h2>
							<div class="mb-2">
								<label for="modal-b-title" class="form-label">제목:</label> <input
									id="modal-b-title" name="b_title" type="text"
									class="form-control" required>
							</div>
							<div class="mb-2">
								<label for="modal-b-email" class="form-label">작성자:</label> <input
									id="modal-b-email" name="email" type="text"
									class="form-control" readonly>
							</div>
							<div class="mb-2">
								<label for="modal-b-dt" class="form-label">작성일:</label> <input
									id="modal-b-dt" name="b_dt" type="text" class="form-control"
									readonly>
							</div>
							<div class="mb-2">
								<label for="modal-b-content" class="form-label">내용:</label>
								<textarea id="modal-b-content" name="b_content" rows="5"
									class="form-control" required></textarea>
							</div>
							<button type="submit" class="btn btn-primary w-100">저장</button>
						</form>
						<form action="deleteBoard" method="post" class="mt-3">
							<input type="hidden" name="p_idx"
								value="${sessionScope.project.p_idx}"> <input
								id="modal-b-idx-for-del" type="hidden" name="b_idx">
							<button type="submit" class="btn btn-danger w-100">삭제</button>
						</form>
						<button type="button" class="btn btn-secondary mt-3 w-100"
							onclick="closeModal('displayBoardDetail')">닫기</button>
					</div>
				</div>
		</main>

		<!-- Right Sidebar -->
		<aside class="right-sidebar">
			<section class="taskDashboard">
				<div class="chart-container">
					<canvas id="myChart"></canvas>
					<div class="dashboard-stats" id="dashboard-stats">
						<div class="stat-card totalTasks">
							<strong>전체 태스크</strong>
							<p id="total-task-num">0</p>
						</div>
						<div class="stat-card inProgress">
							<strong>할 일</strong>
							<p id="todo-task-num">0</p>
						</div>
						<div class="stat-card pending">
							<strong>진행</strong>
							<p id="doing-task-num">0</p>
						</div>
						<div class="stat-card completed">
							<strong>완료</strong>
							<p id="done-task-num">0</p>
						</div>
					</div>
				</div>

			</section>

			<section class="chatting">

				<div id="searchContainer" class="d-flex" style="height: 40px;">
					<button id="prevMatch" class="btn btn-secondary btn-sm"
						style="height: 40px;">◁</button>
					<button id="nextMatch" class="btn btn-secondary btn-sm"
						style="height: 40px;">▷</button>
					<input id="chatSearch" class="form-control mb-2" type="text"
						placeholder="채팅 검색">
				</div>

				<!-- 채팅 메시지 영역 -->
				<div id="result" class="chat-content overflow-auto p-3"
					style="height: 430px; border: 1px solid #ccc;">
					<!-- 채팅 메시지가 여기에 표시됩니다 -->
				</div>

				<!-- 메시지 입력 -->
				<div id="toSendMessage" class="chat-footer d-flex border-top mt-2">
					<input type="text" id="chat" class="form-control me-2"
						placeholder="메시지 입력">
					<button id="sendMessage" class="btn btn-primary">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
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

        function initializeChatMessages(chatMessages) {
            const resultDiv = document.getElementById("result");
            if (!resultDiv) {
                console.error("Result div not found in the DOM.");
                return;
            }

            if (!chatMessages || chatMessages.length === 0) {
                console.warn("No chat messages found. Displaying default message.");
                return;
            }

            chatMessages.forEach(function (chat) {
                if (chat.chatter && chat.chat) {
                    displayMessage(chat.chatter, chat.chat, chat.chat_dt);
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

        
   // WebSocket connection setup
const socket = new WebSocket(websocketUrl);

socket.onopen = function () {
    console.log("WebSocket connected successfully to room:", croom_idx);
};

socket.onmessage = function (event) {
    try {
        const message = JSON.parse(event.data);
        if (message && message.chatter && message.chat) {
            displayMessage(message.chatter, message.chat, message.chat_dt);
        } else {
            console.warn("Empty or invalid message received:", message);
            // 빈 메시지에 대한 기본 처리
            if (!message || Object.keys(message).length === 0) {
                displayMessage("System", "No chat history available", new Date().toLocaleString());
            }
        }
    } catch (error) {
        console.error("Error parsing WebSocket message:", error);
    }
};

// WebSocket error handling
socket.onerror = function (error) {
    console.error("WebSocket error encountered:", error);
};

// WebSocket connection closed
socket.onclose = function (event) {
    console.warn("WebSocket closed:", event.code, event.reason);
    // Attempt reconnecting after delay
    setTimeout(() => {
        console.log("Reconnecting WebSocket...");
        // Call your WebSocket setup function here
    }, 5000);
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


	<script>
	/* 검색기능 */
	// 검색 기능이 input의 값이 변경될 때 동작하도록 연결
	document.addEventListener("DOMContentLoaded", function () {
    const chatSearch = document.getElementById("chatSearch");
    const prevButton = document.getElementById("prevMatch");
    const nextButton = document.getElementById("nextMatch");
    const chatMessages = document.querySelectorAll("#result .message-container");

    let matchIndices = []; // 검색어가 포함된 메시지의 인덱스
    let currentMatchIndex = -1; // 현재 선택된 매칭의 인덱스

    // 검색어 입력 시 자동 검색 및 첫 번째 매칭 포커싱
    chatSearch.addEventListener("input", function () {
        const searchTerm = chatSearch.value.trim().toLowerCase();
        if (!searchTerm) {
            clearHighlights();
            return;
        }
        searchInChat(searchTerm);
    });

    // 이전 매칭으로 이동
    prevButton.addEventListener("click", function () {
        if (matchIndices.length > 0) {
            currentMatchIndex = (currentMatchIndex - 1 + matchIndices.length) % matchIndices.length;
            focusOnMatch(currentMatchIndex);
        }
    });

    // 다음 매칭으로 이동
    nextButton.addEventListener("click", function () {
        if (matchIndices.length > 0) {
            currentMatchIndex = (currentMatchIndex + 1) % matchIndices.length;
            focusOnMatch(currentMatchIndex);
        }
    });

    // 채팅 메시지에서 검색어를 찾고 매칭된 메시지 강조
    function searchInChat(term) {
        clearHighlights();
        matchIndices = [];
        currentMatchIndex = -1;

        chatMessages.forEach((message, index) => {
            const content = message.textContent.toLowerCase();
            if (content.includes(term)) {
                matchIndices.push(index);
                message.classList.add("highlight");
            }
        });

        // 첫 번째 매칭된 메시지로 이동
        if (matchIndices.length > 0) {
            currentMatchIndex = 0;
            focusOnMatch(currentMatchIndex);
        }
    }

    // 특정 메시지로 스크롤 및 강조 표시
    function focusOnMatch(index) {
        const message = chatMessages[matchIndices[index]];
        if (message) {
            message.scrollIntoView({ behavior: "smooth", block: "center" });
            chatMessages.forEach((msg, i) => {
                msg.classList.toggle("focused", i === matchIndices[index]);
            });
        }
    }

    // 검색 하이라이트 및 스타일 초기화
    function clearHighlights() {
        chatMessages.forEach((message) => {
            message.classList.remove("highlight", "focused");
        });
        matchIndices = [];
        currentMatchIndex = -1;
    }
});


	</script>

	<script>
	const OnSearch = () => {
	    const input = document.querySelector("#search");
	    const filter = input.value.toUpperCase();

	    // 모든 li 요소를 선택
	    const list = document.querySelectorAll("#plist li");

	    if (!list.length) {
	        console.error("No list items found under #plist");
	        return;
	    }

	    list.forEach((el) => {
	        // 첫 번째 span 태그를 선택
	        const span = el.querySelector("span:first-child");

	        if (!span) {
	            console.warn("No <span> found inside li:", el);
	            el.style.display = "none";
	            return;
	        }

	        const text = span.textContent.toUpperCase().trim();
	        // 첫 번째 span 태그의 텍스트를 기준으로 필터링
	        el.style.display = text.includes(filter) ? "" : "none";
	    });
	};

	// 검색 기능이 input의 값이 변경될 때 동작하도록 연결
	document.addEventListener("DOMContentLoaded", () => {
	    const searchInput = document.querySelector("#search");
	    if (!searchInput) {
	        console.error("Search input not found.");
	        return;
	    }

	    searchInput.addEventListener("input", OnSearch);
	});

	</script>
	<!-- Axios -->
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	<!-- Bootstrap Bundle -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
		crossorigin="anonymous"></script>
	<!-- 칸반 자스 -->
	<script src="assets/js/kanDrag.js" defer></script>
	<script src="assets/js/KanbanModal.js" defer></script>
	<script src="assets/js/kanInsertCard.js" defer></script>
	<script src="assets/js/getKanban.js" defer></script>
	<script src="assets/js/kanbanUpdate.js" defer></script>
	<script src="assets/js/teamMateList.js" defer></script>
	<!-- 팀원 전체 정보 불러오기 -->
	<script src="assets/js/getKanAssigner.js" defer></script>
	<!-- 담당자 정보 불러오기 -->
	<script src="assets/js/SelectAssigner.js" defer></script>
	<!-- 팀원선택 -->

	<!--  권한설정 부분(정환추가) -->
	<script src="assets/js/manageProject.js"></script>

	<!-- chart.js -->
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"
		defer></script>
	<script src="assets/js/dashBoard.js" defer></script>

	<!-- 게시판 -->
	<script src="assets/js/makeBoard.js" defer></script>
</body>
</html>
