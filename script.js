
function playRound(playerSelection, computerSelection) {

    //            rock paper scissor
    // rock       tie  lose  win
    // paper      win  tie   lose
    // scissor    lose  win  tie

    // A more elegant solution is to encode the decision matrix as a 2d array, 
    // e.g. with numbers 0, 1, 2 being associated with tie, lose, win
    // Create helper functions to map rock, paper, scissor to 1, 2, or 3
    // Then to look up the win/loss/win condition appropriately. 
    // Then we would only need one block of code that returns tie, lose or win.

    playerSelection = processInput(playerSelection);
    computerSelection = processInput(computerSelection);

    if (playerSelection === "Rock") {
        if (computerSelection === "Rock") {
            return 'Tie!'
        } else if (computerSelection === "Paper") {
            return `You Lose! ${computerSelection} beats ${playerSelection}`
        } else {
            return `You Win!  ${playerSelection} beats ${computerSelection}`
        }
    } else if (playerSelection === "Paper") {
        if (computerSelection === "Rock") {
            return `You Win!  ${playerSelection} beats ${computerSelection}`
        } else if (computerSelection === "Paper") {
            return 'Tie!'
        } else {
            return `You Lose! ${computerSelection} beats ${playerSelection}`
        }
    } else {
        if (computerSelection === "Rock") {
            return `You Lose! ${computerSelection} beats ${playerSelection}`
        } else if (computerSelection === "Paper") {
            return `You Win!  ${playerSelection} beats ${computerSelection}`
        } else {
            return 'Tie!'
        }
    }
}

function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    randomInt = getRandomRangeInt(1, choices.length);
    return choices[randomInt - 1]
}

function getRandomRangeInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function processInput(string) {
    string = string.toLowerCase();
    return string[0].toUpperCase() + string.slice(1)
}

function game(numRounds) {

    userWins = 0;
    computerWins = 0;
    ties = 0;

    for (let i = 0; i < numRounds; i++) {
        let userSelection = "";
        while (!["Rock", "Paper", "Scissors"].includes(userSelection)) {
            userSelection = prompt("Enter rock, paper, or scissors.", getComputerChoice());
        }
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
}

function reportWinner(userWins, computerWins, ties) {
    if (userWins > computerWins) {
        console.log(`User Wins Game! User Won ${userWins} Out of ${numRounds} Rounds! Number of Ties = ${ties}`)
    } else if (computerWins > userWins) {
        console.log(`User Lost Game! User Won ${userWins} Out of ${numRounds} Rounds! Number of Ties = ${ties}`)
    } else {
        console.log('It\'s a Tie!')
    }
}


game(5)