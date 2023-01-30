const calculatorDisplay = document.getElementById("cal-display");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

sendNumberValue = (number) => {
  const displayValue = calculatorDisplay.textContent;
  // If current display value is 0, then replace it with number, else append that value to the display value.
  calculatorDisplay.textContent =
    displayValue === "0" ? number : displayValue + number;
};

addDecimal = () => {
  !calculatorDisplay.textContent.includes(".") &&
    (calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`);
};

// Adding Event Listeners for Numbers, Operators & Decimal Buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset Function
resetAll = () => {
  calculatorDisplay.textContent = "0";
};

// Event Listener for Clear Button
clearBtn.addEventListener("click", () => resetAll());
