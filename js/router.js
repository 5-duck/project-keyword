/* 채하 시작 */
import { authService } from "./firebase.js";
import { getpostList } from "./pageJs/new_main.js";
import { seeMyPost } from "./pageJs/new_mypage.js";
import { seeMyComment } from "./pageJs/comment.js";
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
  new_mypage: "./pageJs/new_mypage.html",
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
    
    // 1127_다경수정작업 🟡🟡🟡🟡🟡🟡🟡🟡
    console.log('cmtImg 불러와져?(글쓰기버튼 눌렀을때 사진)',document.getElementById("cmtImg"))
    console.log('nickname1 불러와져?',document.getElementById("nickname1"))
    document.getElementById("nickname1").textContent =
    authService.currentUser.displayName ?? "닉네임 없음";
    document.getElementById("cmtImg").src =
    authService.currentUser.photoURL ?? "../image/test1.jpg";
    console.log('profileView1 불러와져?',document.getElementById("profileView1"))
    console.log('nickname 불러와져?',document.getElementById("nickname"))
    document.getElementById("nickname").textContent =
    authService.currentUser.displayName ?? "닉네임 없음";
    document.getElementById("profileView1").src =
    authService.currentUser.photoURL ?? "../image/test1.jpg";
    getpostList();
  // 1127_다경수정작업 🟡🟡🟡🟡🟡🟡🟡🟡

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
  // 🟡🟡🟡🟡🟡🟡🟡🟡 이 부분 54번 라인에 채하님이 합치심
  // if (path === "mypage" || path === "main") {
  //   getpostList();
  // }

  if (path === "new_mypage" || path === "mypage"){
     // gg시작
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
   // gg끝 
     seeMyPost();
   }
   /* 채하끝 */
   // gg채하시작
   if (path === "comment"){
     seeMyComment();
   }
   // gg채하끝
};

/* 채하시작 */
export const goToMyPage = () => {
  window.location.hash = "#new_mypage";
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
