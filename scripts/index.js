const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

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

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

profileBtn.addEventListener("click", function () {
  openModal(editProfile);
  profileNameInput.value = profileName.textContent;
  profileDesInput.value = profileDes.textContent;
});

editProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDes.textContent = profileDesInput.value;
  closeModal(editProfile);
});

xBtnProfile.addEventListener("click", function () {
  closeModal(editProfile);
});

postBtn.addEventListener("click", function () {
  openModal(newPost);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(imageInput.value);
  console.log(captionInput.value);
  closeModal(newPost);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

xBtnPost.addEventListener("click", function () {
  closeModal(newPost);
});

initialCards.forEach(function (element) {
  console.log(element.name);
  console.log(element.link);
});
