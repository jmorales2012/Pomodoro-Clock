// declare initial variables/buttons
var buttons = document.querySelectorAll("button");
var breakTimeDisplay = document.querySelector("#breakTime");
var sessionTimeDisplay = document.querySelector("#sessionTime");

// set initial timer values
var breakTime = 1;
var sessionTime = 1;


// listeners
buttons.forEach(function(btn) {
  btn.addEventListener("click", function() {
    // add processes for handling each button ID and add/subtracting time
    // from breakTime and sessionTime
  });
});



function addTime(time) {
  return time += 1;
}

function subtractTime(time) {
  if (time > 0)
    return time -= 1;
}