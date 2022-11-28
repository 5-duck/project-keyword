
export const sideToggle = function sideToggle() {
    // 햄버거 버튼
    const arrow = document.querySelector(".arrow");   

    // 사이드바
    const sidebar = document.getElementById("sidebar");

    // Toggle 실행 함수
    if (arrow.id == 'arrow_close') {
        sidebar.classList.add('block');
        arrow.id = 'arrow_show';
    } else {
        sidebar.classList.remove('block');
        arrow.id = 'arrow_close';
    }
}

