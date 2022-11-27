import { emailRegex, pwRegex } from "../util.js";
import { authService } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

//회원가입페이지 이동하는 것
export const moveJoinPage = () => {
  window.location.replace("#join");
};

export const loginAction = (event) => {
  event.preventDefault();
  const email = document.getElementById("email");
  const emailVal = email.value;
  const pw = document.getElementById("pw");
  const pwVal = pw.value;

  // 유효성 검사 진행
  if (!emailVal) {
    alert("이메일을 입력해 주세요");
    email.focus();
    return;
  }
  if (!pwVal) {
    alert("비밀번호를 입력해 주세요");
    pw.focus();
    return;
  }
  signInWithEmailAndPassword(authService, emailVal, pwVal)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.hash = "#main";
      alert('로그인 성공>_<!')
      console.log('로그인 성공!')
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("errorMessage:", errorMessage);
      if (errorMessage.includes("user-not-found")) {
        alert("가입되지 않은 회원입니다.");
        return;
      } else if (errorMessage.includes("wrong-password")) {
        alert("비밀번호가 잘못 되었습니다.");
      }
    });
};

export const joinAction = (event) => {
  event.preventDefault();
  const email = document.getElementById("email");
  const emailVal = email.value;
  const pw = document.getElementById("pw");
  const pwVal = pw.value;

  // 유효성 검사 진행
  if (!emailVal) {
    alert("이메일을 입력해 주세요");
    email.focus();
    return;
  }
  if (!pwVal) {
    alert("비밀번호를 입력해 주세요");
    pw.focus();
    return;
  }

  // 정규식 표현검사
  const matchedEmail = emailVal.match(emailRegex);
  const matchedPw = pwVal.match(pwRegex);

  if (matchedEmail === null) {
    alert("이메일 형식에 맞게 입력해 주세요");
    email.focus();
    return; // 뒤로넘어가지 않게 꼭 리턴으로 끊어줘야 한다.
  }
  if (matchedPw === null) {
    alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
    pw.focus();
    return; // 뒤로넘어가지 않게 꼭 리턴으로 끊어줘야 한다.
  }

  createUserWithEmailAndPassword(authService, emailVal, pwVal)
    .then((userCredential) => {
      // Signed in
      alert("회원가입이 완료되었습니당 >_<");
      signOut(authService).then(() => {
        console.log("로그아웃 시키기 성공");
      });
      window.location.hash = "#login";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("errorMessage:", errorMessage);
      if (errorMessage.includes("email-already-in-use")) {
        alert("이미 가입된 이메일입니다.");
      }
    });
};


export const logoutAction = () => {
  signOut(authService)
    .then(() => {
      // Sign-out successful.
      localStorage.clear();
      console.log("로그아웃 성공");
      alert('로그아웃 성공!')
    })
    .catch((error) => {
      // An error happened.
      console.log("error:", error);
    });
};


export const socialLogin = (event) => {
  const { name } = event.target;
  console.log("event.target : ", event.target);
  let provider;
  if (name === "google") {
    provider = new GoogleAuthProvider();
  } else if (name === "github") {
    provider = new GithubAuthProvider();
  }
  signInWithPopup(authService, provider)
    .then((result) => {
      const user = result.user;
    })
    .catch((error) => {
      console.log("error:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
