// declare constant and varibales;
const inputLanList = document.querySelector("#input-lan");
const outputLanList = document.querySelector("#output-lan");
const dorpdowns = document.querySelectorAll("select");
const translateBtn = document.querySelector(".translate-btn");
const inputText = document.querySelector(".input-text");
const outputText = document.querySelector(".output-text");
const speakFrom = document.querySelector("#speakFrom");
const speakTo = document.querySelector("#speakTo");
const copyFrom = document.querySelector("#copyFrom");
const copyTo = document.querySelector("#copyTo");
const lanInterChange = document.querySelector("#lanInterChange");

// append contury code to both select
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

// call api using fetch()
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

// define function which is speak the text of textarea
function spaekText(text, language){
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = language;
    synth.speak(utterThis);
}

// add click event on input speaker
speakFrom.addEventListener("click", ()=>{
    console.log(inputText.value, inputLanList.value)
    spaekText(inputText.value, inputLanList.value);
})
// add click event on output speaker
speakTo.addEventListener("click", ()=>{
    console.log(outputText.value, outputLanList.value)
    spaekText(outputText.value, outputLanList.value);
})

translateBtn.addEventListener("click", translation);
inputText.addEventListener("keydown", translation);

// add click event on input copy btn
copyFrom.addEventListener("click", ()=>{
    inputText.select();
    document.execCommand("copy");
})
// add click event on output copy btn
copyTo.addEventListener("click", ()=>{
    outputText.select();
    document.execCommand("copy");
})
// add click event on language interchange to interchange the language of both select element
lanInterChange.addEventListener("click", () => {
    let input = inputLanList.value;
    let output = outputLanList.value;
    outputLanList.value = input;
    inputLanList.value = output;
    
})