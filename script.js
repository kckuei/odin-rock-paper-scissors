function getComputerChoice() {
    randomInt = getRandomRangeInt(1, CHOICES.length);
    return CHOICES[randomInt - 1];
}

function getRandomRangeInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function parseInput(choice) {
    return choice[0].toUpperCase() + choice.slice(1,)
}

function playRound(playerSelection, computerSelection) {

    if (MATRIX[playerSelection][computerSelection] === 'win') {
        userScore.innerText = parseInt(userScore.innerText) + 1;
        userWins = parseInt(userScore.innerText);
        let preText = `${parseInput(playerSelection)} beats ${parseInput(computerSelection)}!`;
        return `${preText} You Win!`;
    } else if (MATRIX[playerSelection][computerSelection] === 'lose') {
        compScore.innerText = parseInt(compScore.innerText) + 1;
        compWins = parseInt(compScore.innerText);
        let preText = `${parseInput(computerSelection)} beats ${parseInput(playerSelection)}!`;
        return `${preText} You Lose!`;
    } else {
        return 'Tie!';
    }
}

function updateTallies(e) {
    // gets choices
    const userChoice = parseUserChoice(e);
    const compChoice = getComputerChoice();

    // updates the tallies
    addIconToParentTally(userChoice, userTally);
    addIconToParentTally(compChoice, compTally);

    // updates round
    roundNumber += 1;
    round.innerText = `Round ${roundNumber}`;

    // updates dash
    textBox.innerText = playRound(userChoice, compChoice);

    // check for end condition
    if (roundNumber === 5) {
        buttons.forEach(button => button.removeEventListener('click', addTransition));
        buttons.forEach(button => button.removeEventListener('click', updateTallies));
        buttons.forEach(button => {
            button.classList.add('button-gameover');
        })
        if (userWins > compWins) {
            gameOver.innerText = 'You won the best of 5!';
        } else if (compWins > userWins) {
            gameOver.innerText = 'Computer won best of 5!\n Better luck next time!';
        } else {
            gameOver.innerText = 'Draw! Try a new game!';
        }
    }
}

function startNewGame() {
    // resets game state

    roundNumber = 0;
    userWins = 0;
    compWins = 0;

    userScore.innerText = 0;
    compScore.innerText = 0;

    round.innerText = '';
    textBox.innerText = 'Choose your weapon!';

    Array.from(userTally.children).forEach(node => node.remove());
    Array.from(compTally.children).forEach(node => node.remove());

    buttons.forEach(button => button.addEventListener('click', addTransition));
    buttons.forEach(button => button.addEventListener('click', updateTallies));
    buttons.forEach(button => {
        button.classList.remove('button-gameover');
    })
    gameOver.innerText = '';
}

function parseUserChoice(e) {
    // e.path[0] gets the img
    const sourceClass = e.path[0].className;
    if (sourceClass.includes('rock')) {
        return 'rock';
    } else if (sourceClass.includes('paper')) {
        return 'paper';
    } else if (sourceClass.includes('scissor')) {
        return 'scissor';
    }
}

function addIconToParentTally(sourceClass, parent) {

    let child = document.createElement('img');
    child.classList.add('icon');

    if (sourceClass.includes('rock')) {
        child.src = './rock.png';
    } else if (sourceClass.includes('paper')) {
        child.src = './paper.png';
    } else if (sourceClass.includes('scissor')) {
        child.src = './scissor.png';
    }
    parent.appendChild(child)
}


function flipLogo(e) {
    if (e.target.innerText[0] === 'S') {
        e.target.innerText = 'Rock < Paper < Scissors';
    } else {
        e.target.innerText = 'Scissors > Paper > Rock';
    }
}

function addTransition(e) {
    e.target.classList.add('selected')
    setTimeout(() => {
        e.target.classList.remove('selected');
    }, 100)
}


let roundNumber = 0;
let userWins = 0;
let compWins = 0;
const CHOICES = ["rock", "paper", "scissor"];
const MATRIX = {
    'rock': {
        'rock': 'tie',
        'paper': 'lose',
        'scissor': 'win'
    },
    'paper': {
        'rock': 'win',
        'paper': 'tie',
        'scissor': 'lose'
    },
    'scissor': {
        'rock': 'lose',
        'paper': 'win',
        'scissor': 'tie'
    },
};

const round = document.querySelector('.round');
const userScore = document.querySelector('.user-score');
const compScore = document.querySelector('.comp-score');
const textBox = document.querySelector('.text-box');
const userTally = document.querySelector('.user-tally');
const compTally = document.querySelector('.comp-tally');
const gameOver = document.querySelector('.text-gameover');

const newGame = document.querySelector('.new-game');
newGame.addEventListener('click', startNewGame);

const buttons = Array.from(document.querySelectorAll('.container .button'));
buttons.forEach(button => button.addEventListener('click', addTransition));
buttons.forEach(button => button.addEventListener('click', updateTallies));

const logo = document.querySelector('.logo');
logo.addEventListener('click', flipLogo);


