function getUserChoice() {
    let userSelection = "";
    do {
        userSelection = prompt("Enter rock, paper, or scissor.", getComputerChoice());
    } while (!["Rock", "Paper", "Scissor"].includes(userSelection))
    return userSelection;
}


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

    // decision matrix
    //            rock paper scissors
    // rock       tie  lose  win
    // paper      win  tie   lose
    // scissors   lose  win  tie
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

function game(numRounds) {

    let userWins = 0;
    let computerWins = 0;
    let ties = 0;

    for (let i = 0; i < numRounds; i++) {
        let userSelection = getUserChoice()
        let computerSelection = getComputerChoice();
        let result = playRound(userSelection, computerSelection);

        console.log(`Round ${i + 1}:`)
        console.log(result);

        if (result.toLowerCase().includes("win")) {
            userWins += 1;
        } else if (result.toLowerCase().includes("lose")) {
            computerWins += 1;
        } else {
            ties += 1;
        }
    }

    reportWinner(userWins, computerWins, ties, numRounds);
}

function reportWinner(userWins, computerWins, ties, numRounds) {
    if (userWins > computerWins) {
        console.log(`User Wins Game! User Won ${userWins} Out of ${numRounds} Rounds! Number of Ties = ${ties}`);
    } else if (computerWins > userWins) {
        console.log(`User Lost Game! User Won ${userWins} Out of ${numRounds} Rounds! Number of Ties = ${ties}`);
    } else {
        console.log('It\'s a Tie!');
    }
}


game(5);