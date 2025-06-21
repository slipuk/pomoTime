let timer = null;
let timeLeft = 25 * 60;
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
  }, 10);
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

// updating display
function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  //to change actual text
  document.getElementById('timerDisplay').textContent =
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  //this interpolation method always leaves two numbers on each
  //timer section like 01:02

  // to see what mode is currently in progress
  document.getElementById("modeIndicator").textContent = 
    currentMode === "work" ? "Work" :
    currentMode === "shortBreak" ? "Short Break" : "Long Break";
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
  if (currentMode === "work") timeLeft = 25 * 60;
  else if (currentMode === "shortBreak") timeLeft = 5 * 60;
  else if (currentMode === "longBreak") timeLeft = 30 * 60;
  updateDisplay(timeLeft);
}

function playSound() {
  new Audio('assets/clock_alarm.mp3').play();
}