export const pu_openModal = () => {
  const modal = document.querySelector(".pu_modal");
  modal.classList.remove("pu_hidden");
};

export const pu_closeModal = () => {
  const modal = document.querySelector(".pu_modal");
  modal.classList.add("pu_hidden");
};

export const feed_openModal = () => {
  const modal = document.querySelector("#modal_post_container");
  modal.classList.remove("hidden");
};

export const feed_closeModal = () => {
  const modal = document.querySelector("#modal_post_container");
  modal.classList.add("hidden");
};