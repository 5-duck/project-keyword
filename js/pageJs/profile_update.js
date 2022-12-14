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

//๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ ๋ง์ง๋ง ์ฐ๊ฒฐํ์ฅ (์์) ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ
import { dbService , authService } from "../firebase.js";
//๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ ๋ง์ง๋ง ์ฐ๊ฒฐํ์ฅ (๋) ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ

export const pu_openModal = () => {
  const modal = document.querySelector(".pu_modal");
  modal.classList.remove("pu_hidden");
};

export const pu_closeModal = () => {
  const modal = document.querySelector(".pu_modal");
  modal.classList.add("pu_hidden");
};

export const feed_openModal = async (createAtNum) => {

  const modal = document.querySelector("#modal_post_container");
  modal.classList.remove("hidden");

//๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ ๋ง์ง๋ง ์ฐ๊ฒฐํ์ฅ (์์) ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ
  const commentsdRef = collection(dbService, "posts");
  const q = query(commentsdRef, where("createdAt", "==", createAtNum));
  const querySnapshot = await getDocs(q);
  let BoardcmtObjList = [];

  querySnapshot.forEach((doc) => {
    const commentObj = {
      id: doc.id,
      ...doc.data(),
    };
    BoardcmtObjList.push(commentObj);
  });

  console.log('BoardcmtObjList์ ๋ฐ์ดํฐ ๋ค์ด์๋?',BoardcmtObjList)
  // //๋๊ธ ์ ์ฅํ๋ ค๊ณ  post_wrap ์์ ๋ถ์ผ๊ฑฐ์
  const modal_post_container = document.getElementById("modal_post_container");
  modal_post_container.innerHTML = "";
  BoardcmtObjList.forEach((cmtObj) => {
    const temp_html = `    <div id="post_wrap">
    <div class="post_wrap_head">
       <a class="post_exit" onclick="feed_closeModal()">
           <i class="fa-regular fa-circle-xmark"></i>
         </a>
    </div>
    <div class="post_wrap_body">
     <div class="profile">
     </div>
     <a class="nickname" title="nickname" target="_blank">${cmtObj.nickname}</a>
     <div class="category_wrap">
                <p class="category">${cmtObj.keyword}</p>
              </div>
     <div class="modal_text_box">
       <div id="targetCommentsText">${cmtObj.text}</div>
     </div>
     
     <!-- ๋๊ธ์ฐฝ -->
     <!-- ์ฌ๊ธฐ์๋๊ฑฐ ๋ณต๋ถ -->
     <div id="yj_commment_container_hi">
       <div class="yj_comment">#comment</div>
       <form method="post" id="post_form">
           <div class="comment_box">
             <input type="text" class="comment" id="targetCommentsText1">
             <a class="comment_btn" onclick="saveTargetComments(${cmtObj.createdAt})">๋ฑ๋ก</a>
           </div>
         </form>
        <button type="button" class="comment_btn" onclick="targetCommentsSearch(${cmtObj.createdAt})">ํด๋น ๊ฒ์๋ฌผ ๋๊ธ๋ณด๊ธฐ</button>
       <div class="yj_comment_container" id="target_comments">
       </div>
       </div>
     </div>
   </div>`;
   
    const div = document.createElement("div");
    div.classList.add("post_wrap");
    div.innerHTML = temp_html;
    modal_post_container.appendChild(div);
    
  
  });
};
//๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ ๋ง์ง๋ง ์ฐ๊ฒฐํ์ฅ (๋) ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ



export const feed_closeModal = () => {
  const modal = document.querySelector("#modal_post_container");
  modal.classList.add("hidden");
};

//๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ ๋ง์ง๋ง ์ฐ๊ฒฐํ์ฅ (์์) ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ
export const saveTargetComments = async (target_board_num) => {
  const targetCommentsText = document.getElementById("targetCommentsText1");
  console.log('targetCommentsText : ', document.getElementById("targetCommentsText1").value)
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "targetComments"), {
      text: targetCommentsText.value,
      targetboardnum: target_board_num,
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    targetCommentsText.value = "";
    alert("ํด๋น ๊ฒ์๋ฌผ์ ๋๊ธ์ ์ฅ ์ฑ๊ณต!");
    
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

export const targetCommentsSearch = async (createAtId) => {
  const commentsdRef = collection(dbService, "targetComments");
  const q = query(commentsdRef, where("targetboardnum", "==", createAtId));
  const querySnapshot = await getDocs(q);
  let targetCmtObjList = [];
  querySnapshot.forEach((doc) => {
    const commentObj = {
      id: doc.id,
      ...doc.data(),
    };
    targetCmtObjList.push(commentObj);
  });
  const target_comments = document.getElementById("target_comments");
  target_comments.innerHTML = "";

  const { displayName } = authService.currentUser;
  targetCmtObjList.forEach((cmtObj) => {
    const temp_html = `
    <div class="flex comment_contents_wrap">
  <div class="comment_contetns_title">๋๊ธ๋ด์ฉ :</div>
  <div id="textContent" class="comment_contetns">${cmtObj.text}</div>
</div>

<div class="flex writer">
    <div class="comment_writer">๋๊ธ์์ฑ์ :</div>
    <div class="comment_user">${displayName}</div>
</div>
  `;
    const div = document.createElement("div");
    div.classList.add("parentId1");
    div.innerHTML = temp_html;
    target_comments.appendChild(div);

  });
};
//๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ ๋ง์ง๋ง ์ฐ๊ฒฐํ์ฅ (๋)๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ๐ผ


{/* <div class="flex comment_contents">
  <div>๋๊ธ๋ด์ฉ :</div>
  <div id="textContent">${cmtObj.text}</div>
</div>

<div class="flex writer">
    <div>๋๊ธ์์ฑ์ :</div>
    <div>${displayName}</div>
</div> */}