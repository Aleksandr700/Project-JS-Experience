"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//----------------------------------------

// СКРОЛЛ ДО 1 СЕКЦИИ

// обращаемся к кнопке и секции
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScroll.addEventListener("click", function () {
  // метод скролла с свойством мягкой промотки
  section1.scrollIntoView({ behavior: "smooth" });
});
// // метод манипулирования обьектом,отностильно его области просмотра
console.log(btnScroll.getBoundingClientRect());

// ОТМЕНА И ВСПЛЫТИЕ СОБЫТИЙ

// один из примеров в конце html

// // Простой пример всплытия и отмены
// // заголовок
// const h1 = document.querySelector("h1");
// // функция всплывающего окна
// function h1Alert() {
//   alert("Hello");
//   // отмена события сообщения после принятия его 1 раз
//   h1.removeEventListener("mouseenter", h1Alert);
// }
// // событие наведение и выдача сообщения
// h1.addEventListener("mouseenter", h1Alert);

// Пример на рандомных цветах в нав меню
// Генератор рандомных чисел
// function randomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
// // рандомный ргб от 0 до 255
// function randomColor() {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// }
// // console.log(randomColor());
// // обращаемся к тегам
const nav = document.querySelector(".nav");
// const navLinks = document.querySelector(".nav__links");
// const link = document.querySelector(".nav__link");
// // Событие клика с измененением цвета будет проходить через все родительские элементы(navLinks,link), при
// // нажатии на link("возможности"),цвет будет менятся везде!
// // this ссылается на элмент на который настроен обработчик события
// nav.addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
// navLinks.addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
// link.addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   // не популярный метод остановки события на опред элементе(нарушается структура и вложенность элементов)
//   // если остановить на нижнем, то нарушается вложенность родительских элементов выше
//   // e.stopPropagation(e);
// });

// ДЕЛЕГИРОВАНИЕ СОБЫТИЙ

// способ если елементов меню мало
// коллекция элементов через forEach
// document.querySelectorAll(".nav__link").forEach(function (elem) {
//   elem.addEventListener("click", function (e) {
//     // сбрасываем до стандартных настроек
//     e.preventDefault();
//     // получаем атрибут каждого элемента
//     const id = this.getAttribute("href");
//     // console.log(id);
//     // делаем скрол элементу
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// популярный пример делегирования
// если елементов много(чтобы проге не создавать 1000000000 обраьотчиков событий)
// обращаемся к обертке всех ссылок
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e.target);
  // условие если получаем определенеую ссылку,то
  if (e.target.classList.contains("nav__link")) {
    // получаем атрибут данной ссылки
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// СОЗДАНИЕ ТАБОВ

//кнопки
const tabs = document.querySelectorAll(".operations__tab");
// контейнер с кнопками
const tabContainer = document.querySelector(".operations__tab-container");
// контент от кнопок
const tabsContent = document.querySelectorAll(".operations__content");
tabContainer.addEventListener("click", function (e) {
  e.preventDefault;
  // closest - позволяет получить кнопку при нажатии на кнопку в DOM(а не какой нибудь span)
  // также при нажати мимо кнопки на род элеметы будет null
  // clicked - это сам таб на котрый нажали
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);
  // условие для исбежания ошибок при нажатии на род элемент не имеющий класса
  // если условие правда, то if не сработает ,а ложь сработает и мы просто вернем что было до
  if (!clicked) return;
  // убираем класс с поднятием таба у всех других табов, когда жмем на какой-либо
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  // добавляем класс при котром табы подскакивают при нажатии
  clicked.classList.add("operations__tab--active");
  // удаляем классы активности у контента,чтобы они не накапливались при нажатии
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  // получаем дата-атрибут
  // console.log(clicked.dataset.tab);
  // получаем дата-атрибут через дата-сет
  // у каждого operations__content-- есть свой номер и туда ставим нужный дата-атнибут
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    // добавили класс активности
    .classList.add("operations__content--active");
});

// СОЗДАНИЕ ПРОЗРАЧНОГО МЕНЮ, ЧЕРЕЗ ДЕЛЕГИРОВАНИЕ СОБЫТИЙ

// родитель
// mouseover - событие наведение
nav.addEventListener("mouseover", function (e) {
  // если это одна из ссылок
  if (e.target.classList.contains("nav__link")) {
    // переменная для каждой ссылки
    const link = e.target;
    // переменная для соседних ссылок
    // через closest ищем род элемент по классу и из него("nav") будем получать все наши ссылки
    const neighbourLinks = link.closest(".nav").querySelectorAll(".nav__link");
    // переменная для прозрачности логотипа
    const logo = link.closest("nav").querySelector(".nav__logo");
    neighbourLinks.forEach((el) => {
      // если елемент не равен ссылки на котрую навели
      // то всем другим элементам,кроме того на котрый навели изменить стиль
      if (el !== link) {
        el.style.opacity = 0.5;
      }
    });
    logo.style.opacity = 0.5;
  }
});
// отведение мышки на другой элемент
nav.addEventListener("mouseout", function (e) {
  // если это одна из ссылок
  if (e.target.classList.contains("nav__link")) {
    // переменная для каждой ссылки
    const link = e.target;
    // переменная для соседних ссылок
    // через closest ищем род элемент по классу и из него("nav") будем получать все наши ссылки
    const neighbourLinks = link.closest(".nav").querySelectorAll(".nav__link");
    // переменная для прозрачности логотипа
    const logo = link.closest("nav").querySelector(".nav__logo");
    neighbourLinks.forEach((el) => {
      // если елемент не равен ссылки на котрую навели
      // то всем другим элементам,кроме того на котрый навели изменить стиль
      if (el !== link) {
        el.style.opacity = 1;
      }
    });
    logo.style.opacity = 1;
  }
});

// Intersection API
// – это часть API браузера, предназначенная для отслеживания пересечения элементов с видимой областью окна браузера

// настройка нав-меню
const navContainer = document.querySelector(".nav");
// создаем колбэк функц с какой-либо инструкцией
// параметр entries отвечает за движение по области видимости внутри так и снаружи области видимости
function callBack(entries) {
  // нужно добраться до обьекта в массиве(IntersectionObserverEntry) через [0] индекс
  // console.log(entries[0]);
  // условие
  if (!entries[0].isIntersecting) {
    // то добавляем прилипание
    navContainer.classList.add("sticky");
  }
  // убираем
  else {
    navContainer.classList.remove("sticky");
  }
}
const options = {
  // диапозон отслеживания(0,1 - 10%),после чего сработает какая-то колбэк функция
  treshold: 0.1,
  // ипользуется для более детальной донастройки параметров для срабатывания функции
  // rootMargin: "-90px",
};
// создаем API
const observer = new IntersectionObserver(callBack, options);
// через observe начинаем отслеживание
observer.observe(document.querySelector(".header"));

// ВСПЛЫТИЕ СЕКЦИЙ ЧЕРЕЗ Intersection API

// все секции
const allSections = document.querySelectorAll(".section");
function revealSection(entries, observe) {
  // первый элмент массива
  // console.log(entries[0]);
  // удаляем класс сокрытия через таргет
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove("section--hidden");
    // метод обратного слежения при движении на странице снизу в верх
    observe.unobserve(entries[0].target);
  }
}
// апи, в качестве опции сразу обьект { treshold: 0.15 }
const sectionsObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});
// перебираем секции
allSections.forEach(function (section) {
  // отслеживаем каждую секцию
  sectionsObserver.observe(section);
  //  добавляем скрытие из css
  section.classList.add("section--hidden");
});

// ЛЕНИВАЯ ПОДГРУЗКА ИЗОБРАЖЕНИЙ ЧЕРЕЗ Intersection API

const images = document.querySelectorAll("img[data-src]");
// console.log(images);
function loadImg(entries, observe) {
  // console.log(entries);
  // условие для удаоения блюра непосредственно при наведении на изображение
  if (!entries[0].isIntersecting) return;
  // меняем знчаение src на на data-src(дата-элемент) через datset
  entries[0].target.src = entries[0].target.dataset.src;
  // событие при котором блюр будет удалятся, только после того как изображение загрузится
  entries[0].target.addEventListener("load", function () {
    entries[0].target.classList.remove("lazy-img");
  });
  observe.unobserve(entries[0].target);
}
// апи
const imgObserver = new IntersectionObserver(loadImg, { threshold: 0.15 });
// перебор и отслеживание
images.forEach((img) => {
  imgObserver.observe(img);
});

// СЛАЙДЕР

// слайды
const slides = document.querySelectorAll(".slide");
// слайдер
const slider = document.querySelector(".slider");
// кнопка право
const btnRight = document.querySelector(".slider__btn--right");
// кнопка лево
const btnLeft = document.querySelector(".slider__btn--left");
// точки
const dotsContainer = document.querySelector(".dots");
// переменная с текущей цифрой слайда,которая будет менятся при нажатии на кнопку
// будет увеличиваться при нажатии на кнопку
let currSlide = 0;
// максимальная длина слайдов
const maxSlide = slides.length;
// размер(только для настройки работы)
// slider.style.scale = 0.5;
// // видимость(изначально стоит невидим),(только для настройки работы)
// slider.style.overflow = "visible";
// в параметрах слайд и его индкс
// slides.forEach(function (slide, indx) {
//   // первый слайд остался на месте т.к его инедкс 0 и при уинож на 100 будет 0
//   // второй сьехал на 100 т.к его индекс равен 1
//   // третий сьехал на 200
//   slide.style.transform = `translateX(${100 * indx}%)`;
// });
// аналог закоментиной функции выше
goToSlide(0);
// функция логики движения слайдов
function goToSlide(sld) {
  slides.forEach(function (slide, indx) {
    // первый слайд остался на месте т.к его инедкс 0 и при уинож на 100 будет 0
    // второй сьехал на 100 т.к его индекс равен 1
    // третий сьехал на 200
    // (indx - sld) - пример: 0 - 1 = -1, 100 * -1 = -100 и слайд уходит на -100%
    slide.style.transform = `translateX(${100 * (indx - sld)}%)`;
  });
}
// функция след слайда
function nextSlide() {
  // если строго равен кол-ву слайдов,начинаем промотку слайдов заново(для избежания ухода бегунка в право)
  // -1 так как слайды начинаются с 0 по индексу
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  // вызов функции движения слайдов
  goToSlide(currSlide);
  // вызов функции отображения цвета кнопки
  activateDots(currSlide);
}
function prevSlide() {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
  // вызов функции отображения цвета кнопки
  activateDots(currSlide);
}
// функция создания точек переключения
function createDots() {
  // (_) - если не нужен первый параметр
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      // прописываем html(класс с дизайном точек уже в css), с дата-атрибутом по индексу слайда
      // появится три точки вследствие перебора выше по кол-ву слайдов
      `<button class="dots__dot"data-slide="${i}"></button>`
    );
  });
}
createDots();
// нажатие на кнопку
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
// кнопки клавы(лево и право)
document.addEventListener("keydown", function (e) {
  // кей проверяет нажатие
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});
// обработчик работы кнопок, на род элемент всех кнопок
dotsContainer.addEventListener("click", function (e) {
  // если будет содержаться данный класс
  if (e.target.classList.contains("dots__dot")) {
    // берется дата-атрибут каждой кнопки
    const slide = e.target.dataset.slide;
    // передается дата-аипибут
    goToSlide(slide);
    // вызов функции отображения цвета кнопки
    activateDots(slide);
  }
});
// функция активации точек по цвету при нажатии
function activateDots(slide) {
  // вызываем все точки и перебираем их
  document.querySelectorAll(".dots__dot").forEach(function (dot) {
    // убираем класс отвечающий за цвет у каждой точки
    dot.classList.remove("dots__dot--active");
  });
  // вызываем конкретную точку на котрой будет класс активности - цвет по дата атрибуту
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}
