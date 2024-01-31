import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = parseInt(form.querySelector('[name="delay"]').value);
  const step = parseInt(form.querySelector('[name="step"]').value);
  const amount = parseInt(form.querySelector('[name="amount"]').value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
