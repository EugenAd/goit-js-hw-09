import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('datetime-picker');
const button = document.querySelector('[data-start]');
const daysUx = document.querySelector('span[data-days]');
const hoursUx = document.querySelector('span[data-hours]');
const minutesUx = document.querySelector('span[data-minutes');
const secondsUx = document.querySelector('span[data-seconds]');
button.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const nowDate = new Date();
    if (selectedDate < nowDate) {
      Notify.warning('Please choose a date in the future');
    } else {
      button.disabled = false;
    }
  },
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const flatpickrInstance = flatpickr(input, options);
button.addEventListener('click', () => {
  setInterval(() => {
    const leftTime =
      flatpickrInstance.selectedDates[0].getTime() - new Date().getTime();

    if (leftTime <= 0) {
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(leftTime);
    daysUx.textContent = addLeadingZero(days);
    hoursUx.textContent = addLeadingZero(hours);
    minutesUx.textContent = addLeadingZero(minutes);
    secondsUx.textContent = addLeadingZero(seconds);
  }, 1000);
});
function addLeadingZero(value) {
  if (value < 10) {
    value = String(value).padStart(2, '0');
  }
  return value;
}
const timerRaper = document.querySelector('.timer');
timerRaper.style.display = 'flex';
timerRaper.style.gap = '10px';
const fields = document.querySelectorAll('.field');

fields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.marginTop = '10px';
});
const values = document.querySelectorAll('.value');
values.forEach(value => {
  value.style.fontSize = '32px';
  value.style.backgroundColor = '#10dea1';
});
