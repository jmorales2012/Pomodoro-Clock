// declare initial variables/buttons
var buttons = document.querySelectorAll("button");
var timeLeftDisplay = document.querySelector("#timeLeft");
var breakTimeDisplay = document.querySelector("#breakTime");
var timerTypeDisplay = document.querySelector("#timerType");
var sessionTimeDisplay = document.querySelector("#sessionTime");
var timerContainerDisplay = document.querySelector("#timerContainer");

// set initial timer values
var time;
var timerOn;
var breakOn;
var seconds;
var minutes;
var breakSeconds;

// initialize timer display
reset();


// add event handlers for timer buttons
buttons.forEach(function(btn) {
  btn.addEventListener("click", function() {

    // ======================
    // TIMER BUTTONS HANDLERS
    // ======================
    if (btn.className === "addTime") {
      // initialize time, increment, assign
      time = Number(btn.previousElementSibling.innerText);
      time = addTime(time);
      btn.previousElementSibling.innerText = time;
    }

    else if (btn.className === "subtractTime") {
      // initialize time, decrement, assign
      time = Number(btn.nextElementSibling.innerText);
      time = subtractTime(time);
      btn.nextElementSibling.innerText = time;
    }

    if (btn.id === "sessionAdd" || btn.id === "sessionSubtract") {
      // set seconds, display timer
      seconds = time * 60;
      minutes = Math.floor(seconds / 60);
      displayTime();
    }

    // =========================
    // START/STOP BUTTON HANDLER
    // =========================
    if (btn.id === "start") {
      timerTypeDisplay.innerText = "Work Time!";
      timerOn = !timerOn;
      toggleSessionTimer(timerOn, btn);
    }

    // ====================
    // RESET BUTTON HANDLER
    // ====================
    if (btn.id === "reset") {
      reset();
    }
  });
});


function toggleSessionTimer(timerOn, btn) {
  if (timerOn) {
    timerContainerDisplay.classList.toggle("sessionOn");
    timerContainerDisplay.classList.toggle("breakOn");
    var x = setInterval(function() {
      seconds -= 1;
      minutes = Math.floor(seconds / 60);
      displayTime();

      // what to do when timer runs out
      if (seconds < 1) {
        breakOn = !breakOn;
        toggleBreakSession(x, btn);
      }

      // start/stop button event listener
      btn.addEventListener("click", function() {
        timerOn = !timerOn;
        clearInterval(x);
      });

      // reset button event listener
      buttons[5].addEventListener("click", function() {
        clearInterval(x);
        reset();
      })
    }, 1000);
  }
}

function toggleBreakSession(x, btn) {
  var timerType = "";
  if (!breakOn) {
    seconds = Number(sessionTimeDisplay.innerText) * 60;
    timerType = "Work Time!";
  } else {
    seconds = Number(breakTimeDisplay.innerText) * 60;
    timerType = "Break Time!";
  }

  clearInterval(x);
  timerTypeDisplay.innerText = timerType;
  toggleSessionTimer(timerOn, btn);
}

function addTime(time) {
  return time += 1;
}

function subtractTime(time) {
  if (time > 1)
    return time -= 1;
  return time;
}

function displayTime() {
  timeLeftDisplay.innerText = minutes + "m " + (seconds % 60) + "s";
}

function reset() {
  timerOn = false;
  breakOn = false;
  timerTypeDisplay.innerText = "Ready to Start?";
  timerContainerDisplay.classList.add("breakOn");
  timerContainerDisplay.classList.remove("sessionOn");
  breakTimeDisplay.innerText = 5;
  sessionTimeDisplay.innerText = 20;
  seconds = Number(sessionTimeDisplay.innerText) * 60;
  minutes = Math.floor(seconds / 60);
  breakSeconds = Number(breakTimeDisplay.innerText) * 60;
  displayTime();
}