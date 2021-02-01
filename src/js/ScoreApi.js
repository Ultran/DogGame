/* eslint-disable */

export default class ScoreApi {
  constructor() {
    this.deaths = 0;
    this.points = 0;
    this.pointsContainer = document.querySelector(".points");
  }

  addPoint() {
    this.points = this.points + 1;
    this.pointsContainer.textContent = this.points;
  }

  removeHeart() {
    console.log("helo");
    this.deaths++;
    if (this.deaths === 3) {
      this.addSkull();
    }
    this.heartsAnimation = document.querySelector(
      `.heart:nth-child(${this.deaths})`
    );
    this.heartsAnimation.classList.remove("fill");
    console.log(this.heartsAnimation);
  }

  addSkull() {
    const skullOn = document.querySelector(".skull_container");
    skullOn.style.display = "block";
  }

  removeSkull() {
    const skullOn = document.querySelector(".skull_container");
    skullOn.style.display = "none";
  }
}
