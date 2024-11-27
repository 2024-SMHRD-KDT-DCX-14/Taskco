<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>

<!-- css파일 -->
<link rel="stylesheet" href="assets/css/kanbanTestStyle.css" />

<<!-- <script src="sendCard.js" defer></script> -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>



</head>


<body>
	<div class="board">
		<!-- 카드 추가 -->
		<form id="todo-form">
			<input type="text" placeholder="새로 할 일" id="todo-input">
			<button id ="addCard" >카드 추가</button>
			<button id="kanban-update" type = "button">저장</button> <!-- form태그 안에 있기 때문에 type = button이 없으면 새로고침됨. -->
			
		</form>
		<!-- 칸반보드 -->
		<div class="kanbanBoard">
			<!-- 할 일 -->
			<div class="swim-lane" id="todo-lane">
				<h3 class="heading">할 일</h3>
				<!-- task 카드 -->

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

		<span></span>


	</div>
	<!-- board 클래스 끝 -->
	
	<!-- script -->
	<script src="assets/js/kanDrag.js" defer></script>
	<script src="assets/js/kanInsertCard.js" defer></script>
	<script src="assets/js/getKanban.js" defer></script>
	<script src="assets/js/kanbanUpdate.js" defer></script>
	
	
	

</body>

</html>