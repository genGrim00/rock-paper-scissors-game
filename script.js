
const score = JSON.parse(localStorage.getItem('score')) ||  {
  wins: 0,
  losses: 0,
  ties: 0

};
updateScoreElement();

/*
if(!score) {
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
}
*/

let isAutoPlaying = false;
let intervalID;

document.querySelector('.js-auto-button')
.addEventListener('click', () => {
    autoPlay();
});
  

function autoPlay(){

 let autoPlayButton = document.querySelector('.js-auto-button');

  if(!isAutoPlaying){
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayButton.innerHTML = 'Stop Playing';
  }else {
    clearInterval(intervalID);
    isAutoPlaying = false;  
    autoPlayButton.innerHTML = 'Auto Play';
  }
 
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
})  

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
})  

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
})  


document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock');
  } else if(event.key === 'p') {
    playGame('paper');
  }else if ( event.key === 's'){
    playGame('scissors');
  } else if ( event.key === 'a') {
    autoPlay();
  } else if(event.key === 'Backspace') {
    showResetConfirmation();
  }
});  

document.querySelector('.js-reset-button')
.addEventListener('click', () => {
  showResetConfirmation();
});

    
function showResetConfirmation() {
  document.querySelector('.js-confirm-message').
  innerHTML = `
  Are you sure you want to reset you score?
  <button class="js-reset-confirm-yes confirm-button">
  Yes
  </button>
  <button class="js-reset-confirm-no confirm-button">
  No
  </button>
  `;
    
  document.querySelector('.js-reset-confirm-yes').
  addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      hideResetConfirmation(); 
  });

  document.querySelector('.js-reset-confirm-no').
  addEventListener('click', () => {
    hideResetConfirmation();
  });

};

function hideResetConfirmation() {
  document.querySelector('.js-confirm-message').
  innerHTML = '';
};


function playGame(playerMove){
const computerMove = pickComputerMove();

let result = '';

if (playerMove === 'rock') {
if(computerMove === 'rock') {
result = 'Tie.';
}else if(computerMove === 'paper') {
result = 'You lose.';
}else if(computerMove === 'scissors') {
result = 'You win.';
}

} else if(playerMove === 'paper') {
if(computerMove === 'paper'){
result = 'Tie.';
}else if(computerMove === 'rock'){
result = 'You win.'
}else if(computerMove === 'scissors'){
result = 'You lose.'
}

} else if(playerMove === 'scissors') {
if(computerMove === 'rock'){
result = 'You lose.';
}else if(computerMove === 'paper') {
result = 'You win.';
}else if(computerMove === 'scissors'){
result = 'Tie.';
}
}

if(result === 'You win.') {
score.wins += 1;
}else if(result === 'You lose.'){
score.losses += 1;
} else if(result === 'Tie.') {
score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));


updateScoreElement() 

document.querySelector('.js-result')
.innerHTML = result;

document.querySelector('.js-moves')
.innerHTML = ` You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;


}



function updateScoreElement() {
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
let randomNumber = Math.floor(Math.random() * 3);

let computerMove = '';

if(randomNumber === 0 ) {
computerMove = 'rock';
} else if(randomNumber === 1) {
computerMove = 'paper';
} else if(randomNumber === 2) {
computerMove = 'scissors';
}

return computerMove;

}


function pickComputerMove() {
let randomNumber = Math.floor(Math.random() * 3);

let computerMove = '';

if(randomNumber === 0 ) {
computerMove = 'rock';
} else if(randomNumber === 1) {
computerMove = 'paper';
} else if(randomNumber === 2) {
computerMove = 'scissors';
}

return computerMove;

}
