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
<link rel="stylesheet" href="assets/css/kanbanModalStyle.css" />

<!-- BootStrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">



<!-- axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!--  BootStrap -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>


</head>


<body>
	<div class="board">
		<!-- 카드 추가 -->
		<form id="todo-form">
			<input type="text" placeholder="새로 할 일" id="todo-input">
			<button id="addCard">카드 추가</button>
			<button id="kanban-update" type="button">저장</button>
			<!-- form태그 안에 있기 때문에 type = button이 없으면 새로고침됨. -->

		</form>
		<!-- 칸반보드 -->
		<div class="kanbanBoard">
			<!-- 할 일 -->
			<div class="swim-lane" id="todo-lane" data-status = "todo">
				<h3 class="heading">할 일</h3>
				<!-- task 카드 -->

				<!-- <p class="task" draggable="true">할 일 2</p>
        <p class="task" draggable="true">할 일 3</p> -->
			</div>

			<!-- 진행 -->
			<div class="swim-lane" id=doing data-status = "doing">
				<h3 class="heading">진행</h3>
				<!-- <p class="task" draggable="true">할 일 1</p> -->

			</div>

			<!-- 완료 -->
			<div class="swim-lane" id=done data-status = "done">
				<h3 class="heading">완료</h3>
				<!-- <p class="task" draggable="true">할 일 1</p> -->
			</div>
		</div>
		
		<!-- 기능 테스트용 버튼 -->
		<!-- reqTeamMateList -->
		<button id = "teamMateList-test-btn">팀원 목록 불러오기</button>	
		
		<!--  -->
		<button id = "getAssignerList-test-btn">담당자 목록 불러오기</button>	
		
		
		<!-- 인원추가 -->
		<div class="btn-group">
		  <button id ="test-btn" type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
		    인원 추가
		  </button>
		  <ul class="dropdown-menu" id="assigner-dropdown-chose-test">
		    <li><a class="dropdown-item" href="#">Action</a></li>
		    <li><a class="dropdown-item" href="#">Another action</a></li>
		    <li><a class="dropdown-item" href="#">Something else here</a></li>
		    <li><hr class="dropdown-divider"></li>
		    <li><a class="dropdown-item" href="#">Separated link</a></li>
		  </ul>
		</div>
		<div id = "test-area"></div>


	</div><!-- board 클래스 끝 -->
	
	
    <!-- 칸반 수정 모달 창-->
    <div id="kanEditModal" class = "hidden"> 
        <div id="modalBody">
            <h1>모달창 내용!</h1> <!-- 상단 태그 -->
            <span id="kanModalCloseBtn">&times;</span> <!-- 모달을 닫는 X 버튼 -->\
            <div id="modal-container">
                <div id = "modal-content">
                    <label for="modalTitle">제목 : </label>
                    <input type="text" id="modalTitle" >
                    <br>
                    <p id="modalStatus"></p>
                    <br>
                    <label for="modalSdDt">시작일 :</label>
                    <input type="date" id="modalStDt" >
                    <span>~</span>
                    <label for="modalEdDt">종료일 :</label>
                    <input type="date" id="modalEdDt" >
                    <br>
                    <div id = assigner-container>
	                    <label for="assigner-current">담당자</label>
	                    <input type="text" id="assigner-current" >
	                    <!-- Example single danger button -->
						<div class="btn-group">
						  <button id ="assigner-dropdown-btn" type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						    인원 추가
						  </button>
						  <!--  -->
						  <ul class="dropdown-menu" id="assigner-dropdown-chose"></ul>
						</div>
                    </div>
                    
                    <br>
                    <label for="modalContent">내용</label>
                    <br>
                    <textarea type="text" id="modalContent" ></textarea>
                    <br>
                </div>
           
            </div>
             <!-- 전체 저장 버튼 -->
             <button id="kanModalSaveBtn" >저장</button> 
             <button id="kanModalEditBtn" >수정</button> 
        </div>
    </div>
    <!-- ㄴ 모달창 종료 -->



	<!-- script -->
	<script src="assets/js/kanDrag.js" defer></script>
	<script src="assets/js/KanbanModal.js" defer></script>
	<script src="assets/js/kanInsertCard.js" defer></script>
	<script src="assets/js/getKanban.js" defer></script>
	<script src="assets/js/kanbanUpdate.js" defer></script>
	<script src="assets/js/teamMateList.js" defer></script> <!-- 팀원 전체 정보 불러오기 -->
	<script src="assets/js/getKanAssigner.js" defer></script> <!-- 담당자 정보 불러오기 -->
	<script src="assets/js/SelectAssigner.js" defer></script> <!-- 팀원선택 -->
	



</body>

</html>