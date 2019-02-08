import Wheel from './Wheel.js';
import Player from './Player.js';
import Puzzle from './Puzzle.js';
import domUpdates from './domUpdates.js';
import BonusWheel from './BonusWheel.js';

class Game {
  constructor() {
    this.round = 0;
    this.players = [];
    this.currentPlayer = 0;
    this.roundWheel = null;
    this.bonusWheel = [];
    this.roundPuzzle = [];
    this.splitPuzzle = [];
  }
  createPlayers(names) {
    let thisPlayers = this.players;
    names.forEach(function(name) {
      const player = new Player(name);
      thisPlayers.push(player);
    })
  }
  newRound() {
    domUpdates.clearBoard();
    this.round++;
    this.players.forEach((player, i) => {
      player.resetScore();
      domUpdates.scoreUpdate(i, '0');
    });
    domUpdates.disableKeyboard();
    domUpdates.updateRound(this.round - 1, this.round);

    //test whetehr a bonus wheel is created
    if (this.round < 5) {
      this.roundWheel = new Wheel();      
      this.createWheel();
      this.createPuzzle();
    }
    if (this.round === 5) {
      this.bonusWheel = new BonusWheel;
      this.createPuzzle();
      this.bonusWheel.prizes.forEach(prize => {
        domUpdates.appendWheel(prize); 
      })
    } 
  }
  createWheel() {
    this.roundWheel.randomizeWheel();
    this.roundWheel.wheelElements.forEach((element) => {
      domUpdates.appendWheel(element);
    })
  }
  //test that it gives you a puzzle
  //test that chooseDiffiuclty and Rodnmixed is called
  createPuzzle() {
    this.roundPuzzle = new Puzzle
    this.roundPuzzle.chooseDifficulty();
    this.roundPuzzle.randomizePuzzle();
  }
  cyclePlayers() {
    let oldPlayer = null;
    let newPlayer = null;
    if (this.currentPlayer < 2) {
      this.currentPlayer++;
    } else {
      this.currentPlayer = 0;
    }
    this.checkScore();
    if (this.currentPlayer === 0) {
      oldPlayer = 2; newPlayer = 0
    } else if (this.currentPlayer === 1) {
      oldPlayer = 0; newPlayer = 1
    } else if (this.currentPlayer === 2) {
      oldPlayer = 1; newPlayer = 2
    }
    domUpdates.updateTurn(oldPlayer, newPlayer);
  }


  buyVowel() {
    if (this.players[this.currentPlayer].roundScore >= 100) {
      this.players[this.currentPlayer].buyVowel();
      domUpdates.toggleKeyboard();
      domUpdates.scoreUpdate(this.currentPlayer, 
        this.players[this.currentPlayer].roundScore);
    }
    domUpdates.disableBuyVowel();
  }

  checkScore() {
    if (this.players[this.currentPlayer].roundScore >= 100) {
      domUpdates.enableBuyVowel();
    }
  }

  guessLetter(e) {
    domUpdates.disableKeyboard();
    let uppercasePuzzle = this.roundPuzzle.answer.toUpperCase();
    this.splitPuzzle = uppercasePuzzle.split('');
    domUpdates.displayCorrectLetter(this.splitPuzzle, 
      e.currentTarget.innerText);
    if (uppercasePuzzle.includes(e.currentTarget.innerText)) {
      this.splitPuzzle.forEach(letter => {
        if (letter === e.currentTarget.innerText) {
          this.players[this.currentPlayer].roundScore += 
          this.roundWheel.currentSpin;
        }
      })
      domUpdates.scoreUpdate(this.currentPlayer, 
        this.players[this.currentPlayer].roundScore);
      this.checkScore();
    } else {
      this.cyclePlayers();
    }
  }

  implementWheelResults() {
    if (this.round < 5) {
      this.roundWheel.spinWheel();
      if (this.roundWheel.currentSpin === 'BANKRUPT') {
        domUpdates.disableKeyboard(); 
        this.players[this.currentPlayer].resetScore();
        domUpdates.scoreUpdate(this.currentPlayer, 
          this.players[this.currentPlayer].roundScore);
        this.cyclePlayers();
      } else if (this.roundWheel.currentSpin === 'LOSE A TURN') {
        this.cyclePlayers();
      }
    } else {
      this.bonusWheel.spinBonusWheel();
    }
  }
  endRound() {
    this.players[this.currentPlayer].winRound();
    domUpdates.totalScoreUpdate(this.currentPlayer, 
      this.players[this.currentPlayer].totalScore);
    this.players.forEach(player => {
      player.resetScore();
    });
    if (this.round === 5) {
      this.endGame();
    } else {
      this.newRound();
    }
  }
  endGame() {
    // domUpdates.removeSolvePuzzle();
    domUpdates.totalScoreUpdate(this.currentPlayer, this.players[this.currentPlayer].totalScore);
    domUpdates.displayWinGame(this.players);
  }
}

export default Game;