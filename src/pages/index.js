import "./index.css";
import { enableValidation, settings } from "../scripts/validation.js";
import { Api } from "../utils/Api.js";

import Logo from "../images/logo.svg";
const imageLogo = document.getElementById("logo");
imageLogo.src = Logo;

import Avatar from "../images/avatar.jpg";
const imageAvatar = document.getElementById("avatar");
imageAvatar.src = Avatar;

import EditIcon from "../images/edit_icon.svg";
const imageEditIcon = document.getElementById("edit_icon");
imageEditIcon.src = EditIcon;

import PlusBtn from "../images/plus_btn.svg";
const imagePlusBtn = document.getElementById("plus_btn");
imagePlusBtn.src = PlusBtn;

import ProfileCloseBtn from "../images/close_btn.svg";
const imageProfileCloseBtn = document.getElementById("profile_close_btn");
imageProfileCloseBtn.src = ProfileCloseBtn;

import PostCloseBtn from "../images/close_btn.svg";
const imagePostCloseBtn = document.getElementById("post_close_btn");
imagePostCloseBtn.src = PostCloseBtn;

import AvatarCloseBtn from "../images/close_btn.svg";
const imageAvatarCloseBtn = document.getElementById("modal__avatar-btn-x");
imageAvatarCloseBtn.src = AvatarCloseBtn;

import ModalCloseBtn from "../images/close_btn.svg";
const ImageModalCloseBtn = document.getElementById("modal_close_btn");
ImageModalCloseBtn.src = ModalCloseBtn;

import ProfileEditIcon from "../images/edit_icon.svg";
const ImageProfileEditIcon = document.getElementById("profile_edit_icon");
ImageProfileEditIcon.src = ProfileEditIcon;

import DeleteImageCloseBtn from "../images/close_btn.svg";
const ImageDeleteImageCloseBtn = document.getElementById("image-delete-btn-x");
ImageDeleteImageCloseBtn.src = DeleteImageCloseBtn;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9affbeef-abe1-452f-8de5-97d38733f4b5",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userData]) => {
    currentUser = userData;
    cards.forEach((cardData) => {
      const cardElement = getCardElement(cardData, currentUser);
      cardsList.prepend(cardElement);
    });
    profileName.textContent = userData.name;
    profileDes.textContent = userData.about;
    imageAvatar.src = userData.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

const newPost = document.querySelector("#new-post-modal");
const editProfile = document.querySelector("#edit-profile-modal");
const postBtn = document.querySelector("#open-post");
const profileBtn = document.querySelector("#open-profile");
const xBtnPost = newPost.querySelector(".modal__edit-post-btn-x");
const xBtnProfile = editProfile.querySelector(".modal__edit-post-btn-x");
const modalSubBtn = document.querySelector(".modal__btn-sub");
const profileName = document.querySelector(".profile__name");
const profileDes = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDesInput = document.querySelector("#profile-description-input");
const newPostImgInput = document.querySelector("#new-image-input");
const newPostCapInput = document.querySelector(".card__content");
const addCardFormElement = newPost.querySelector(".modal__form");
const imageInput = document.querySelector("#new-image-input");
const captionInput = document.querySelector("#new-caption-input");
const cardTemplate = document.querySelector("#cards__template");
const cardsList = document.querySelector(".cards__list");
const modalClicked = document.querySelector("#modal__clicked");
const modalClickedBtnX = modalClicked.querySelector(".modal__btn-x");
const modalClickedImg = modalClicked.querySelector(".modal__clicked-image");
const modalClickedDes = modalClicked.querySelector(
  ".modal__clicked-description"
);
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubBtn = avatarModal.querySelector(".modal__btn-sub");
const avatarBtnX = avatarModal.querySelector(".modal__btn-x");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const deleteImageBtnX = document.getElementById("delete-image-btn-x");

let selectedCard;
let selectedCardId;
let currentUser = null;

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleOutsideClick(evt) {
  if (evt.target.classList.contains("modal_is-opened")) {
    closeModal(evt.target);
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", handleOutsideClick);
});

profileBtn.addEventListener("click", function () {
  openModal(editProfile);
  profileNameInput.value = profileName.textContent;
  profileDesInput.value = profileDes.textContent;

  resetValidation(editProfile, [profileNameInput, profileDesInput]);
});

editProfile.addEventListener("submit", function (event) {
  event.preventDefault();

  const submitBtn = editProfile.querySelector(".modal__btn-sub");
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDesInput.value,
    })
    .then((data) => {
      profileName.textContent = profileNameInput.value;
      profileDes.textContent = profileDesInput.value;

      submitBtn.textContent = "Save";
      closeModal(editProfile);
    })
    .catch((err) => {
      console.error(err);
      submitBtn.textContent = "Save";
    });
});

xBtnProfile.addEventListener("click", function () {
  closeModal(editProfile);
});

postBtn.addEventListener("click", function () {
  openModal(newPost);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: captionInput.value,
    link: imageInput.value,
  };

  const buttonElement = evt.target.querySelector(".modal__btn-sub");
  buttonElement.textContent = "Saving...";

  api
    .addCard(cardData)
    .then((newCard) => {
      const cardElement = getCardElement(newCard, currentUser);
      cardsList.prepend(cardElement);

      evt.target.reset();
      const buttonElement = evt.target.querySelector(".modal__btn-sub");

      buttonElement.textContent = "Create";

      closeModal(newPost);
    })
    .catch((err) => {
      console.error(err);
      buttonElement.textContent = "Create";
    });
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

xBtnPost.addEventListener("click", function () {
  closeModal(newPost);
});

modalClickedBtnX.addEventListener("click", function () {
  closeModal(modalClicked);
});

function getCardElement(data, currentUser) {
  let cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  if (
    Array.isArray(data.likes) &&
    data.likes.some((user) => user._id === currentUser._id)
  ) {
    likeBtn.classList.add("card__like-button_clicked");
  }

  likeBtn.addEventListener("click", function () {
    const isLiked = likeBtn.classList.contains("card__like-button_clicked");
    const method = isLiked ? "DELETE" : "PUT";

    api
      .changeLikeStatus(data._id, method)
      .then((updatedCard) => {
        likeBtn.classList.toggle("card__like-button_clicked");
      })
      .catch((err) => {
        console.error("like request failed:", err);
      });
  });

  cardImage.addEventListener("click", function () {
    openModal(modalClicked);

    modalClickedDes.textContent = data.name;
    modalClickedImg.alt = data.name;
    modalClickedImg.src = data.link;
  });

  deleteBtn.addEventListener("click", function (evt) {
    selectedCard = evt.target.closest(".card");
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  return cardElement;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  confirmDeleteBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      confirmDeleteBtn.textContent = "Delete";
      closeModal(deleteModal);
    })
    .catch(console.error);
}

const deleteForm = deleteModal.querySelector(".modal__form");
deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleAvatarSumbit(evt) {
  evt.preventDefault();

  const buttonElement = avatarForm.querySelector(".modal__btn-sub");
  buttonElement.textContent = "Saving...";

  api
    .editAvatarUserInfo(avatarInput.value)
    .then((data) => {
      imageAvatar.src = data.avatar;
      avatarForm.reset();
      buttonElement.textContent = "Save";
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error(err);
      buttonElement.textContent = "Save";
    });
}

cancelDeleteBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteImageBtnX.addEventListener("click", () => {
  closeModal(document.getElementById("delete-modal"));
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarForm.addEventListener("submit", handleAvatarSumbit);

const avatarcloseBtn = avatarModal.querySelector(".modal__edit-post-btn-x");
avatarcloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

enableValidation(settings);
