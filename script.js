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
const anyCheckBox = document.querySelector(".input-container");


//below is the configuration when the page is reloaded
let password = "";
let passwordLength = 10;
let checkCount = 1;
//set circle strength color to grey
defaultSliderconfig();
function defaultSliderconfig(){
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength;
    uppercaseCheck.checked = 1;
}

function updateSliderValue(){
    lengthDisplay.textContent = inputSlider.value;
    passwordLength = inputSlider.value;
}
inputSlider.addEventListener('input' , updateSliderValue);

// anyCheckBox.addEventListener('click' , (event)=>{
//     if(event.target.checked){
//         checkCount++;
//         console.log(checkCount);
//     }
//     else{
//         checkCount--;
//         console.log(checkCount);
//     }
// })
uppercaseCheck.addEventListener('click' , (event)=>{
    if(uppercaseCheck.checked){
        checkCount++;
        console.log(checkCount);
    }
    else{
        checkCount--;
        console.log(checkCount);
    }
})
lowercaseCheck.addEventListener('click' , (event)=>{
    if(lowercaseCheck.checked){
        checkCount++;
        console.log(checkCount);
    }
    else{
        checkCount--;
        console.log(checkCount);
    }
})
numbersCheck.addEventListener('click' , (event)=>{
    if(numbersCheck.checked){
        checkCount++;
        console.log(checkCount);
    }
    else{
        checkCount--;
        console.log(checkCount);
    }
})
symbolsCheck.addEventListener('click' , (event)=>{
    if(symbolsCheck.checked){
        checkCount++;
        console.log(checkCount);
    }
    else{
        checkCount--;
        console.log(checkCount);
    }
})

generateBtn.addEventListener('click',function(){
    if(checkCount <= 1){
        indicator.style.backgroundColor="red";
    }
    else if(checkCount < 4){
        indicator.style.backgroundColor="yellow";
    }
    else{
        indicator.style.backgroundColor="green";
    }
})
