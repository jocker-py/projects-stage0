// Active Search_Bar
const submit = document.querySelector(".submit");
const search = document.querySelector(".search");

function getActive() {
  search.classList.add("active");
}

submit.addEventListener("mousedown", getActive);

// Fullscreen Mode
const images = document.querySelector(".gallery_list");

function getWatch(event) {
  const idOfPicture = event.target.offsetParent.attributes.id.value;
  const summary = event.target.offsetParent.children[2];
  const imgFull = document.getElementById(idOfPicture);

  if (document.fullscreenElement) {
    imgFull.classList.remove("full");
    summary.classList.remove("full");
    event.target.classList.remove("full");
    document.exitFullscreen();
  } else {
    imgFull.classList.add("full");
    summary.classList.add("full");
    event.target.classList.add("full");
    imgFull.requestFullscreen();
  }
}

images.addEventListener("click", getWatch);

// Remove items
function getRemove() {
  const removeItems = document.querySelectorAll(".gallery_item");
  removeItems.forEach((elem) => {
    elem.remove();
  });
}

// API
const api = "cWY5BVlwlZx72KZ58JANbEhBiwppw8aVYycOECR39tk";
const secret = "QiL8ztrpffJ2fg_EC7pVWGohVlMntJeLaFOQw-wh6vY";
let page;
let tag;

async function getData(tag = "natural", pages = 1) {
  const per_page = 16;
  const url = `https://api.unsplash.com/search/photos?query=${tag}&page=${pages}&per_page=${per_page}&orientation=landscape&client_id=cWY5BVlwlZx72KZ58JANbEhBiwppw8aVYycOECR39tk`;
  const res = await fetch(url);
  const data = await res.json();
  const photos = data["results"];

  getRemove();
  photos.forEach((elem, index) => {
    let newElement = document.createElement("div");
    let description = elem["description"];
    if (description == null) {
      description = `${tag}`;
    }

    let sourse = elem["urls"]["regular"];
    newElement.className = "gallery_item";
    newElement.id = per_page - index;

    newElement.innerHTML = `<div class="gallery_item_hover">Look at</div>
                            <img src="${sourse}" alt="picture">
                            <p class="description">${description}</p>`;
    gallery_list.prepend(newElement);
  });
}

// Search
const header = document.querySelector(".header");
const formElem = header.querySelector(".search_bar");
const input = header.querySelector(".search");

function getSearch() {
  next.classList.add("active");
  page = 1;
  if (!input.value) {
    getData();
  } else {
    tag = input.value;
    getData(tag, page);
  }
}

formElem.addEventListener("submit", getSearch);

// go to next page
const next = header.querySelector(".next");

function getNextPage() {
  back.classList.add("active");
  page += 1;
  getData(tag, page);
}

next.addEventListener("click", getNextPage);

// come back
const back = header.querySelector(".back");

function getBackPage() {
  if (page === 2) {
    back.classList.remove("active");
  }
  page -= 1;
  getData(tag, page);
}

back.addEventListener("click", getBackPage);
