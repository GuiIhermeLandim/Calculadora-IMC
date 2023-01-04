// IMC DATA
const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Abaixo do Peso",  
        obesity: "0",    
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",  
        obesity: "0",    
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25 e 29,9",
        info: "Sobrepeso",  
        obesity: "I",    
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30 e 39.9",
        info: "Obesidade",  
        obesity: "II",    
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",  
        obesity: "III",    
    },
];

// Seleção de Elementos

const imcTable = document.querySelector("#imc-table");
const backBtn = document.querySelector("#back-btn");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");
const imcNumber = document.querySelector("#imc-number")
const imcInfo = document.querySelector("#imc-info")
var imcSpan;
var infoSpan;

// Funções

function createTable (data) {
    data.forEach((item) => {

        const div = document.createElement("div")
        div.classList.add("table-data")
        

        const classification = document.createElement("p")
        classification.innerText = item.classification;

        const info = document.createElement("p")
        info.innerText = item.info;

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);
        imcTable.appendChild(div);

    })
}

function calcImc(weight, height){
    const imc = (weight/ ( height * height )).toFixed(1);
    return imc;
}

function updateContainer(imc, data) {


    imcSpan = document.createElement("span")
    imcSpan.innerText = imc


    infoSpan = document.createElement("span")

    imcNumber.appendChild(imcSpan);
    imcInfo.appendChild(infoSpan);
    data.forEach( (item) => {
        if(imc >= item.min && imc <= item.max) {
            infoSpan.innerText = item.info
        } 
    } )

}

// Inicialização

createTable(data);

// Eventos

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    heightInput.value = "";
    weightInput.value = "";
});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(weightInput.value == "" || heightInput.value == "") {
        
    } else{
        calcContainer.classList.add("hide")
        resultContainer.classList.remove("hide")

        const weight = +weightInput.value.replace(",", ".")
        const height = +heightInput.value.replace(",", ".")    
        const imc = calcImc(weight, height);
        updateContainer(imc, data);
    };
    

    
});

backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    calcContainer.classList.remove("hide")
    resultContainer.classList.add("hide")

    imcNumber.removeChild(imcSpan);
    imcInfo.removeChild(infoSpan);
})