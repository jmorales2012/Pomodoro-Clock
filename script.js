// declare initial variables/buttons
var buttons = document.querySelectorAll("button");
var timeLeftDisplay = document.querySelector("#timeLeft");
var breakTimeDisplay = document.querySelector("#breakTime");
var sessionTimeDisplay = document.querySelector("#sessionTime");

// set initial timer values
var time;
var seconds;
var minutes;
var timeLeft;
var timerOn = false;



// add event handlers for timer buttons
buttons.forEach(function(btn) {
  btn.addEventListener("click", function() {
    // ======================
    // TIMER BUTTONS HANDLERS
    // ======================
    if (btn.className === "addTime") {
      // add button is always on right side, so get prev el text
      time = Number(btn.previousElementSibling.innerText);
      time = addTime(time);
      btn.previousElementSibling.innerText = time;
    }

    else if (btn.className === "subtractTime") {
      // sub button is always on left side, so get next el text
      time = Number(btn.nextElementSibling.innerText);
      time = subtractTime(time);
      btn.nextElementSibling.innerText = time;
    }

    if (btn.id === "sessionAdd" || btn.id === "sessionSubtract") {
      timeLeft = time;
      seconds = timeLeft * 60;
      timeLeftDisplay.innerText = timeLeft + ":00";
    }

    // =========================
    // START/STOP BUTTON HANDLER
    // =========================
    if (btn.id === "start") {
      timerOn = !timerOn;
      toggleTimer(timerOn, btn);
    }
  });
});


function toggleTimer(timerOn, btn) {
  console.log("timerOn: ", timerOn);
  if (timerOn) {
    var x = setInterval(function() {
      timeLeftDisplay.innerText = seconds + "s";
      seconds -= 1;

      if (seconds < 0) {
        clearInterval(x);
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