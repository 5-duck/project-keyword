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
  startAt,
  endAt
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";


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
        `<section id="mypost_container">
          <div id="post_wrap">
              <div class="profile">
                <img class="cmtImg" src="${cmtObj.profileImg}" alt="profileImg" />
              </div>
              <a class="nickname" href="#" title="nickname" target="_blank"><span>${cmtObj.nickname ?? "닉네임 없음"}</span></a>
              <div class="category_wrap">
                  <p class="category">${cmtObj.keyword}</p>
              </div>
              <div class="text_box">${cmtObj.text}</div>
              <div class="cmtAt my">${new Date(cmtObj.createdAt).toString().slice(0, 25)}</div>
              <p id="${cmtObj.id}" class="noDisplay"></p>
              <div class="${isOwner ? "updateBtns" : "noDisplay"}">
                <div class="revise_wrap">
                    <!-- <input type="button" value="수정" class="edit" onclick="onEditing(event)"/> -->
                    <input type="button" value="삭제" class="cut" name="${cmtObj.id}" onclick="delete_post(event)"/>
                </div>
              </div>
          </div>
        </section>`;
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commnetList.appendChild(div);
    console.log('seeMyPost메소드가 실행되었습니다!')
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
  const commnetList = document.getElementById("filtering-list");
  const currentUid = authService.currentUser.uid;
  commnetList.innerHTML = "";

  const arr = cmtObjList.filter(a => a.text.includes(searchWord)); /* filter메소드로 firebase의 text를 배열로 변환 */

  arr.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId; /* 사용자정보의 creatorId를 대입 */
    const temp_html = 
      `<form method="get" action="" class="my_post flex">
      <div id="post_wrap" onclick="feed_openModal(${cmtObj.createdAt})">
        <div class="post_top_wrap">
          <div class="profile">
            <img class="cmtImg" src="${cmtObj.profileImg}" alt="profileImg" /></div>
          <a class="nickname" href="#" title="nickname" target="_blank"><span>${cmtObj.nickname ?? "닉네임 없음"}</span></a>
          <div class="category_wrap">
            <p class="category">#hashTag</p>
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
    </form>`;
    
    const div = document.createElement("div");
    div.classList.add("mycardss");
    div.innerHTML = temp_html;
    commnetList.appendChild(div);
  });
};