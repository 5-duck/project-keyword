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


// 내가 쓴 댓글 보기
export  const seeMyComment = async() => {
    let cmtObjList = [];
    const q = query(collection(dbService, "targetComments"), where("creatorId", "==", authService.currentUser.uid), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const postObj = {
        id: doc.id,
        ...doc.data(),
      };
      cmtObjList.push(postObj);
    });
  
    const commnetList = document.getElementById("comment-list");
    const currentUid = authService.currentUser.uid;
    commnetList.innerHTML = "";
    cmtObjList.forEach(cmtObj => {
      const isOwner = currentUid === cmtObj.creatorId;
      const temp_html = 
        `<div class="comment_container flex">
            <div class="flex">
                <div>
                    <p class="post_name" id="${cmtObj.id}">댓글을 남긴 게시물</p>
                </div>
                <div>
                    <p class="comment">${cmtObj.text}</p>
                </div>
                <div class="${isOwner ? "updateBtns" : "noDisplay"}">
                    <div class="comment_btn_wrap">
                        <input type="button" value="수정" class="edit" onclick="onEditing(event)>
                        <input type="button" value="삭제" class="cut" name="${cmtObj.id}" onclick="delete_comment(event)">
                    </div>
                </div>
            </div>
        </div>`;

      const div = document.createElement("div");
      div.classList.add("mycards_comment");
      div.innerHTML = temp_html;
      commnetList.appendChild(div);
    });
};