const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");


//below is the configuration when the page is reloaded
let password = "";
let passwordLength = 10;
let checkCount = 1;
//set circle strength color to grey
defaultSliderconfig();
function defaultSliderconfig(){
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength;
}

function updateSliderValue(){
    lengthDisplay.textContent = inputSlider.value;
    passwordLength = inputSlider.value;
}
inputSlider.addEventListener('input' , updateSliderValue);

