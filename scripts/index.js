const newPost = document.querySelector("#new-post-modal");
const editProfile = document.querySelector("#edit-profile-modal");
const postBtn = document.querySelector("#open-post");
const profileBtn = document.querySelector("#open-profile");
const xBtnPost = newPost.querySelector(".modal__btn-x");
const xBtnProfile = editProfile.querySelector(".modal__btn-x");
const profileSubBtn = document.querySelector(".modal__btn-sub");
const profileName = document.querySelector(".profile__name");
const profileDes = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDesInput = document.querySelector("#profile-description-input");
const newPostImgInput = document.querySelector("#new-image-input");
const newPostCapInput = document.querySelector(".card__content");
const addCardFormElement = newPost.querySelector(".modal__form");
const imageInput = document.querySelector("#new-image-input");
const captionInput = document.querySelector("#new-caption-input");

profileBtn.addEventListener("click", function () {
  editProfile.classList.add("modal_is-opened");
});

profileNameInput.value = profileName.textContent;
profileDesInput.value = profileDes.textContent;

editProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDes.textContent = profileDesInput.value;
  editProfile.classList.remove("modal_is-opened");
});

xBtnProfile.addEventListener("click", function () {
  editProfile.classList.remove("modal_is-opened");
});

postBtn.addEventListener("click", function () {
  newPost.classList.add("modal_is-opened");
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(imageInput.value);
  console.log(captionInput.value);
  newPost.classList.remove("modal_is-opened");
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

xBtnPost.addEventListener("click", function () {
  newPost.classList.remove("modal_is-opened");
});
