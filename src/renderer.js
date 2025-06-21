let timer = null;
let timeLeft = 25 * 60;

function startTimer() {
  if (timer !== null) return; // захист від подвійного запуску

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      onTimerEnd();
    }
  }, 1);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  stopTimer();
  timeLeft = 25 * 60;
  updateDisplay(timeLeft);
}

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  document.getElementById('timerDisplay').textContent =
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function onTimerEnd() {
  new Audio('assets/amalarm.mp3').play();
}