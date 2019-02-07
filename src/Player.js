class Player {
  constructor(name) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;
    this.gameWinner = false;
    this.currentTurn = false;
  }
  winRound() {
    this.totalScore += this.roundScore;
  }
  winGame() {
    this.gameWinner = true;
  }
  resetScore() {
    this.roundScore = 0;
  }
  buyVowel() {
    this.roundScore -= 100;
  }
}

export default Player;