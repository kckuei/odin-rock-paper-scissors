function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    randomInt = getRandomRangeInt(1, choices.length);
    return choices[randomInt - 1];
}

function getRandomRangeInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function parseInput(string) {
    string = string.toLowerCase();
    return string[0].toUpperCase() + string.slice(1);
}

function playRound(playerSelection, computerSelection) {

    playerSelection = parseInput(playerSelection);
    computerSelection = parseInput(computerSelection);

    let matrix = {
        'Rock': {
            'Rock': 'tie',
            'Paper': 'lose',
            'Scissor': 'win'
        },
        'Paper': {
            'Rock': 'win',
            'Paper': 'tie',
            'Scissor': 'lose'
        },
        'Scissors': {
            'Rock': 'lose',
            'Paper': 'win',
            'Scissor': 'tie'
        },
    };

    if (matrix[playerSelection][computerSelection] === 'win') {
        return `You Win!  ${playerSelection} beats ${computerSelection}`;
    } else if (matrix[playerSelection][computerSelection] === 'lose') {
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    } else {
        return 'Tie!';
    }
}

// function game(numRounds) {

//     let userWins = 0;
//     let computerWins = 0;
//     let ties = 0;

//     for (let i = 0; i < numRounds; i++) {
//         let userSelection = getUserChoice()
//         let computerSelection = getComputerChoice();
//         let result = playRound(userSelection, computerSelection);

//         console.log(`Round ${i + 1}:`)
//         console.log(result);

//         if (result.toLowerCase().includes("win")) {
//             userWins += 1;
//         } else if (result.toLowerCase().includes("lose")) {
//             computerWins += 1;
//         } else {
//             ties += 1;
//         }
//     }
// }



const buttons = Array.from(document.querySelectorAll('.button'));


const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissor = document.querySelector('.scissor');

const userTally = document.querySelector('.user-tally');
const compTally = document.querySelector('.computer-tally');

buttons.forEach(button => button.addEventListener('click', removeTransition));

for (const button of [rock, paper, scissor]) {
    button.addEventListener('click', (e) => {
        const path = e.path[0].className;
        console.log(path)

        if (path.includes('rock')) {
            userTally.innerText += 'R';
        } else if (path.includes('paper')) {
            userTally.innerText += 'P';
        } else if (path.includes('scissor')) {
            userTally.innerText += 'S';
        }

        e.target.classList.add('selected')
    })
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('selected');
}