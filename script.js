// declare initial variables/buttons
var buttons = document.querySelectorAll("button");
var timeLeftDisplay = document.querySelector("#timeLeft");
var breakTimeDisplay = document.querySelector("#breakTime");
var timerTypeDisplay = document.querySelector("#timerType");
// var sessionTimeDisplay = document.querySelector("#sessionTime");

// set initial timer values
var time;
var minutes;
var timeLeft = 1;
var timerOn = false;
var breakOn = false;
var seconds = timeLeft * 60;
var breakSeconds = Number(breakTimeDisplay.innerText) * 60;



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
      // initialize timeLeft, get seconds, display timeLeft
      timeLeft = time;
      seconds = timeLeft * 60;
      timeLeftDisplay.innerText = timeLeft + "m 0s";
    }

    // =========================
    // START/STOP BUTTON HANDLER
    // =========================
    if (btn.id === "start") {
      timerOn = !timerOn;
      toggleSessionTimer(timerOn, btn, seconds);
    }
  });
});


function toggleSessionTimer(timerOn, btn, timerSeconds = timeLeft * 60) {
  // timerTypeDisplay.innerText = "Work Time!";
  if (timerOn) {
    var x = setInterval(function() {
      timerSeconds -= 1;
      minutes = Math.floor(timerSeconds / 60);
      timeLeftDisplay.innerText = minutes + "m " + (timerSeconds % 60) + "s";

      if (timerSeconds < 1) {
        breakOn = !breakOn;
        if (!breakOn) {
          clearInterval(x);
          timerTypeDisplay.innerText = "Work Time!";
          toggleSessionTimer(timerOn, btn, breakSeconds);
        } 

        else {
          clearInterval(x);
          timerTypeDisplay.innerText = "Break Time!";
          toggleSessionTimer(timerOn, btn, seconds);
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