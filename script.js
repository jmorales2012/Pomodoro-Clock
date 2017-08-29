// declare initial variables/buttons
var buttons = document.querySelectorAll("button");
var timeLeftDisplay = document.querySelector("#timeLeft");
var breakTimeDisplay = document.querySelector("#breakTime");
var timerTypeDisplay = document.querySelector("#timerType");
var sessionTimeDisplay = document.querySelector("#sessionTime");

// set initial timer values
var time;
var minutes;
var timerOn = false;
var breakOn = false;
var seconds = 10/*60*/;
var breakSeconds = 10/*Number(breakTimeDisplay.innerText) * 60*/;



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
      timeLeftDisplay.innerText = time + "m 0s";
    }

    // =========================
    // START/STOP BUTTON HANDLER
    // =========================
    if (btn.id === "start") {
      timerOn = !timerOn;
      toggleSessionTimer(timerOn, btn);
    }
  });
});


function toggleSessionTimer(timerOn, btn) {
  if (timerOn) {
    var x = setInterval(function() {
      seconds -= 1;
      minutes = Math.floor(seconds / 60);
      timeLeftDisplay.innerText = minutes + "m " + (seconds % 60) + "s";

      if (seconds < 1) {
        breakOn = !breakOn;
        if (!breakOn) {
          clearInterval(x);
          seconds = 10/*Number(sessionTimeDisplay.innerText) * 60*/;
          timerTypeDisplay.innerText = "Work Time!";
          toggleSessionTimer(timerOn, btn);
        } 

        else {
          clearInterval(x);
          seconds = 10/*Number(breakTimeDisplay.innerText) * 60*/;
          timerTypeDisplay.innerText = "Break Time!";
          toggleSessionTimer(timerOn, btn);
        }
      }

      btn.addEventListener("click", function() {
        timerOn = !timerOn;
        clearInterval(x);
      });
    }, 1000);
  }
}


function addTime(time) {
  return time += 1;
}

function subtractTime(time) {
  if (time > 1)
    return time -= 1;
  return time;
}