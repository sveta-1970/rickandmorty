//https://rickandmortyapi.com/api

async function getData(url, method = "GET") {
  const data = await fetch(url, {
    method, //GET по умолчанию
  });
  return data.json();
}

/* 
{
  "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
}*/

getData("https://rickandmortyapi.com/api").then((info) => {
  const arr = Object.entries(info);

  if (!Array.isArray(arr)) return;
  arr.forEach((item) => {
    createCard(item); //["key", "value"]
    //(2) ['characters', 'https://rickandmortyapi.com/api/character']
    //(2) ['locations', 'https://rickandmortyapi.com/api/location']
    //(2) ['episodes', 'https://rickandmortyapi.com/api/episode']
  });
});

function createCard(element) {
  const [key] = element; //value нам уже не нужно
  const card = document.createElement("div");
  card.innerText = key; //element[0], сохраняется инфо про категории
  card.className = "card";
  card.addEventListener("click", () => {
    const wind = window.open(`./page/index.html?${key}`); //value, при нажатии открываем новое окно по ссылке
  });
  document.querySelector(".cards").append(card);
}

const logo = document.querySelector("#logo");
logo.addEventListener("click", () => {
  const home = window.open(`./index.html`);
});
const nav = document.querySelector("li > a");
nav.addEventListener("click", () => {
  if ((nav.target = ".characters")) {
    const wind = window.open(`./page/index.html?characters`);
  } else if ((nav.target = ".locations")) {
    const wind = window.open(`./page/index.html?locations`);
  } else if ((nav.target = ".episodes")) {
    const wind = window.open(`./page/index.html?episodes`);
  }
});
