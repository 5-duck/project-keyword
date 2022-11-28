import { authService } from "./firebase.js";
import { handleLocation, route } from "./router.js";
import { openModal, closeModal, dropdown, showMenu, modaldropdown, modalshowMenu } from "./modal.js";

//🌼🌼🌼🌼🌼🌼🌼🌼 profile_update 파일경로 수정 🌼🌼🌼🌼🌼🌼🌼
import { pu_openModal, pu_closeModal, feed_openModal, feed_closeModal} from "./pageJs/profile_update.js";

// import { swiper } from "./keyword.js";

//다경 백엔드 연결
import { socialLogin } from "./pageJs/login.js";
import {
  moveJoinPage,
  loginAction,
  joinAction,
  logoutAction,
} from "./pageJs/login.js";
import {
  changeProfile,
  onFileChange,
  DeletePhoto,
} from "./pageJs/profile.js";

//🌼🌼🌼🌼🌼🌼🌼🌼 profile_update 파일경로 수정 --> 아래 window 전역객체 만들기 🌼🌼🌼🌼🌼🌼🌼
import { saveTargetComments, targetCommentsSearch} from "./pageJs/profile_update.js";


// 채하 백엔드 연결
// import { handleAuth, onToggle, logout,  } from "./pageJs/login.js";
import { /* goToProfile, */ goToMyPage} from "./router.js";
import { save_post, update_post, onEditing, delete_post, seeMyPost, /* ddd */ search_post} from "./pageJs/new_main.js";
// gg시작
import{ seeMyComment } from "./pageJs/comment.js";
// gg끝

// 휘인 sidebar toggle 추가
import { sideToggle } from "./sidebar.js" ;



// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);
// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", () => {
  // 로그인 상태 모니터링
  authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    // user === authService.currentUser 와 같은 값

    //다경 백엔드 추가한것!!
    handleLocation();
    console.log('hash가 도대체 뭐니?',hash)
    const hash = window.location.hash;
    if (user) {
      if (hash === ""|| hash === "login") {
        window.location.replace("#main");
      }
      window.location.replace("#main");
    }
    // user가 아니라면 router.js에서 설정한 고대로 가니까 user가 아닌 사람은 login페이지밖에 못만난다.
    else {
      if (hash !== "") {
        window.location.replace("");
      }
    }
  });
});

// 전역 함수 리스트
window.route = route;
window.openModal = openModal;
window.closeModal = closeModal;
window.dropdown = dropdown;
window.modaldropdown = modaldropdown;
window.showMenu = showMenu;
window.pu_openModal = pu_openModal;
window.pu_closeModal = pu_closeModal;
window.modalshowMenu = modalshowMenu;
window.feed_openModal = feed_openModal;
window.feed_closeModal = feed_closeModal;
// window.swiper = swiper;

//다경 백엔드 연결
window.socialLogin=socialLogin;
window.loginAction=loginAction;
window.moveJoinPage=moveJoinPage;
window.joinAction=joinAction;
window.logoutAction=logoutAction;
window.changeProfile=changeProfile;
window.onFileChange=onFileChange;
window.DeletePhoto=DeletePhoto;

//🌼🌼🌼🌼🌼🌼🌼🌼 window 객체만들기 🌼🌼🌼🌼🌼🌼🌼
window.saveTargetComments=saveTargetComments;
window.targetCommentsSearch=targetCommentsSearch;


// 채하 백엔드 연결
// window.goToProfile = goToProfile;
window.socialLogin = socialLogin;
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
window.save_post = save_post;
window.update_post = update_post;
window.onEditing = onEditing;
window.delete_post = delete_post;
window.seeMyPost = seeMyPost;
window.goToMyPage = goToMyPage;
window.search_post = search_post;
window.seeMyComment=seeMyComment;

// 휘인 함수 연결
window.sideToggle = sideToggle;
