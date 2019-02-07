class Player {
  constructor(name) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;
    this.gameWinner = false;
    this.currentTurn = false;
  }
  winRound() {
    console.log(this.totalScore)
    this.totalScore += this.roundScore;
    console.log(this.totalScore)
    // game.scoreUpdate();
  }
  winGame() {
    this.gameWinner = true;
    // start bonus round
  }
  resetScore() {
    this.roundScore = 0;
    // game.scoreUpdate();
  }
  buyVowel() {
    this.roundScore -= 100;
    // player chooses a vowel;
  }
}

export default Player;