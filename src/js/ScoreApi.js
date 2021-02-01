/* eslint-disable */

export default class ScoreApi {
  constructor() {
    this.hearts = 3;
    this.points = 0;
    this.pointsContainer = document.querySelector(".points");
    this.heartsAnimation = document.querySelector(".heart");
  }

  addPoint() {
    this.points = this.points + 1;
    this.pointsContainer.textContent = this.points;
  }

  removeHeart() {
    console.log("helo");
    this.hearts--;
    this.heartsAnimation.classList.remove("fill");
    console.log(this.heartsAnimation);
  }
}
