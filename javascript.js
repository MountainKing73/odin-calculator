var left = 0;
var right = 0;
var operator = undefined;
var entry = 0;

function add(num1, num2) {
  console.log("My add");
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}

function updateDisplay(num) {
  const display = document.querySelector("#display");
  display.textContent = num;
}

function buttonClicked(event) {
  let btnValue = event.target.innerText;
  console.log("button clicked: " + btnValue);
  const display = document.querySelector("#display");
  let dispText = Number(display.innerText);

  switch (btnValue) {
    case "+":
    case "-":
    case "x":
    case "÷":
      console.log("Do operation " + btnValue);
      if (operator === undefined) {
        left = Number(entry);
        entry = 0;
      } else {
        operator = btnValue;
        right = Number(entry);
        entry = operate(operator, left, right);
        updateDisplay(entry);
      }
      break;
    case "=":
      console.log("Do equal");
      right = Number(entry);
      entry = operate(operator, left, right);
      updateDisplay(entry);
      break;
    case "C":
      console.log("Do clear");
      entry = 0;
      operator = undefined;
      left = 0;
      right = 0;
      updateDisplay(entry);
      break;
    default:
      console.log("Number key");
      if (entry === 0) {
        entry = btnValue;
      } else {
        entry = Number(dispText + btnValue);
      }
      updateDisplay(entry);
      break;
  }
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach(function (currentBtn) {
  currentBtn.addEventListener("click", buttonClicked);
});
