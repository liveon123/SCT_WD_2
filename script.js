let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

function startStopwatch() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    running = true;
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  lapCount = 0;
  document.getElementById('display').textContent = '00:00:00.000';
  document.getElementById('laps').innerHTML = '';
}

function updateTime() {
  elapsedTime = Date.now() - startTime;

  let milliseconds = elapsedTime % 1000;
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));

  document.getElementById('display').textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMs(milliseconds)}`;
}

function recordLap() {
  if (running) {
    lapCount++;
    const lapTime = document.getElementById('display').textContent;
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCount}: ${lapTime}`;
    document.getElementById('laps').appendChild(li);
  }
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function padMs(num) {
  return num.toString().padStart(3, '0');
}
