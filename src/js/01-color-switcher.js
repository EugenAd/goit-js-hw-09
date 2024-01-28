function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let color = '';
const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timeInterval;
const handleStart = () => {
  color = getRandomHexColor();
  body.style.backgroundColor = color;
};
startButton.addEventListener('click', () => {
  timeInterval = setInterval(handleStart, 1000);
  startButton.disabled = true;
});
stopButton.addEventListener('click', () => {
  clearInterval(timeInterval);
  startButton.disabled = false;
});
