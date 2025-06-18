const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
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

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
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

  document.querySelector("#profile-name-input-error").textContent = "";
  document.querySelector("#profile-description-input-error").textContent = "";
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

  const cardData = {
    name: captionInput.value,
    link: imageInput.value,
  };

  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);

  evt.target.reset();
  const inputList = Array.from(evt.target.querySelectorAll(".modal__input"));
  const buttonElement = evt.target.querySelector(".modal__btn-sub");

  toggleButtonState(buttonElement, settings);

  closeModal(newPost);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

xBtnPost.addEventListener("click", function () {
  closeModal(newPost);
});

function getCardElement(data) {
  let cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("card__like-button_clicked");
  });

  modalClickedBtnX.addEventListener("click", function () {
    closeModal(modalClicked);
  });

  cardImage.addEventListener("click", function () {
    openModal(modalClicked);

    modalClickedDes.textContent = data.name;
    modalClickedImg.alt = data.name;
    modalClickedImg.src = data.link;
  });

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", function () {
    deleteBtn.closest(".card").remove();
    cardElement = null;
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal_is-opened").forEach((modal) => {
      closeModal(modal);
    });
  }
});
