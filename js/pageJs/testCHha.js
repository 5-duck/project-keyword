`<div class="profile">BY&nbsp;&nbsp;
<img class="cmtImg" width="50px" height="50px" src="${cmtObj.profileImg}" alt="profileImg" />
<a class="nickname" href="#" title="nickname"><span>${cmtObj.nickname ?? "닉네임 없음"}</span></a>
</div>
<div class="category_wrap">
<p class="category">#hashTag</p>
</div>
<div class="text_box">${cmtObj.text}</div>
<p id="${cmtObj.id}" class="noDisplay">
<div class="cmtAt">${new Date(cmtObj.createdAt).toString().slice(0, 25)}</div>
<div class="${isOwner ? "updateBtns" : "noDisplay"}">
<div class="revise_wrap hide">
  <input type="submit" value="수정" class="edit" onclick="onEditing(event)"/>
  <input type="submit" value="삭제" class="cut" name="${cmtObj.id}" onclick="delete_post(event)"/>
</div> 
</div>`;