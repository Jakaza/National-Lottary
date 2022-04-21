

import { hello } from "modula.js";

hello();



const numsBtn = document.querySelectorAll('.btn');
// const betCon = document.getElementById('betsCon');
const timeCount = document.getElementById('timeCount');
// const placeBet = document.getElementById('add');
let selectionCon = document.querySelector('.selected-inner-con');
let resultCon = document.getElementById('result');
let numberBets = document.getElementById('numBets');

let bet = [0, 0, 0];
let allBets;
let index = 0, count = 0;


(function () {

    const getAllbets = JSON.parse(localStorage.getItem('myBets'));

    if (getAllbets) {

        allBets = [...getAllbets];
        numberBets.innerHTML = allBets.length;

    } else {

        allBets = [];
    }

}())


numsBtn.forEach(numBtn => {

    numBtn.addEventListener('click', function (element) {

        const clickedId = element.currentTarget.id;
        const clickedClass = element.currentTarget.classList;

        for (let i = 0; i < bet.length; i++) {
            for (let j = i + 1; j < bet.length; j++) {
                for (let k = j + 1; k < bet.length; k++) {

                    if (bet[i] != clickedId && bet[j] != clickedId && bet[k] != clickedId) {

                        count++;

                        if (count <= 3) {
                            bet[index] = parseInt(clickedId);
                            index++;
                            // console.log(bet);

                            // console.log('count ', count);
                            clickedClass.toggle('selected')

                            break;
                        } else {
                            return false;
                        }


                    } else {
                        return false;
                    }
                }
            }
        }

        if (count == 3) {

            numsBtn.disabled = true;
            displaySelection(true, bet[0], bet[1], bet[2]);
        }


    })
});



// Create a function to show clear and add selected numbers

function displaySelection(check, ...nums) {

    if (check) {

        let template = '';

        template += `
    <div class="sub-heading">
        <h3>Your Selection</h3>
            <div class="nums global-width-margin-center">
                <span>${nums[0]}</span>
                <span>${nums[1]}</span>
                <span>${nums[2]}</span>

            </div>

                <div class="add-and-clear-btn">
                    <button id="clear">Clear</button>
                    <button id="add">Add</button>
                </div>
        </div>

    `
        selectionCon.innerHTML = template;

        const placeBet = document.getElementById('add');
        const clearBet = document.getElementById('clear');

        placeBet.addEventListener('click', function () {


            for (let i = 0; i < numsBtn.length; i++) {

                if (numsBtn[i].classList.contains('selected')) {

                    numsBtn[i].classList.toggle('selected');

                }
            }

            displaySelection(false, [])
            let tempNums = [nums[0], nums[1], nums[2]];
            bet = [0, 0, 0];
            count = 0;
            index = 0;

            allBets.push(tempNums);

            console.log(allBets);

            localStorage.setItem('myBets', JSON.stringify(allBets));

            createDataToStore(allBets);

            let all = JSON.parse(localStorage.getItem('myBets'));
            numberBets.innerHTML = all.length;



        })


        clearBet.addEventListener('click', function () {

            for (let i = 0; i < numsBtn.length; i++) {

                if (numsBtn[i].classList.contains('selected')) {

                    numsBtn[i].classList.toggle('selected');

                }
            }

            displaySelection(false, [])
            bet = [0, 0, 0];
            count = 0;
            index = 0;

        })

    } else {

        selectionCon.innerHTML = "";
    }
}

function createDataToStore(allBets) {
    let betDay = new Date().getDate();
    let betMoth = new Date().getMonth();
    let betYear = new Date().getFullYear();

    let name = `MyBet${betDay}${betMoth}${betYear}`;

    localStorage.setItem(`${name}`, JSON.stringify({
        betDay: betDay,
        betMoth: betMoth,
        betYear: betYear,
        data: [...allBets]
    }));
}

console.log(allBets);




































