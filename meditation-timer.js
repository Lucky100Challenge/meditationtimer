let timer;
let isRunning = false;
let totalSeconds = 0;

function updateTimerDisplay() {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${hours}:${minutes}:${seconds}`;
}

function logSession() {
  const logEntries = document.getElementById('logEntries');
  const logEntry = document.createElement('div');
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const duration = `${hours}:${minutes}:${seconds}`;
  logEntry.textContent = `Session ended at ${timeString}, Duration: ${duration}`;
  logEntries.appendChild(logEntry);
}

document.getElementById('startStopButton').addEventListener('click', function() {
  const startStopButton = document.getElementById('startStopButton');
  
  if (!isRunning) {
    isRunning = true;
    startStopButton.textContent = 'Stop';
    timer = setInterval(() => {
      totalSeconds++;
      updateTimerDisplay();
    }, 1000);
  } else {
    isRunning = false;
    startStopButton.textContent = 'Start';
    clearInterval(timer);
    logSession();
  }
});

document.getElementById('pauseButton').addEventListener('click', function() {
  if (isRunning) {
    isRunning = false;
    document.getElementById('startStopButton').textContent = 'Start';
    clearInterval(timer);
  }
});

document.getElementById('resetButton').addEventListener('click', function() {
  isRunning = false;
  clearInterval(timer);
  totalSeconds = 0;
  updateTimerDisplay();
  document.getElementById('startStopButton').textContent = 'Start';
});

document.getElementById('toggleMode').addEventListener('click', function() {
  const body = document.body;
  const icon = document.getElementById('icon');
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  updateTimerDisplay();
});
