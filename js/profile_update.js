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

//⭐️⭐️⭐️게시물클릭시 해당게시물과 댓글불러오기 주석처리⭐️⭐️⭐️
// import { dbService, authService } from "../firebase.js";

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

  //⭐️⭐️⭐️게시물클릭시 해당게시물과 댓글불러오기 주석처리⭐️⭐️⭐️
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

  console.log('BoardcmtObjList에 데이터 들어왔니?',BoardcmtObjList)
  // //댓글 저장하려고 post_wrap 안에 붙일거임
  const modal_post_container = document.getElementById("modal_post_container");
  modal_post_container.innerHTML = "";
  // BoardcmtObjList.forEach((cmtObj) => {
  //   const temp_html = `    <div id="post_wrap">
  //   <div class="post_wrap_head">
  //      <a class="post_exit" onclick="feed_closeModal()">
  //          <i class="fa-regular fa-circle-xmark"></i>
  //        </a>
  //   </div>
  //   <div class="post_wrap_body">
  //    <div class="profile">
  //    </div>
  //    <a class="nickname" title="nickname" target="_blank">${cmtObj.nickname}</a>
  //    <div class="category_wrap">
  //      <p class="category">#hashTag</p>
  //    </div>
  //    <div class="modal_text_box">
  //      <div id="targetCommentsText">${cmtObj.text}</div>
  //    </div>
     
  //    <!-- 댓글창 -->
  //    <!-- 여기있는거 복붙 -->
    //  <div id="yj_commment_container_hi">
    //    <div class="yj_comment">#comment</div>
    //    <form method="post" id="post_form">
    //        <div class="comment_box">
    //          <input type="text" class="comment" id="targetCommentsText"/>
    //          <button type="button" class="comment_btn" onclick="saveTargetComments(${cmtObj.createdAt})">등록</button>
    //        </div>
    //      </form>
    //     <button type="button" onclick="targetCommentsSearch(${cmtObj.createdAt})">해당 게시물 댓글보기</button>
    //    <div class="yj_comment_container" id="target_comments">
    //    </div>
    //    </div>
  //    </div>
  //  </div>`;
    const temp_html=`<div>여기까진 작동되니?</div>`
    const div = document.createElement("div");
    div.classList.add("post_wrap");
    div.innerHTML = temp_html;
    modal_post_container.appendChild(div);
  // });
  //⭐️⭐️⭐️게시물클릭시 해당게시물과 댓글불러오기 주석처리⭐️⭐️⭐️
};

export const feed_closeModal = () => {
  const modal = document.querySelector("#modal_post_container");
  modal.classList.add("hidden");
};

//⭐️⭐️⭐️게시물클릭시 해당게시물과 댓글불러오기 주석처리⭐️⭐️⭐️
// export const saveTargetComments = async (target_board_num) => {
//   const targetCommentsText = document.getElementById("targetCommentsText");
//   const { uid, photoURL, displayName } = authService.currentUser;
//   try {
//     await addDoc(collection(dbService, "targetComments"), {
//       text: targetCommentsText.value,
//       targetboardnum: target_board_num,
//       creatorId: uid,
//       profileImg: photoURL,
//       nickname: displayName,
//     });
//     targetCommentsText.value = "";
//     alert("해당 게시물에 댓글저장 성공!");
//     pageMoveAndSearchAndCommentsSearch();
//   } catch (error) {
//     alert(error);
//     console.log("error in addDoc:", error);
//   }
// };

// export const targetCommentsSearch = async (createAtId) => {

//   const commentsdRef = collection(dbService, "targetComments");
//   const q = query(commentsdRef, where("targetboardnum", "==", createAtId));
//   const querySnapshot = await getDocs(q);
//   let targetCmtObjList = [];
//   querySnapshot.forEach((doc) => {
//     const commentObj = {
//       id: doc.id,
//       ...doc.data(),
//     };
//     targetCmtObjList.push(commentObj);
//   });
//   const target_comments = document.getElementById("target_comments");
//   target_comments.innerHTML = "";

//   const { uid } = authService.currentUser;
//   targetCmtObjList.forEach((cmtObj) => {
//     const temp_html = `
//     <div>댓글내용 : <div id="textContent">${cmtObj.text}</div></div>
//     <div>댓글작성자 : <div>${uid}</div></div>
//     <div>댓글타겟게시물번호 : <div>${cmtObj.targetboardnum}</div> </div>
//   `;
//     const div = document.createElement("div");
//     div.classList.add("parentId");
//     div.innerHTML = temp_html;
//     target_comments.appendChild(div);
//     alert('해당 게시물에 대한 댓글을 불러왔습니다!');

//   });
// };
//⭐️⭐️⭐️게시물클릭시 해당게시물과 댓글불러오기 주석처리⭐️⭐️⭐️


