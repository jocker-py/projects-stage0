const tableOfRecords = [];
if (localStorage.length > 0) {
  for (let i = 0; i <= localStorage.length - 1; i++) {
    let arr_item = localStorage.getItem(i);
    if (arr_item) {
      arr_item = arr_item.split(",");
      tableOfRecords.push([arr_item[0], arr_item[1]]);
    } else {
      tableOfRecords.push[(56, "None")];
    }

    if (tableOfRecords.length > 10) {
      tableOfRecords.splice(tableOfRecords.length - 10);
    }
  }
  getRecord();
}

function getRecord() {
  if (document.querySelector(".tbody").childNodes.length > 3) {
    const scoreRemove = document.querySelectorAll(".score_item");
    scoreRemove.forEach((element) => {
      element.remove();
    })
  }
  let i = tableOfRecords.length - 1;
  while (i >= 0) {
    let key = tableOfRecords[i][0];
    let value = tableOfRecords[i][1];
    const table_string = document.createElement("tr");
    const table_position = document.createElement("td");
    const table_name = document.createElement("td");
    const table_record = document.createElement("td");

    const parentScore = document.getElementById("first");
    table_name.textContent = `${value}`;
    table_record.textContent = `${key}`;
    table_string.className = "score_item";
    table_string.appendChild(table_record);
    table_string.appendChild(table_name);
    table_string.appendChild(table_position);
    parentScore.after(table_string);
    i--;
  }
  saveToLocalStorage();
}

function addRecord(name, score) {
  if (tableOfRecords.length >= 10) {
    tableOfRecords.shift();
  }
  tableOfRecords.push([score, name]);
  saveToLocalStorage();
  getRecord();
}

//Functions
const section = document.querySelector(".section");
const score = document.querySelector(".score");
let livesDefault = 10;
let count = 0;
score.textContent = 0;

// Data
const getData = () => [
  { imgSrc: "./assets/img/ciclop.png", name: "ciclop" },
  { imgSrc: "./assets/img/gambit.png", name: "gambit" },
  { imgSrc: "./assets/img/grey.png", name: "grey" },
  { imgSrc: "./assets/img/ironman.png", name: "ironman" },
  { imgSrc: "./assets/img/magneto.png", name: "magneto" },
  { imgSrc: "./assets/img/mario.png", name: "mario" },
  { imgSrc: "./assets/img/mystic.png", name: "mystic" },
  { imgSrc: "./assets/img/proffesorX.png", name: "proffesorX" },
  { imgSrc: "./assets/img/scream.png", name: "scream" },
  { imgSrc: "./assets/img/sonic.png", name: "sonic" },
  { imgSrc: "./assets/img/spyderman.png", name: "spyderman" },
  { imgSrc: "./assets/img/storm.png", name: "storm" },
  { imgSrc: "./assets/img/vindeta.png", name: "vindeta" },
  { imgSrc: "./assets/img/white.png", name: "white" },
  { imgSrc: "./assets/img/wild.png", name: "wild" },
  { imgSrc: "./assets/img/wolverine.png", name: "wolverine" },
];

// Random

const getRandom = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const getRestart = () => {
  document.location.reload();
};
// Remove hearths
const getRemoveHearths = () => {
  const removeHearts = document.querySelectorAll(".hearth");
  removeHearts.forEach((hearth) => {
    hearth.remove();
  });
};

// Add hearths
const getLeaves = () => {
  const live = document.querySelector(".table_score_lives");
  getRemoveHearths();
  for (let i = 0; i < livesDefault; i++) {
    const heart = document.createElement("img");
    heart.classList = "hearth";
    heart.src = "./assets/svg/heart.png";
    live.appendChild(heart);
  }
};

const genCards = () => {
  const cardData = getRandom();
  getLeaves();

  cardData.forEach((element) => {
    const cardItem = document.createElement("div");
    const cardFace = document.createElement("img");
    const cardBack = document.createElement("div");

    cardItem.classList = "item";
    cardFace.classList = "face";
    cardBack.classList = "back";

    cardFace.src = element.imgSrc;

    section.appendChild(cardItem);
    cardItem.appendChild(cardFace);
    cardItem.appendChild(cardBack);

    cardItem.addEventListener("click", (event) => {
      cardItem.classList.toggle("toggle_card");
      check(event);
    });
  });
};

const check = (event) => {
  count += 1;
  const clickCard = event.target;
  clickCard.classList.add("open");
  const openCards = document.querySelectorAll(".open");

  if (count % 2 === 0) {
    if (openCards[0].getAttribute("src") === openCards[1].getAttribute("src")) {
      score.textContent = 10 + Number(score.textContent);
      livesDefault = 10;
      getLeaves();
      openCards.forEach((element) => {
        element.parentElement.classList.add("checked");
        element.classList.remove("open");
      });
    } else {
      score.textContent--;
      livesDefault--;

      getLeaves();

      openCards.forEach((element) => {
        element.classList.remove("open");

        setTimeout(() => {
          element.parentElement.classList.remove("toggle_card");
        }, 1000);
      });
    }
  }

  if (document.querySelectorAll(".checked").length === 32) {
    alert("You are Win!");
    const name = prompt("Enter your name: ");
    alert(
      `Congratulation ${name}! You are awesome! 
      Score: ${score.textContent} Steps:${count / 2}`
    );
    getOpenRecords();

    addRecord(name, score.textContent);
  } else if (livesDefault === 0) {
    alert(`I'm sorry, You are lose. 
        Score: ${score.textContent} 
        Steps: ${count / 2}`);
    const desicion = prompt("Do you want try again?(yes/no)");
    if (desicion === "yes") {
      getRestart();
    } else {
      getOpenRecords();
    }
  }
};

genCards();
genCards();

const burgerMenu = document.querySelector(".burger_menu");
const exitRecords = document.querySelector(".records_table_btn");
const openRecords = document.querySelector(".menu_block_score");
const records = document.querySelector(".records");
const menu = document.querySelector(".menu");
const body = document.querySelector("body");
const restartBtn = document.querySelector(".menu_block_new_game");

restartBtn.addEventListener("click", getRestart);

const toggleMenu = () => {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    body.classList.remove("active");
  } else {
    records.classList.remove("active");
    menu.classList.add("active");
    body.classList.add("active");
  }
};

const closeRecords = () => {
  records.classList.remove("active");
  body.classList.remove("active");
};

const getOpenRecords = () => {
  records.classList.add("active");
  body.classList.add("active");
  menu.classList.remove("active");
};

burgerMenu.addEventListener("click", toggleMenu);
exitRecords.addEventListener("click", closeRecords);
openRecords.addEventListener("click", getOpenRecords);

function saveToLocalStorage() {
  localStorage.clear();
  if (tableOfRecords.length > 0) {
    console.log(tableOfRecords);
    let i = tableOfRecords.length - 1;
    let k = 0;
    while (i >= 0) {
      localStorage.setItem(i, [tableOfRecords[i][0], tableOfRecords[i][1]]);
      i--;
      k++;
      if (k === 10) {
        break;
      }
    }
  }
}
