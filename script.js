'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const rule = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelector('.how');

//Starting Condition
score0EL.textContent = 0;
score1EL.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;
diceEl.classList.add('hidden');
let scores = [0, 0],
  currentScore = 0,
  activePlayer = 0,
  playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll
    //2. Display the dice with the help of the random no.;
    //3. check it it is 1 if true switch to next player;
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Checked for the rolled 1;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game;
      playing = false; /////////////////////////////*********** playing=false****************************/
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = `PLAYER ${
        activePlayer + 1
      } WINS`;
      diceEl.classList.add('hidden');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//resetting the game
btnNew.addEventListener('click', function () {
  console.log('New Game');
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.getElementById(`name--${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});

btnsOpenModal.addEventListener('click', function () {
  console.log('Button clicked');
  //modal.style.display = 'block';
  modal.classList.remove('hidden');
  rule.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

document.addEventListener('keydown', function (event) {
  console.log(event.key);
  if (event.key === 'Escape') {
    console.log('Button clicked');
    modal.classList.add('hidden');
    rule.classList.add('hidden');
    overlay.classList.add('hidden');
  }
});
