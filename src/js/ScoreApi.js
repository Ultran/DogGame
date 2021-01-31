/* eslint-disable */

export default class ScoreApi {
  constructor() {
    this.points = 0;
    this.pointsContainer = document.querySelector(".points");
  }

  addPoint() {
    this.points = this.points + 1;
    this.pointsContainer.textContent = this.points;
  }
}
