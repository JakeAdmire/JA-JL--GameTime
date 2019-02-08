class Player {
  constructor(name) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;
  }
  winRound() {
    this.totalScore += this.roundScore;
  }

  resetScore() {
    this.roundScore = 0;
  }
  buyVowel() {
    this.roundScore -= 100;
  }
}

export default Player;