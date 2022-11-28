import { authService, storageService } from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";


export const onFileChange = (event) => {
  const theFile = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(theFile); 
  reader.onloadend = (finishedEvent) => {
     const imgDataUrl = finishedEvent.currentTarget.result;
     localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profileView1").src = imgDataUrl;
  };
};

export const changeProfile = async (event) => {
  event.preventDefault();
  document.getElementById("profileBtn").disabled = true;

  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const newNickname = document.getElementById("profileNickname").value;
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl;

  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
  }

  await updateProfile(authService.currentUser, {
    displayName: newNickname ? newNickname : null,
    photoURL: downloadUrl ? downloadUrl : null,
  })
    .then(() => {
      window.location.reload();
      console.log('프로필 수정 완료!_근데 이거여러번뜨냥 _')
    })
    .catch((error) => {
      // alert("프로필 수정 실패");
      console.log("error:", error);
    });
};



export const DeletePhoto = () => {
  document.getElementById("profileView1").src = "/image/Keyword.png";
  
  };

