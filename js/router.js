/* 채하 시작 */
import { authService } from "./firebase.js";
import { getpostList } from "./pageJs/new_main.js";
import { getpostList2 } from "./pageJs/page2.js";
/* 채하 끝 */


const routes = {
  "/": "/page/keyword.html",
  header: "/page/header.html",
  sidebar: "/page/sidebar.html",
  login: "/page/login.html",
  join: "/page/join.html",
  main: "/page/new_main.html",
  mypage: "/page/new_mypage.html",
  comment: "/page/comment.html",
  footer: "/page/footer.html",
  404: "/page/404.html",
  /* 채하 시작 */
  page2: "./pageJs/page2.html",
/* 채하 끝 */
};

export const route = (event) => {
  event.preventDefault();
  console.log("event.target.hash:", event.target.hash);
  window.location.hash = event.target.hash;
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", ""); // #login 을 login 으로 저장  path = login 상태
  //다경님 추가한부분!
  const pathName = window.location.pathname;
  if (pathName === "/index.html") {
    window.history.pushState({}, "", "/");
  }
  
  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length == 0) {
    path = "/";
  }

  const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]

  if (path === "login" || path === "join" || path === "/") {
    const pagehtml = await fetch(route).then((data) => data.text());
    document.getElementById("index_page").innerHTML = pagehtml;
    document.getElementById("index_header").innerHTML = " ";
    document.getElementById("index_sidebar").innerHTML = " ";
    document.getElementById("index_footer").innerHTML = " ";

  }
  // main page 접속할 때
  if (path === "main"){
    const yheader = routes["header"] || routes[404];
    const ysidebar = routes["sidebar"] || routes[404];
    const yfooter = routes["footer"] || routes[404];


    const headerhtml = await fetch(yheader).then((data) => data.text());
    const sidebarhtml = await fetch(ysidebar).then((data) => data.text());
    const footerhtml = await fetch(yfooter).then((data) => data.text());

    const pagehtml = await fetch(route).then((data) => data.text());

    document.getElementById("index_header").innerHTML = headerhtml;
    document.getElementById("index_sidebar").innerHTML = sidebarhtml;
    document.getElementById("index_page").innerHTML = pagehtml;
    document.getElementById("index_footer").innerHTML = footerhtml;

  }

  if (path === "mypage" || path === "comment"){
    const yfooter = routes["footer"] || routes[404];
    const yheader = routes["header"] || routes[404];


    const headerhtml = await fetch(yheader).then((data) => data.text());
    const pagehtml = await fetch(route).then((data) => data.text());
    const footerhtml = await fetch(yfooter).then((data) => data.text());


    document.getElementById("index_header").innerHTML = headerhtml;
    document.getElementById("index_sidebar").innerHTML = " ";
    document.getElementById("index_page").innerHTML = pagehtml;
    document.getElementById("index_footer").innerHTML = footerhtml;

  }


  if (path === "/") {
    const swiper = new Swiper(".mySwiper", {
      direction: "vertical",
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }


  if (path === "mypage" || path === "main" || path == "comment") {
    const swiper = new Swiper(".mySwiper", {
      direction: "vertical",
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    });
  };
  /* 채하시작 */
  if (path === "new_main") {
    //if문으로 꼭 현재 어떤페이지인지 표시해주어야함
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    console.log("authService.currentUser:", authService.currentUser);
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "닉네임"; //null병합연산자 ??

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "../assets/blankProfile.webp";

    getpostList();
  }

  if (path === "page2"){
    getpostList2();
  }
  /* 채하끝 */
};

/* 채하시작 */
export const goToFilter = () => {
  window.location.hash = "#page2";
};
/* 채하끝 */


// if ( || path === "comment" || path === "main"){
//   const swiper = new Swiper(".mySwiperhead", {
//     direction: "vertical",
//     spaceBetween: 30,
//     centeredSlides: true,
//     loop: true,
//     autoplay: {
//       delay: 2500,
//       disableOnInteraction: false,
//     },
//   });
// };
// path 경로에 따라 <head> <title> 해당 페이지에 맞게 변경되게끔 하기 </title></head>
