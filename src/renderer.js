const timerDisplay = document.getElementById("timerDisplay");
const progressBarFill = document.getElementById("progressBarFill");
const modeIndicator = document.getElementById("modeIndicator");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const DEFAULT_WORK_DURATION = 25 * 60;
const DEFAULT_SHORT_BRAKE_DURATION = 5 * 60;
const DEFAULT_LONG_BRAKE_DURATION = 15 * 60;

let timer = null;
let timeLeft = DEFAULT_WORK_DURATION;
let currentMode = "work"; //"shortBreak", 'longBreak'
let workSectionCount = 0; // from 0 to 3


function startTimer() {
  if (timer !== null) return; //for preventing doulbe launch
  timeLeft--;
  updateDisplay(timeLeft);

  // actual loop for timer
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay(timeLeft);

    // to stop timer when 00:00 to laucnh other functions
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
  if (currentMode === "work") timeLeft = DEFAULT_WORK_DURATION;
  else if (currentMode === "shortBreak") timeLeft = DEFAULT_SHORT_BRAKE_DURATION;
  else if (currentMode === "longBreak") timeLeft = DEFAULT_LONG_BRAKE_DURATION;
  updateDisplay(timeLeft);
}

// updating display
function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  timerDisplay.textContent =
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  modeIndicator.textContent = 
    currentMode === "work" ? "Work" :
    currentMode === "shortBreak" ? "Short Break" : "Long Break";

  progressBarFill.style.width = `${progressBarPersentage()}%`;
}

// to chage current mode
function onTimerEnd() {
  if (currentMode === "work" && workSectionCount !== 3) {
    currentMode = "shortBreak";
    workSectionCount++;    
  }
  else if (currentMode === "work" && workSectionCount === 3) {
    currentMode = "longBreak";
    workSectionCount = 0;
  }
  else {
    currentMode = "work";
  }
  playSound();
  startTimer();
  changeCurrentMode();
}

// to set time for current mode
function changeCurrentMode() {
  resetTimer();
  updateDisplay(timeLeft);
}

function playSound() {
  new Audio('assets/clock_alarm.mp3').play();
}

function progressBarPersentage() {
  const totalTime = currentMode === "work" ? 25 * 60 :
                    currentMode === "shortBreak" ? 5 * 60 : 30 * 60;
  const persent = ( (totalTime - timeLeft) / totalTime ) * 100;
  return persent;
}

function openSettingsWindow() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeSettingsWindow() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeSettingsWindow();
});
