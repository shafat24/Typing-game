const typingText = document.querySelector(".typing-text p");

const input = document.querySelector(".wrapper .input-field");

const time = document.querySelector(".time span b");

const mistakes = document.querySelector(".mistake span");

const wpm = document.querySelector(".wpm span");

const cpm = document.querySelector(".cpm span")

const btn = document.querySelector("button")

//set values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake =0;
let isTyping =false;

function loadParagraph(){
    const paragraph = ["Bright stars twinkled in the night sky.",
    "Waves gently lapped against the sandy shore.",
    "The cat slept peacefully on the warm couch.",
    "A soft breeze rustled the autumn leaves.",
    "The clock ticked quietly in the empty room.",
    "Children played happily in the sunny park.",
    "Raindrops tapped softly on the window pane.",
    "Freshly baked bread filled the kitchen with aroma."];

    const randomIndex = Math.floor(Math.random()*paragraph.length);

    typingText.innerHTML='';
    for(const char of paragraph[randomIndex]){
        console.log(char);
    typingText.innerHTML += `<span>${char}</span>`
    }
    typingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown",()=>
        input.focus()
    )
    typingText.addEventListener("click",()=>input.focus())
}

// handle user input 

function initTyping(){
 const char = typingText.querySelectorAll('span');
 const typedChar = input.value.charAt(charIndex);
 if(charIndex < char.length && timeLeft > 0){

    if(!isTyping){
        timer = setInterval(initTime,1000);
        isTyping=true;
    }
    if(char[charIndex].innerText === typedChar){
        char[charIndex].classList.add("correct")
       console.log('correct');
           
    }

    else{
        mistake++;
        char[charIndex].classList.add("incorrect");
        console.log('incorrect');
        
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakes.innerText =mistake;
    cpm.innerText = charIndex - mistake;   
 }
 else{
    clearInterval(timer);
    input.value ="";

 }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText = timeLeft;
        const wpmVal = Math.round(((charIndex - mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText =wpmVal;
    }
    else{
        clearInterval(timer)
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText =timeLeft;
    input.value = "";
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText =0;
    mistakes.innerText=0;
}
input.addEventListener('input',initTyping);

btn.addEventListener("click",reset)
loadParagraph();