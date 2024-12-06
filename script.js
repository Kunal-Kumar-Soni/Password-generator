// Get elements from the DOM
const passwordLength = document.getElementById("rangeInput");
const rangeVal = document.getElementById("value");
const btnEl = document.getElementById("btn");
const clipboard = document.getElementById("clipboard");
const lowerCasesEl = document.getElementById("lowercase");
const upperCasesEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("number");
const symbolsEl = document.getElementById("symbol");
const resultEl = document.getElementById("result");

// Define character sets
const lowerCases = "abcdefghijklmnopqrstuvwxyz";
const upperCases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_|;:'\",./?~`";

// Set default checkbox state
lowerCasesEl.checked = true;

// Update range value display when the range input changes
passwordLength.addEventListener("input", () => {
  rangeVal.textContent = passwordLength.value;
});

// Function to generate password
function passGenerator() {
  clipboard.textContent = "";
  resultEl.value = "";

  let availableChars = "";
  if (lowerCasesEl.checked) availableChars += lowerCases;
  if (upperCasesEl.checked) availableChars += upperCases;
  if (numbersEl.checked) availableChars += numbers;
  if (symbolsEl.checked) availableChars += symbols;

  if (availableChars === "") {
    resultEl.value = "Select at least one option!";
    return;
  }

  for (let i = 0; i < passwordLength.value; i++) {
    const input = Math.floor(Math.random() * availableChars.length);
    resultEl.value += availableChars[input];
  }
}

// Function to copy generated password to clipboard
function copyToClipboard() {
  navigator.clipboard
    .writeText(resultEl.value)
    .then(() => {
      clipboard.textContent = "Copied to clipboard!";
      resultEl.value = "";
      setTimeout(() => (clipboard.textContent = ""), 2000);
    })
    .catch((err) => (clipboard.textContent = "Failed to copy: " + err));
}

// Add event listener to generate password on button click
btnEl.addEventListener("click", passGenerator);

// Add event listener to copy password to clipboard on result click
resultEl.addEventListener("click", copyToClipboard);
