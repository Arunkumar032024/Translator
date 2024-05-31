const inputLanList = document.querySelector("#input-lan");
const outputLanList = document.querySelector("#output-lan");
const dorpdowns = document.querySelectorAll("select");
const translateBtn = document.querySelector(".translate-btn");
const inputText = document.querySelector(".input-text");
const outputText = document.querySelector(".output-text");
const speakFrom = document.querySelector("#speakFrom");
const speakTo = document.querySelector("#speakTo");

for(let select of dorpdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = countryList[currCode];
        newOption.value = currCode;
        if(select.name === 'from' && currCode === "en-GB"){
            newOption.selected = 'selected';
        }else if(select.name === 'to' && currCode === "hi-IN"){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
}

async function translation(){
    let text = inputText.value;
    let translateFrom = inputLanList.value;
    let translateTo = outputLanList.value;
    if(text !== ""){
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        let response = await fetch(apiUrl);
        let dataParse = await response.json();
        outputText.innerText = dataParse.responseData.translatedText;
    }else{
        outputText.innerText = "Translation...";
    }
    
}

function spaekText(text, language){
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text);
    console.log(voices)
    utterThis.lang = language;
    synth.speak(utterThis);
}

speakFrom.addEventListener("click", ()=>{
    console.log(inputText.value, inputLanList.value)
    spaekText(inputText.value, inputLanList.value);
})
speakTo.addEventListener("click", ()=>{
    console.log(outputText.value, outputLanList.value)
    spaekText(outputText.value, outputLanList.value);
})

translateBtn.addEventListener("click", translation);
inputText.addEventListener("keydown", translation);