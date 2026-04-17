const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';
const TOTAL_ROUNDS = 5;

const options = [ROCK, PAPER, SCISSORS];

const PLAYER = 'Player';
const COMPUTER = 'Computer';

function getComputerChoice() {
	return options[Math.floor(Math.random() * options.length)];
}

function getOrdinal(n) {
	if (n === 1) return '1st';
	if (n === 2) return '2nd';
	if (n === 3) return '3rd';
	return `${n}th`;
}

function getPlayerChoice(round) {
	const roundOrdinal = getOrdinal(round);

	while (true) {
		const choice = prompt(
			`It is ${roundOrdinal} round of ${TOTAL_ROUNDS}!\nThe Dark AI challenges you!\nChoose your weapon: Rock, Paper, or Scissors.`,
		);

		if (choice === null) {
			const confirmExit = confirm('Do you really want to surrender?\nThe Dark AI will claim victory.');

			if (confirmExit) {
				return null;
			}

			continue;
		}

		const normalizedChoice = getNormalizedChoice(choice);

		if (normalizedChoice === '') {
			alert(
				'Emptiness cannot be a weapon.\nTry again!',
			);
			continue;
		}

		if (options.includes(normalizedChoice)) {
			return normalizedChoice;
		}

		alert(
			`That move doesn't exist in this universe.\n\nYou used forbidden weapon: ${normalizedChoice}\nTry again!`,
		);
	}
}

function getNormalizedChoice(choice) {
	const trimmedChoice = choice.trim();

	return trimmedChoice.charAt(0).toUpperCase() + trimmedChoice.slice(1).toLowerCase();
}

function getRoundResult(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		return {
			winner: null,
			message: `It is a tie! ${playerChoice} clashes with ${computerChoice} in a burst of cosmic confusion.`,
		};
	}

	if (
		(playerChoice === ROCK && computerChoice === SCISSORS) ||
		(playerChoice === PAPER && computerChoice === ROCK) ||
		(playerChoice === SCISSORS && computerChoice === PAPER)
	) {
		return {
			winner: PLAYER,
			message: `You Won! ${playerChoice} beats ${computerChoice}. Humanity survives another round.`,
		};
	}

	return {
		winner: COMPUTER,
		message: `You Lose! ${computerChoice} beats ${playerChoice}. The Dark AI grows stronger...`,
	};
}

function printWelcomeMessage() {
	console.log('========================================');
	console.log('THE BATTLE FOR EARTH HAS BEGUN');
	console.log('An evil AI has taken control of the console.');
	console.log('Your only chance is to defeat it in "Rock", "Paper", or "Scissors".');
	console.log(`Win more rounds than the machine in ${TOTAL_ROUNDS} battles to save humanity.`);
	console.log('========================================');
}

function printGameResult(playerScore, computerScore, ties) {
	console.log('\n========================================');
	console.log('FINAL RESULT');
	console.log(`Your score: ${playerScore}`);
	console.log(`Dark AI score: ${computerScore}`);
	console.log(`Ties: ${ties}`);
}

function playGame() {
	let playerScore = 0;
	let computerScore = 0;
	let ties = 0;
	let surrendered = false;

	printWelcomeMessage();

	for (let i = 0; i < TOTAL_ROUNDS; i++) {
		console.log(`\n--- Round ${i + 1} of ${TOTAL_ROUNDS} ---`);

		const computerChoice = getComputerChoice();
		const playerChoice = getPlayerChoice(i + 1);

		if (playerChoice === null) {
			surrendered = true;
			console.log('You surrendered. The Dark AI claims victory.');
			break;
		}

		const roundResult = getRoundResult(playerChoice, computerChoice);

		if (roundResult.winner === PLAYER) {
			playerScore++;
		} else if (roundResult.winner === COMPUTER) {
			computerScore++;
		} else {
			ties++;
		}

		console.log(`You chose: ${playerChoice}`);
		console.log(`The Dark AI chose: ${computerChoice}`);
		console.log(roundResult.message);
		console.log(`Score -> You: ${playerScore} | Dark AI: ${computerScore} | Ties: ${ties}`);
	}

	if (surrendered) {
		console.log('The Dark AI wins. Humanity has been reduced to pop-up windows...');
	} else {
		printGameResult(playerScore, computerScore, ties);

		if (playerScore > computerScore) {
			console.log('You defeated the Dark AI. Peace returns to the console kingdom!');
		} else if (playerScore < computerScore) {
			console.log('The Dark AI wins. Humanity has been reduced to pop-up windows...');
		} else {
			console.log('It is a tie. The universe remains unstable. A rematch may be required.');
		}
	}

	return confirm('Do you want to challenge the Dark AI again?');
}

function runGameLoop() {
	let playAgain = true;

	while (playAgain) {
		playAgain = playGame();
	}

	console.log('========================================');
	console.log('The Dark AI watches as you walk away... For now.');
}

alert('The Dark AI is waiting in the console.\nOpen it now, or play without seeing the battle.');
runGameLoop();
