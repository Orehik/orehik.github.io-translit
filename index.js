const converter = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ь: '',
  ы: 'y',
  ъ: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',

  А: 'A',
  Б: 'B',
  В: 'V',
  Г: 'G',
  Д: 'D',
  Е: 'E',
  Ё: 'E',
  Ж: 'Zh',
  З: 'Z',
  И: 'I',
  Й: 'Y',
  К: 'K',
  Л: 'L',
  М: 'M',
  Н: 'N',
  О: 'O',
  П: 'P',
  Р: 'R',
  С: 'S',
  Т: 'T',
  У: 'U',
  Ф: 'F',
  Х: 'H',
  Ц: 'C',
  Ч: 'Ch',
  Ш: 'Sh',
  Щ: 'Sch',
  Ь: '',
  Ы: 'Y',
  Ъ: '',
  Э: 'E',
  Ю: 'Yu',
  Я: 'Ya',
};
// функция транлитиратор
function transliterator(value) {
  let answer = '';

  for (let i = 0; i < value.length; i++) {
    if (converter[value[i]] === undefined) {
      answer += value[i];
    } else {
      answer += converter[value[i]];
    }
  }

  return answer;
}
const form = document.getElementById('transliterator'); // нашёл форму

// функция которая по клику на кнопку будет выводить значение инпута
function addОnСlick(event) {
  event.preventDefault(); // отменили стандартное отправление формы
  // емли input пустой ничего не делаем
  if (!(event.target.value || event.target.input_window.value)) {
    return;
  }

  const fullText = event.target.input_window.value; // значение инпута с учётом каково-либо события
  let liText = fullText;

  // обрезаю строку если она больше 7 символов
  if (liText.length > 7) {
    liText = `${liText.slice(0, 7)}...`;
  }

  const ruUl = document.querySelector('.ru_list'); // нашли русский ul
  const wordList = document.querySelectorAll('.ru_word'); // нашел все li
  const lastWordNumber = wordList[wordList.length - 1].dataset.number; // обратился к последней li в ul и взял её номер

  const newLi = document.createElement('li');
  newLi.setAttribute('class', 'ru_word');
  newLi.setAttribute('data-number', `${Number(lastWordNumber) + 1}`); // добавил data-number и его значение
  // если новая строка не такая-же как старая строка, добавляю дата-атриьут с новой строкой
  if (liText !== fullText) {
    newLi.setAttribute('data-text', fullText);
  }
  newLi.innerHTML = liText; // создали li со значением инпута

  ruUl.append(newLi); // добавляем li в конец ruUl

  const engWord = transliterator(liText); // вызов функции транслитиратора
  let engLiText = engWord;

  if (engLiText.length > 7) {
    engLiText = `${engLiText.slice(0, 7)}...`;
  }
  const enUl = document.querySelector('.en_list'); // нашли английский ul
  const newEngli = document.createElement('li'); // создал лишку
  newEngli.setAttribute('class', 'en_word'); // добавил атрибуты
  newEngli.setAttribute('data-number', `${Number(lastWordNumber) + 1}`); // добавил data-number и его значение
  // тут также
  if (engWord !== engLiText) {
    newEngli.setAttribute('data-text', transliterator(fullText));
  }
  newEngli.innerHTML = engLiText; // значение лишки будет значением транслитиратора

  const img = document.createElement('img'); // создаю картинку
  img.setAttribute('src', 'img/Group 1.svg'); // добавил атрибуты со значениями
  img.setAttribute('alt', 'icon'); // добавил атрибуты со значениями
  img.setAttribute('class', 'cross'); // добавил атрибуты со значениями

  newEngli.append(img);
  enUl.append(newEngli);
  if (event.type === 'submit') {
    event.target.input_window.value = ''; // очищаем поле инпута с учётом события
  } else {
    event.target.value = '';
  }
}

form.addEventListener('submit', addОnСlick); // событие на клик кнопки добавить


const deleteButton = document.querySelector('.clear'); // кнопка удалить всё

function clearAll() {
  const allRuLi = document.querySelectorAll('.ru_word'); // нашел ru_list
  const allEnLi = document.querySelectorAll('.en_word'); // нашел en_list

  for (let i = 0; i < allRuLi.length; i++) {
    if (allRuLi[i].dataset.number !== '1') {
      allRuLi[i].remove();
    }
    if (allEnLi[i].dataset.number !== '1') {
      allEnLi[i].remove();
    }
  }
  document.forms.transliterator.input_window.value = '';
}
deleteButton.addEventListener('click', clearAll); // событие на клик кнопки удалить всё

function clearRow(event) {
  const meaning = event.target.parentElement.dataset.number;
  const deleteRuLi = document.getElementsByClassName('ru_word');
  const deleteEnLi = document.getElementsByClassName('en_word');
  for (let i = 0; i < deleteRuLi.length; i++) {
    if (deleteRuLi[i].dataset.number === meaning && deleteEnLi[i].dataset.number === meaning) {
      deleteRuLi[i].remove();
      deleteEnLi[i].remove();
      break;
    }
  }
  for (let i = 0; i < deleteRuLi.length; i++) {
    deleteRuLi[i].dataset.number = i + 1;
    deleteEnLi[i].dataset.number = i + 1;
  }
}

document.addEventListener('click', (event) => {
  if (event.target.localName === 'img' && event.target.className === 'cross') {
    clearRow(event);
  }
}); // событие на удаление одного элемента

let tooltipElem;

document.onmouseover = function (event) {
  const { target } = event;

  // если у нас есть подсказка
  const tooltipHtml = target.dataset.text;
  if (!tooltipHtml) return;

  // создадим элемент для подсказки

  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = tooltipHtml;
  document.body.append(tooltipElem);

  // спозиционируем его сверху от аннотируемого элемента (top-center)
  const coords = target.getBoundingClientRect();

  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0; // не заезжать за левый край окна

  let top = coords.top - tooltipElem.offsetHeight + 6;
  if (top < 0) {
    // если подсказка не помещается сверху, то отображать её снизу
    top = coords.top + target.offsetHeight + 11;
  }
  tooltipElem.style.left = `${left}px`;
  tooltipElem.style.top = `${top}px`;
};

document.onmouseout = function () {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
  }
};
