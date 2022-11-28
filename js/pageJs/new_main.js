import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
  where,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

// 글 등록
export const save_post = async (event) => {
  const post = document.getElementById("post");
  // 🌸🌸🌸🌸🌸🌸🌸키워드 데려오기(시작)🌸🌸🌸🌸🌸🌸🌸🌸 
  const jjintest=document.getElementsByClassName("modal_dropbtn_content");
  const jjinmack=jjintest[0].innerHTML;
  console.log('jjintest:',jjintest[0].innerHTML)
  // 🌸🌸🌸🌸🌸🌸🌸키워드 데려오기(끝)🌸🌸🌸🌸🌸🌸🌸🌸 
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    /* try=default catch 예외발생시 에러처리 */
    const word = post.value.replace(/\s| /gi, ""); /* 공백 또는 모든 탭을 ""으로 대체 */
    if (word.length) { /* 공백과 모든 탭을 제외한 value값이 참이면(0이 아니면) */
      await addDoc(collection(dbService, "posts"), {
        text: post.value.replace(/(\n|\r\n)/g, "<br>").replace(/ /g, "&nbsp"),
        createdAt: Date.now(),
        creatorId: uid,
        profileImg: photoURL,
        nickname: displayName,
        // 🌸🌸🌸🌸🌸🌸🌸키워드 데려오기(시작)🌸🌸🌸🌸🌸🌸🌸🌸 
        keyword:jjinmack,
        // 🌸🌸🌸🌸🌸🌸🌸키워드 데려오기(끝)🌸🌸🌸🌸🌸🌸🌸🌸 
        // 🌸🌸🌸🌸🌸🌸🌸아래 135번라인도 수정 필요🌸🌸🌸🌸🌸🌸🌸🌸 
      });
      post.value = "";
      alert('게시물 저장이 완료되었습니다!>_<')
      window.location.reload()
      getpostList();
    } else {
      alert("내용을 입력하세요");
    }
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

// 수정버튼 클릭
export const onEditing = (event) => {
  event.preventDefault();
  const udBtns = document.querySelectorAll(".editBtn, .deleteBtn");
  udBtns.forEach((udBtn) => (udBtn.disabled = "true"));

  const cardBody =
    event.target.parentNode.parentNode; /* event.target은 속성값을 가져온다 */ /* 138. div_mycards */
  const postText = cardBody.children[0].children[0]; /* p_postText */
  const postInputP = cardBody.children[0].children[1]; /* p_noDisplay */

  postText.classList.add("noDisplay"); /* element.classList.add('클래스명') : 요소에 클래스 추가 */
  postInputP.classList.add("d-flex");
  postInputP.classList.remove("noDisplay"); /* noDisplay = display:none; */
  postInputP.children[0].focus();
};

// 글수정
export const update_post = async (event) => {
  event.preventDefault();
  const newpost = event.target.parentNode.children[0].value;
  const id = event.target.parentNode.id;

  const parentNode = event.target.parentNode.parentNode;
  const postText = parentNode.children[0];
  postText.classList.remove("noDisplay");
  const postInputP = parentNode.children[1];
  postInputP.classList.remove("d-flex");
  postInputP.classList.add("noDisplay");

  const postRef = doc(dbService, "posts", id);
  try {
    const word = newpost.replace(/\s| /gi, ""); /* 공백 또는 모든 탭을 ""으로 대체 */
    if (word.length) {  /* 공백과 모든 탭을 제외한 value값이 참이면(0이 아니면) */
      await updateDoc(postRef, { text: newpost.replace(/(\n|\r\n)/g, "<br>").replace(/ /g, "&nbsp") }); /* enter와 space까지 표현되게 */
      getpostList();
    } else {
      alert("내용을 입력하세요");
    }
  } catch (error) {
    alert(error);
  }
};

// 글삭제
export const delete_post = async (event) => {
  event.preventDefault();
  const id = event.target.name;
  const ok = window.confirm("해당 게시글을 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "posts", id));
      alert("삭제가 완료되었습니다!");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }
};

// 글목록
export const getpostList = async () => {
  let cmtObjList = [];
  const q = query(collection(dbService, "posts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const postObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(postObj);
  });
  const commnetList = document.getElementById("post-list");
  const currentUid = authService.currentUser.uid;
  commnetList.innerHTML = "";
  cmtObjList.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html =         
        `<div id="post_wrap" onclick="feed_openModal(${cmtObj.createdAt})">
            <div class="post_top_wrap">
              <div class="profile">
                <img class="cmtImg" width="50px" height="50px" src="${cmtObj.profileImg}" alt="profileImg" />
              </div>
              <a class="nickname" href="#" title="nickname" target="_blank"><span>${cmtObj.nickname ?? "닉네임 없음"}</span></a>
              <div class="category_wrap">
                <p class="category">${cmtObj.keyword}</p>
              </div>
            </div>
            <div class="text_box">${cmtObj.text}</div>
            <p id="${cmtObj.id}" class="noDisplay">
            <div class="cmtAt">${new Date(cmtObj.createdAt).toString().slice(0, 25)}</div>
            <div class="${isOwner ? "updateBtns" : "noDisplay"}">
              <div class="revise_wrap hide">
                  <input type="submit" value="수정" class="edit" onclick="onEditing(event)"/>
                  <input type="submit" value="삭제" class="cut" name="${cmtObj.id}" onclick="delete_post(event)"/>
              </div>
            </div>
          </div>
        `;


    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commnetList.appendChild(div);
  });
};

// 내가 쓴글 보기
export  const seeMyPost = async() => {
  let cmtObjList = [];
  const q = query(collection(dbService, "posts"), where("creatorId", "==", authService.currentUser.uid), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const postObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(postObj);
  });

  const commnetList = document.getElementById("post-list");
  const currentUid = authService.currentUser.uid;
  commnetList.innerHTML = "";
  cmtObjList.forEach(cmtObj => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = 
    `<div id="post_wrap" onclick="feed_openModal(${cmtObj.createdAt})">
            <div class="post_top_wrap">
              <div class="profile">
                <img class="cmtImg" width="50px" height="50px" src="${cmtObj.profileImg}" alt="profileImg" />
              </div>
              <a class="nickname" href="#" title="nickname" target="_blank"><span>${cmtObj.nickname ?? "닉네임 없음"}</span></a>
              <div class="category_wrap">
                <p class="category">${cmtObj.keyword}</p>
              </div>
            </div>
            <div class="text_box">${cmtObj.text}</div>
            <p id="${cmtObj.id}" class="noDisplay">
            <div class="cmtAt">${new Date(cmtObj.createdAt).toString().slice(0, 25)}</div>
            <div class="${isOwner ? "updateBtns" : "noDisplay"}">
              <div class="revise_wrap hide">
                  <input type="submit" value="수정" class="edit" onclick="onEditing(event)"/>
                  <input type="submit" value="삭제" class="cut" name="${cmtObj.id}" onclick="delete_post(event)"/>
              </div>
            </div>
          </div>
        `
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commnetList.appendChild(div);
  });
};

// 검색한 글목록
export const search_post = async () => {
  let cmtObjList = [];
  const q = query(collection(dbService, "posts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const postObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(postObj);
  });
  const searchWord = document.getElementById('search_contents').value;
  const commnetList = document.getElementById("post-list");
  const currentUid = authService.currentUser.uid;
  commnetList.innerHTML = "";

  const arr = cmtObjList.filter(a => a.text.includes(searchWord)); /* filter메소드로 firebase의 text를 배열로 변환 */

  arr.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId; /* 사용자정보의 creatorId를 대입 */
    const temp_html =         
        `<div id="post_wrap" onclick="feed_openModal(${cmtObj.createdAt})">
            <div class="post_top_wrap">
              <div class="profile">
                <img class="cmtImg" width="50px" height="50px" src="${cmtObj.profileImg}" alt="profileImg" />
              </div>
              <a class="nickname" href="#" title="nickname" target="_blank"><span>${cmtObj.nickname ?? "닉네임 없음"}</span></a>
              <div class="category_wrap">
                <p class="category">${cmtObj.drop_keyword}</p>
              </div>
            </div>
            <div class="text_box">${cmtObj.text}</div>
            <p id="${cmtObj.id}" class="noDisplay">
            <div class="cmtAt">${new Date(cmtObj.createdAt).toString().slice(0, 25)}</div>
            <div class="${isOwner ? "updateBtns" : "noDisplay"}">
              <div class="revise_wrap hide">
                  <input type="submit" value="수정" class="edit" onclick="onEditing(event)"/>
                  <input type="submit" value="삭제" class="cut" name="${cmtObj.id}" onclick="delete_post(event)"/>
              </div>
            </div>
          </div>
        `;
    
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commnetList.appendChild(div);
  });
};