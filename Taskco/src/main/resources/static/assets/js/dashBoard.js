document.addEventListener("DOMContentLoaded", () => {
    console.log("스크립트 로드 완료");

    // 초기 데이터를 DOM에서 로드 후 차트 초기화
    updateDashboard();

    // DOM 변경 감지하여 업데이트
    const observer = new MutationObserver(() => {
        setTimeout(() => updateDashboard(), 0); // DOM 변경 후 곧바로 updateDashboard 호출
    });
    observer.observe(document.querySelector(".kanbanBoard"), {
        childList: true,
        subtree: true,
    });
});

function updateDashboard() {
    const allTask = document.querySelectorAll(".task");

    let todoTask = 0;
    let doingTask = 0;
    let doneTask = 0;

    allTask.forEach(task => {
        const status = task.dataset.status;
        if (status === "todo") {
            todoTask++;
        } else if (status === "doing") {
            doingTask++;
        } else if (status === "done") {
            doneTask++;
        }
    });

    // 대시보드 숫자 업데이트
    overviewDashBoard(allTask.length, todoTask, doingTask, doneTask);

    // 차트 업데이트
    taskPieChart(todoTask, doingTask, doneTask);
}

let myChartInstance;

function taskPieChart(todoTask, doingTask, doneTask) {
    const ctx = document.querySelector("#myChart");
    const chartContainer = document.querySelector('.chart-container');
    const dashboardStats = document.querySelector('.dashboard-stats');

    if (!ctx) {
        console.error("Canvas element not found!");
        return;
    }

    const totalTasks = todoTask + doingTask + doneTask;
    const donePercentage = totalTasks > 0 ? ((doneTask / totalTasks) * 100).toFixed(1) : 0;

    if (myChartInstance) {
        // 기존 차트를 파괴
        myChartInstance.destroy();
    }

    // 새 차트를 생성
    myChartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["할 일", "진행", "완료"],
            datasets: [
                {
                    label: "전체 할 일 목록",
                    data: [todoTask, doingTask, doneTask],
                    backgroundColor: ["#2a9df4", "#88c999", "#166d3b"],
                    hoverOffset: 4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
        plugins: [
            {
                id: "centerText",
                beforeDraw: function (chart) {
                    const { width, height, ctx } = chart;

                    ctx.save();
                    const centerX = width / 2;
                    const centerY = height / 2;

                    // 중앙 텍스트 스타일 설정
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "#000";

                    // 중앙 텍스트 렌더링
                    ctx.clearRect(centerX - 50, centerY - 15, 100, 30); // 이전 텍스트 지우기
                    ctx.fillText(`${donePercentage}%`, centerX, centerY);

                    ctx.restore();
                },
            },
        ],
    });

    // hover 이벤트 추가
    chartContainer.addEventListener("mouseenter", () => {
        dashboardStats.style.display = "flex"; // 통계 카드 표시
        ctx.style.display = "none"; // 차트 숨기기
    });

    chartContainer.addEventListener("mouseleave", () => {
        dashboardStats.style.display = "none"; // 통계 카드 숨기기
        ctx.style.display = "block"; // 차트 다시 표시
    });
}



function overviewDashBoard(allTaskNum, todoTask, doingTask, doneTask) {
    const totalTaskElement = document.querySelector("#total-task-num");
    const todoTaskElement = document.querySelector("#todo-task-num");
    const doingTaskElement = document.querySelector("#doing-task-num");
    const doneTaskElement = document.querySelector("#done-task-num");

    if (totalTaskElement) totalTaskElement.textContent = allTaskNum || 0;
    if (todoTaskElement) todoTaskElement.textContent = todoTask || 0;
    if (doingTaskElement) doingTaskElement.textContent = doingTask || 0;
    if (doneTaskElement) doneTaskElement.textContent = doneTask || 0;
}
