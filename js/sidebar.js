
export const sideToggle = function sideToggle() {
    const arrow = document.querySelector(".arrow");   
    const sidebar = document.getElementById("sidebar");
    console.log(sidebar.getBoundingClientRect());

    function append() { 
        const sidebar = document.getElementById("sidebar");
        if ( sidebar.getBoundingClientRect().x <= -1525 ) {
            sidebar.classList.add('block')
            alert('보임')
        }  
        else // (sidebar.getBoundingClientRect().x= 0 )
        {
            sidebar.classList.remove('block')
            sidebar.classList.add('none');
            alert('가림')
        }
    }
    function show() {
        arrow.addEventListener('click', append)
        }

    return show();
}

// #sidebar.hide {
//     left: -100%;
// }
// #sidebar.show {
//     left: 0%;
// }
