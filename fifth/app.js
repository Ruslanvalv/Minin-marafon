const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const board = document.querySelector('#board');
const timeEl = document.querySelector('#time');
const color = ['red', 'yellow', 'green', 'black', 'blue'];
const realScore = document.querySelector('.score');

let score = 0;
let time = 0;
startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn'))
    time = parseInt(event.target.getAttribute('data-time'));
  screens[1].classList.add('up');
  startGame();
});
board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decTime, 1000);
  createRandomCircle();
  setTime(time);
}
function decTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
  realScore.innerHTML = `Ваш счёт: ${score}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`;
}
function createRandomCircle() {
  const circle = document.createElement('div');
  const { width, height } = board.getBoundingClientRect();
  const size = getRandomNumber(10, 60);
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.background = `${color[getRandomColor()]}`;
  console.log(circle.style.background);
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function getRandomColor() {
  return Math.floor(Math.random() * color.length);
}
