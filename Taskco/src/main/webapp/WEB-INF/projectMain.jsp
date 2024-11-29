<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="assets/css/project.css">
<link rel="stylesheet" href="assets/css/style.css" />
<!-- <script src="sendCard.js" defer></script> -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>


</head>


<body>
	<div class="dashboard">
		<!-- Sidebar -->
		<aside class="sidebar">
			<div class="project-name">
				<span>P</span><span>${project.p_idx}</span>
			</div>
			<tbody>
			<c:forEach var="team" items="${teamMate}">
				<tr>
					<td>${team.profile_img}</a></td>
					<td>${team.name}</td>
					<td>${team.role}</td>
				</tr>
			</c:forEach>
			</tbody>
			<div class="user-info">
				<img src="profile-placeholder.jpg" alt="Profile" class="profile-pic">
				<span>${user.name }</span>
				<p>${join.role }</p>
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

			<section class="upcoming">
				<h3>Upcoming</h3>
				<div class="upcoming-event">
					<p>10 AM - Research</p>
				</div>
				<div class="upcoming-event">
					<p>11 AM - Landing Page Design</p>
				</div>
			</section>
		</aside>
	</div>

	<script src="assets/js/kanDrag.js" defer></script>
	<script src="assets/js/kanInsertCard.js" defer></script>
	<script src="assets/js/getKanban.js" defer></script>
	<script src="assets/js/kanbanUpdate.js" defer></script>
</body>

</html>