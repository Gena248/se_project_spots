const newPost = document.querySelector("#new-post-modal");
const editProfile = document.querySelector("#edit-profile-modal");
const postBtn = document.querySelector("#open-post");
const profileBtn = document.querySelector("#open-profile");
const xBtnPost = newPost.querySelector(".modal__btn-x");
const xBtnProfile = editProfile.querySelector(".modal__btn-x");

postBtn.addEventListener("click", function () {
  newPost.classList.add("modal_is-opened");
});

profileBtn.addEventListener("click", function () {
  editProfile.classList.add("modal_is-opened");
});

xBtnPost.addEventListener("click", function () {
  newPost.classList.remove("modal_is-opened");
});

xBtnProfile.addEventListener("click", function () {
  editProfile.classList.remove("modal_is-opened");
});
