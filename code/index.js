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

//перехід на інші сторінки через навігацію в хедері
const buttons = document.getElementsByTagName("button");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    localStorage.clear();
    let key = e.target.innerText.toLowerCase();
    let categoryClicked = "";
    localStorage.setItem(categoryClicked, key); //зберігаємо в локальному хранилищі на яку кнопку ми натиснули
    const wind = window.open(`./page/index.html?${key}`); //відкриваємо відповідну сторінку
  });
});
