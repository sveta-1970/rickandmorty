//инфо с адресной строки можно прочитать при помощи location
const category = document.location.search.substr(1);
//?category нужно теперь убрать вопрос, для этого исп. метод строки substr(1),
//т.е. нам нужна инфо начиная с первого индекса

//перехід на інші сторінки через навігацію в хедері (зі сторінок категорій)
const buttons = document.getElementsByTagName("button");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    localStorage.clear();
    let key = e.target.innerText.toLowerCase();
    let categoryClicked = "";
    localStorage.setItem(categoryClicked, key); //зберігаємо в локальному хранилищі на яку кнопку ми натиснули
    const wind = window.open(`./index.html?${key}`); //відкриваємо відповідну сторінку категорії
  });
});

if (category) {
  document.querySelector("title").innerHTML = category;
} else {
  //навігація
  category = localStorage.getItem(key);
  document.querySelector("title").innerHTML = category;
}

//запрос на сервер
async function req(url) {
  /*
  можно второй аргумент fetch выносить в отдельную переменную
    let info = {
    method: "POST",
    headers: {},
    body: JSON.stringify({}),
  };
  */
  const data = await fetch(url); //по умолчанию здесь метод GET
  return data.json();
}

if (category === "characters") {
  req("https://rickandmortyapi.com/api/character")
    .then((data) => {
      showInfo(data);
    })
    .catch((e) => {
      console.error(e);
    });
} else if (category === "locations") {
  req("https://rickandmortyapi.com/api/location")
    .then((data) => {
      showInfo(data);
    })
    .catch((e) => {
      console.error(e);
    });
} else if (category === "episodes") {
  req("https://rickandmortyapi.com/api/episode")
    .then((data) => {
      showInfo(data);
    })
    .catch((e) => {
      console.error(e);
    });
} else {
  console.error("");
}

//функция для показа данных, полученных в результате запроса от сервера
function showInfo(e) {
  const divs = e.results.map((el) => {
    const div = document.createElement("div"); //создаем div для одной карточки
    div.className = "card";
    const patern = `
    <div class="img-card">
    ${
      el.image
        ? `<img src="${el.image}" alt="${el.image}">`
        : el.type
        ? el.type
        : el.air_date
    }
    </div>
    <h3>${el.name}</h3>
    ${
      el.species
        ? `<p>${el.species}</p>`
        : el.episode
        ? `<p>${el.episode}</p>`
        : ""
    }
    
    `; //шаблон содержания карточки,
    //на странице с локациями нет картинки, поэтому пишем условие на проверку есть ли картинка и выводим вместо картинки тип локации
    div.insertAdjacentHTML("beforeend", patern);
    div.addEventListener("click", (e) => {
      openInfo(el, e);
    });
    return div;
  });
  /*
  results: Array(20)
0: {id: 1, name: 'Earth (C-137)', type: 'Planet', dimension: 'Dimension C-137', residents: Array(27), …}
  */

  document.querySelector(".cards").append(...divs); //массив с объектами, три точки говорят, что массив нужно открыть
}
function openInfo(card) {
  const modal = document.querySelector(".box-modal");
  modal.classList.add("active");
  document.querySelector("#modal-closed").addEventListener("click", () => {
    modal.classList.remove("active");
  });

  const patternModal = `
    ${
      card.dimension
        ? `
        <h3>Location</h3>
        `
        : card.air_date
        ? `
        <h3>Episode</h3>
        `
        : ""
    }
    
    ${
      card.species
        ? `
        <div>Name: ${card.name}</div>
        <div>Status: ${card.status}</div>
        <div>Species: ${card.species}</div>
        <div>Type: ${card.type}</div>
        <div>Gender: ${card.gender}</div>
        <a href="${card.origin.url}" target="_blank">${card.origin.name}</a>
      `
        : card.type
        ? `
        <a href="https://rickandmortyapi.com/api/location/${card.id}" target="_blank">${card.name}</a>
      `
        : card.air_date
        ? `
        <a href="https://rickandmortyapi.com/api/episode/${card.id}" target="_blank"> ${card.episode}</a>
        `
        : ""
    }
      `;

  //document.querySelector(".modal-body").innerText = Object.entries(card);
  document.querySelector(".modal-body").innerHTML = patternModal;
}

//навігація на головну сторінку при натисканні на логотип

const logo = document.querySelector("#logo");
logo.addEventListener("click", () => {
  const home = window.open(`../index.html`);
});
