
const resultTableEl = document.getElementById('resultTable');
let resultEl = document.getElementById("resultEl");
let resultTextEl = document.getElementById("resultTextEl");

(function () {
    let getResult = JSON.parse(localStorage.getItem("result"));
    if (getResult) {

        resultTextEl.innerHTML = "The Result Below";
        resultEl.innerHTML = `${getResult[0]} | ${getResult[1]} | ${getResult[2]} | ${getResult[3]} | ${getResult[4]} | ${getResult[5]}`
    } else {
        resultEl.innerHTML = "01: 30 PM";
        resultTextEl.innerHTML = "Result will be published at";
    }

}())



let allNumbers = [];
for (let k = 1; k <= 40; k++)
    allNumbers.push(k);

//Search for selected numbers by the users
function linearSearch(arr) {
    for (let i = 0; i < allNumbers.length; i++) {
        if (arr == allNumbers[i])
            allNumbers[i] = 0;
    }
}

const selectedDimNumbers = JSON.parse(localStorage.getItem("myBets"));

for (let row = 0; row < selectedDimNumbers.length; row++) {
    for (let col = 0; col < selectedDimNumbers[row].length - 1; col++) {
        linearSearch(selectedDimNumbers[row][col]);
    }
}

function generateRandomResult(nums) {
    let randomIndex = Math.floor(1 + Math.random() * 39);
    let numberGenerated = nums[randomIndex];
    return numberGenerated;
}

// Function to determine the result, using returned index from generateRandomResult() function
function finalResult() {
    let numbersResulted = [];
    while (numbersResulted.length < 6) {
        let number = generateRandomResult(allNumbers);
        if (number !== 0)
            numbersResulted.push(number);
        else
            number = generateRandomResult(allNumbers);
    }

    let strNumber = numbersResulted.map(element => {
        return element.toString();
    });

    return strNumber;
}

function eliminateDuplicateNumbers(rawResult) {
    let result = [];


    rawResult.filter(element => {

        if (!result.includes(element)) {
            result.push(element);
        } else {

            addNewValue(result);
        }
    });


    while (result.length < 6) {
        addNewValue(result);
    }

    let finalResult = result.map((num) => {
        return parseInt(num);
    })

    return finalResult;
}


function addNewValue(result) {

    let number = Math.floor(1 + Math.random() * 39);
    let strnum = number.toString();

    if (!result.includes(strnum)) {
        result.push(strnum);
    } {
        number = Math.floor(1 + Math.random() * 39);
        strnum = number.toString();
    }
}

let hEl = document.getElementById("h");
let mEl = document.getElementById("m");
let sEl = document.getElementById("s");


function runTime() {
    let currentDate = new Date();

    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    (hours < 10) ? hEl.innerHTML = `0${hours}: ` : hEl.innerHTML = hours + ":";
    (minutes < 10) ? mEl.innerHTML = `0${minutes}: ` : mEl.innerHTML = minutes + ":";
    (seconds < 10) ? sEl.innerHTML = `0${seconds} ` : sEl.innerHTML = seconds;


    if (hours == 11 && minutes == 25 && seconds < 1) {
        let final = finalResult();
        let data = eliminateDuplicateNumbers(final);
        localStorage.setItem("result", JSON.stringify(data));

        setTimeout(() => {

            let dataFromStorage = JSON.parse(localStorage.getItem("result"));
            displayResult(dataFromStorage);

        }, 5000);
    }

}

setInterval(runTime, 1000);


function displayResult(data) {

    let template = '';
    template += `
               <tr>
                    <th>${data[0]}</th>
                     <th>${data[1]}</th>
                      <th>${data[2]}</th>
                       <th>${data[3]}</th>
                        <th>${data[4]}</th>
                         <th class="bonusNumber">${data[5]}</th>
                </tr>
            `
    nameHtml.innerHTML = template;
}

function releaseResult(hour, minute) {

    if (hour == 1 && minute == 30) {

        setTimeout(function () {

        }, 5000);

    }
}


function determineWiners() {

    //Literate through the array of result to check 

}

function winOrLost(result) {

    return (result) ? "Win" : "Lost";
}

console.log(winOrLost(false));


