
const barFill = document.getElementById('barFill');



const STOPS = [0, 10, 10, 50, 90]; // точки 
let stopIndex = 1;
let current = 0;

function startGlitch() {
  barFill.classList.add('glitching');
  let shakes = 0;
  const shakeInt = setInterval(() => {
    barFill.style.width = (90 + (Math.random() * 5 - 2.5)) + '%';
    if (++shakes > 5) {
      clearInterval(shakeInt);
      barFill.style.width = '90%';
      setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.opacity = '1';
      }, 30); // пауза после глитча перед фейдом
    }
  }, 40);
}

function step() {
  const target = STOPS[stopIndex];

  current += (target - current) * 0.5; // скорость движения к точке
  barFill.style.width = current + '%';

  if (Math.abs(target - current) < 0.3) {
    current = target;
    barFill.style.width = target + '%';
    stopIndex++;

    if (stopIndex >= STOPS.length) {
      setTimeout(startGlitch, 350);
      return;
    }

    setTimeout(() => requestAnimationFrame(step), 300); // пауза между рывками
    return;
  }

  requestAnimationFrame(step);
}


const fromIndex = sessionStorage.getItem('fromIndex');

if (fromIndex) {
  sessionStorage.removeItem('fromIndex');
  requestAnimationFrame(step);
} else {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('content').style.opacity = '1';
}