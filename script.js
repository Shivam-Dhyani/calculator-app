const calculatorDisplay = document.getElementById("cal-display");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Calculate first & second value depending on the operator
const calculate = {
  "+": (firstNum, secondNum) => firstNum + secondNum,
  "-": (firstNum, secondNum) => firstNum - secondNum,
  "*": (firstNum, secondNum) => firstNum * secondNum,
  "/": (firstNum, secondNum) => firstNum / secondNum,
  "=": (firstNum, secondNum) => secondNum,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

sendNumberValue = (number) => {
  // Replace current display value if first value is already entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    // If current display value is 0, then replace it, else add the number
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
};

addDecimal = () => {
  // If operator is pressed then decimal cant be added
  if (awaitingNextValue) {
    return;
  }

  // If no decimal exists, then add one
  !calculatorDisplay.textContent.includes(".") &&
    (calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`);
};

useOperator = (operator) => {
  const currValue = Number(calculatorDisplay.textContent);

  // Prevent Multiple Operators to be pressed, consequently
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // Assign 'firstValue' to 'currValue' if no Value exist
  if (!firstValue) {
    firstValue = currValue;
  } else {
    console.log(firstValue, operatorValue, currValue);
    const calculation = calculate[operatorValue](firstValue, currValue);
    calculatorDisplay.textContent = calculation;
    console.log("calculation", calculation);
    firstValue = calculation;
    // currValue = 0;
  }

  // Ready for next value to take it as input
  awaitingNextValue = true;
  operatorValue = operator;
};

// Reset Function to reset all Values
resetAll = () => {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;

  calculatorDisplay.textContent = "0";
};

// Adding Event Listeners for Numbers, Operators & Decimal Buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Event Listener for Clear Button
clearBtn.addEventListener("click", () => resetAll());
