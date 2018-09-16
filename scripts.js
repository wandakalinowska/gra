var newGameBtn = document.getElementById('js-newGameButton');
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');


newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('<img src="rock.png">') });
pickPaper.addEventListener('click', function() { playerPick('<img src="paper.png">') });
pickScissors.addEventListener('click', function() { playerPick('<img src="scissors.png">') })

pickElem.style.display = 'none';

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };



function setGameElements() {

  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Play Again';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
    case 'notStarted':
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}




function newGame() {
  player.name = prompt('Your name', 'Player');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }

}

function getComputerPick() {
    var possiblePicks = ['<img src="rock.png">', '<img src="paper.png">', '<img src="scissors.png">'];
    return possiblePicks[Math.floor(Math.random()*3)];
}


function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
        playerResultElem.innerHTML = "Draw";
        computerResultElem.innerHTML = "Draw";
    } else if (
        (computerPick == '<img src="rock.png">' &&  playerPick == '<img src="scissors.png">') ||
        (computerPick == '<img src="scissors.png">' &&  playerPick == '<img src="paper.png">') ||
        (computerPick == '<img src="paper.png">' &&  playerPick == '<img src="rock.png">')) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
setGamePoints();
winnerGame();
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {

    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function winnerGame() {
	if (player.score === 10) {
		gameState = 'ended';
		setGameElements();
		
    	alert(player.name + ' win!');
    	console.log(player.name + ' win!');
    }	
    else if (computer.score === 10) {
		gameState = 'ended';

    	setGameElements();
    	alert('You lose:( Computer wins.');
    	console.log('You lose:( Computer wins.');
    }
}
