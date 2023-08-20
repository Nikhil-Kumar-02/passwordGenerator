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
uppercaseCheck.checked = 1;
handleSlider(); 
//set circle strength color to grey

 
//set password Length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //try applying shadow on your own
}

function getRanInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRanInteger(0,9);
}

function GenerateLowerCase(){
    return String.fromCharCode(getRanInteger(97,123))
}

function GenerateUpperCase(){
    return String.fromCharCode(getRanInteger(65,91))
}

function generateSymbol(){
    const symbols = "~`!@#$%^&*()_-+={}[]:;|><?/"
    const randNum = getRanInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked)
        hasUpper = true;
    if(lowercaseCheck.checked)
        hasLower = true;
    if(numbersCheck.checked)
        hasNum = true;
    if(symbolsCheck.checked)
        hasSym = true;

    if(hasUpper&&hasLower&&(hasNum||hasSym)&&passwordLength>=8){
        setIndicator('#0f0');
    }
    else if((hasLower|| hasUpper)&&(hasNum||hasSym)&&(passwordLength>=6)){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}

// copyBtn.addEventListener('click' , async ()=>{
//     let copiedText = await navigator.clipboard.writeText(passwordDisplay.value);
//     console.log(copiedText);
// })

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (error) {
        copyMsg.innerText = "failed";
    }
    //to make copy span visible
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

inputSlider.addEventListener('input' , (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    //special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change' , handleCheckBoxChange);
})

generateBtn.addEventListener('click' , ()=>{
    //none of the checkbox are selected
    if(checkCount<= 0){
        passwordDisplay.value = "";
        passwordLength = 0;
        handleSlider();
        setIndicator("grey");
        return;
    }

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    //lets start the journey to find new password

    //remove old password
    password = "";

    //lets put the stuff mentioned by the checkboxes
    // if(uppercaseCheck.checked){
    //     password += GenerateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += GenerateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(GenerateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(GenerateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }

    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randomIndex = getRanInteger(0,funcArr.length);
        password += funcArr[randomIndex]();
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show in ui
    passwordDisplay.value = password;

    //call the calculate strength
    calcStrength();

})

function shufflePassword(array){
    //fisher yates method
    let i = array.length;
    while (--i > 0) {
    let temp = Math.floor(Math.random() * (i + 1));
    [array[temp], array[i]] = [array[i], array[temp]];
    }
    let str = "";
    array.forEach((ele) => {
        str += ele;
    });
    return str;
}



/*

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


function randomlyGenerateUpperCase(){
    const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const index = Math.floor(Math.random()*100) % 26;
    console.log(string[index]);
    return string[index];
}
function randomlyGenerateLowerCase(){
    const string = "abcdefghijhlmnopqrstuvwxyz";
    const index = Math.floor(Math.random()*100) % 26;
    console.log(string[index]);
    return string[index];
}
function randomlyGenerateNumber(){
    const string = "0123456789";
    const index = Math.floor(Math.random()*10);
    console.log(string[index]);
    return string[index];
}
function randomlyGenerateSymbol(){
    const string = "@#$_-.?+^&";
    const index = Math.floor(Math.random()*10);
    console.log(string[index]);
    return string[index];
}

function generateRandomPassword(){
    let generatedPassword = "";
    while(generatedPassword.length < passwordLength){
        const index = Math.floor(Math.random()*10) % 4;
        if(index == 0 && uppercaseCheck.checked){
            generatedPassword += randomlyGenerateUpperCase();
        }
        if(index == 1 && lowercaseCheck.checked){
            generatedPassword += randomlyGenerateLowerCase();
        }
        if(index == 2 && numbersCheck.checked){
            generatedPassword += randomlyGenerateNumber();
        }
        if(index == 3 && symbolsCheck.checked){
            generatedPassword += randomlyGenerateSymbol();
        }
    }
    //now we have the password of required length with selected feilds ready now we just have to display it on the textarea
    passwordDisplay.value = generatedPassword;
    console.log(generatedPassword);
}

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
    generateRandomPassword();
})

*/