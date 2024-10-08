var left = 0;
var right = 0;
var operator = undefined;
var entry = 0;

function add(num1, num2) {
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

function displayResult(num) {
  updateDisplay(Math.round(num * 1000000) / 1000000);
}

function displayDivideByZero() {
  const display = document.querySelector("#display");
  display.textContent = "STOP THAT!";
  entry = 0;
  operator = undefined;
  left = 0;
  right = 0;
}

function buttonClicked(event) {
  let btnValue = event.target.innerText;
  const display = document.querySelector("#display");
  let dispText = display.innerText;

  switch (btnValue) {
    case "+":
    case "-":
    case "x":
    case "÷":
      if (operator === undefined) {
        operator = btnValue;
        left = Number(entry);
        entry = 0;
      } else {
        right = Number(entry);
        if (operator === "÷" && right === 0) {
          displayDivideByZero();
          break;
        }
        entry = operate(operator, left, right);
        displayResult(entry);
        left = entry;
        right = 0;
        entry = 0;
        operator = btnValue;
        document.getElementById("btnDec").disabled = false;
      }
      break;
    case "=":
      if (operator === undefined) {
        break;
      }
      right = Number(entry);
      entry = operate(operator, left, right);
      if (operator === "÷" && right === 0) {
        displayDivideByZero();
        break;
      }
      // Copy value to left to continue operations and clear right and operation
      left = entry;
      right = 0;
      operator = undefined;
      displayResult(entry);
      document.getElementById("btnDec").disabled = false;
      break;
    case "C":
      entry = 0;
      operator = undefined;
      left = 0;
      right = 0;
      updateDisplay(entry);
      break;
    case "+/-":
      if (dispText.charAt(0) === "-") {
        entry = dispText.substring(1);
      } else {
        entry = "-" + entry;
      }
      updateDisplay(entry);
      break;
    case "BS":
      if (entry.toString().length === 1) {
        entry = 0;
        updateDisplay(entry);
      } else {
        if (entry.charAt(entry.length - 1) == ".") {
          document.getElementById("btnDec").disabled = false;
        }
        entry = entry.substring(0, entry.length - 1);
        updateDisplay(entry);
      }
      break;
    default:
      if (entry === 0) {
        entry = btnValue;
      } else {
        entry = dispText + btnValue;
      }
      updateDisplay(entry);
      if (btnValue === ".") {
        document.getElementById("btnDec").disabled = true;
      }
      break;
  }
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach(function (currentBtn) {
  currentBtn.addEventListener("click", buttonClicked);
});
