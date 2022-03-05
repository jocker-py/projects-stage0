"use strict";

// Импорт

import i18Obj from "./translate.js";

// Загрузка из LocalStorage

let language = "ru";
let theme = "dark";

function getLocalStorage() {
  if (localStorage.getItem("language")) {
    const language = localStorage.getItem("language");
    getTranslate(language);
  }

  if (localStorage.getItem("theme")) {
    const theme = localStorage.getItem("theme");
    getChangeTheme(theme);
  }
}

window.addEventListener("load", getLocalStorage);

// Изменение языка

let lang = document.querySelector(".language"); // Находим блок изменения языка
const data = document.querySelectorAll("[data-i18]"); // находим все data-элементы для замены языка

function getChoiseLanguage(event) {
  document
    .querySelectorAll([".en", ".ru"])
    .forEach((elem) => elem.classList.remove("active"));
  event.target.classList.add("active");
  getTranslate(event.target.classList[0]);
}

function getTranslate(event) {
  //аргумент en или ru
  language = event;
  data.forEach((elem) => {
    // для каждого элемента в списке со значением data-i18
    // присваиваем каждому элементу data-i18 на странице значение из translate.js
    if (elem.placeholder) {
      elem.placeholder = i18Obj[language][elem.dataset.i18];
      elem.textarea = i18Obj[language][elem.dataset.i18];
    } else {
      elem.innerHTML = i18Obj[language][elem.dataset.i18];
    }
  });
}

lang.addEventListener("click", getChoiseLanguage); // по клику меняем язык всех английских элементов

// Фото

const seasons = ["winter", "spring", "summer", "autumn"];
const portfolioAllDarkButtons = document.querySelector(".buttons"); // Находим блок темных кнопок класса buttons
const portfolioPhotos = document.querySelectorAll(".photos"); // Находим ВСЕ изображения

// Функция изменения фото взависимости от выбранного сезона
function changeImage(event) {
  if (event.target.classList.contains("dark-button")) {
    // если событие имеет внутри класс dark-button
    const season = event.target.dataset.i18; // сохраняем в переменную выбранный сезон
    portfolioPhotos.forEach(
      (img, index) => (img.src = `assets/img/${season}/${index + 1}.jpg`)
    );
  }
}

// Функция загрузки фоток в кэш
function preloadImages() {
  seasons.forEach((season) => {
    // для каждого сезона в seasons
    for (let i = 1; i <= 6; i++) {
      const img = new Image(); // создаём картинку
      img.src = `./assets/img/${season}/${i}.jpg`; // определяем для картинки путь
    }
  });
}

portfolioAllDarkButtons.addEventListener("click", changeImage); // Меняем изображения по клику
preloadImages(); //подгружаем все картинки в кэш

// Бургер меню
const burgerItem = document.querySelector(".burger");
const menu = document.querySelector(".nav");
const menuClose = document.querySelector(".header-nav-close");
const navLinkChoice = document.querySelector(".nav-list");

function burger() {
  burgerItem.addEventListener("click", () => {
    menu.classList.add("nav_active");
  });
  menuClose.addEventListener("click", () => {
    menu.classList.remove("nav_active");
  });

  navLinkChoice.addEventListener("click", () => {
    menu.classList.remove("nav_active");
  });
}

burger();

// Изменение темы

const change_theme = document.querySelector(".change-style");
const itemsOfIcons = ["logo", "inst", "fb", "tw", "pint"];
const selectorsOfIcons = [".logo", ".inst", ".fb", ".tw", ".pint"];
const itemsOfLightsTheme = [
  ".change-style",
  ".hero",
  "#header-container",
  "body",
  ".button",
  ".box",
  ".section-title",
  ".dark-button",
  ".decorator_contacts",
  ".text",
  ".textarea",
  ".footer-link",
  "::placeholder",
  ".burger-line",
  ".nav",
  ".close-line",
];


function getChangeTheme(event) {
  if (event == "light" || !event.target.classList.contains("light-theme")) {
    document.querySelectorAll(itemsOfLightsTheme).forEach((elem) => {
      elem.classList.add("light-theme");
    });
    document.querySelectorAll(selectorsOfIcons).forEach((img, index) => {
      img.src = `assets/svg/light_theme/${itemsOfIcons[index]}.svg`;
    });
    theme = "light";
  } else if (
    event == "dark" ||
    event.target.classList.contains("light-theme")
  ) {
    document.querySelectorAll(itemsOfLightsTheme).forEach((elem) => {
      elem.classList.remove("light-theme");
    });

    document.querySelectorAll(selectorsOfIcons).forEach((img, index) => {
      img.src = `assets/svg/dark_theme/${itemsOfIcons[index]}.svg`;
    });
    theme = "dark";
  }
}

change_theme.addEventListener("click", getChangeTheme);

// Сохраняем язык и тему в LocalStorage

function setLocalStorage() {
  localStorage.setItem("language", language);
  localStorage.setItem("theme", theme);
}

window.addEventListener("beforeunload", setLocalStorage);

// Видео

/*Элементы*/

let currentVolume;

const viewer = document.querySelector(".viewer");
const viewerBtn = viewer.querySelector(".viewer-btn");
const video = viewer.querySelector(".video-player");
const poster = viewer.querySelector(".poster");
const progressBar = viewer.querySelector(".progress-bar");
const progressPlayBtn = viewer.querySelector(".play-btn");
const progressBlock = viewer.querySelector(".progress-block");
const volume = viewer.querySelector(".volume");
const volumeBar = viewer.querySelector(".volume-bar");
const fullscreen = viewer.querySelector(".fullscreen");

/*Функции*/

function getPlay() {
  poster.classList.add("active");
  viewer.classList.add("active");
  progressPlayBtn.classList.toggle("pause");
  viewerBtn.classList.toggle("pause");
  playVideo();
}

function playVideo() {
  video.paused ? video.play() : video.pause();
}

function getMute() {
  volume.classList.toggle("mute");

  toggleVolume();
}

function toggleVolume() {
  video.volume > 0 ? (video.volume = 0) : (video.volume = currentVolume);
}

function changeVolume() {
  currentVolume = this.value / 100;
  video.volume = currentVolume;
  volumeBar.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${this.value}%, gray ${this.value}%, gray 100%)`;

  currentVolume === 0
    ? volume.classList.add("mute")
    : volume.classList.remove("mute");
}

function playProgress() {
  const currentProgress = (video.currentTime / video.duration) * 100;
  progressBar.value = currentProgress;
  progressBar.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${currentProgress}%, gray ${currentProgress}%, gray 100%)`;
}

function scrub(event) {
  if (video.paused) {
    progressPlayBtn.classList.add("pause");
    viewerBtn.classList.add("pause");
  }
  video.pause();
  const scrubTime = (event.offsetX / this.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  video.play();
}

function getFullscreen() {
  if (document.fullscreenElement) {
    progressBlock.classList.remove("full");
    progressPlayBtn.classList.remove("full");
    viewer.classList.remove("full");

    document.exitFullscreen();
  } else {
    const elem = document.getElementById("viewer");
    progressBlock.classList.add("full");
    progressPlayBtn.classList.add("full");
    viewer.classList.add("full");

    elem.requestFullscreen();
  }
}

function endVideo() {
  progressPlayBtn.classList.toggle("pause");
  viewerBtn.classList.toggle("pause");
}

/*Слушатели*/

viewerBtn.addEventListener("click", getPlay);

volume.addEventListener("click", getMute);
volumeBar.addEventListener("click", changeVolume);
volumeBar.addEventListener("mousemove", changeVolume);

video.addEventListener("timeupdate", playProgress);

progressBar.addEventListener("click", scrub);
progressBar.addEventListener("input", scrub);
progressPlayBtn.addEventListener("click", getPlay);

fullscreen.addEventListener("click", getFullscreen);

video.addEventListener("ended", endVideo);
