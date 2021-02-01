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

  reset() {
    this.deaths = 0;
    this.points = 0;
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
  }

  addHearts() {
    for (let i = 1; i < 4; i++) {
      this.heartsAnimation = document.querySelector(`.heart:nth-child(${i})`);
      this.heartsAnimation.classList.add("fill");
    }
  }

  addSkull() {
    const skullOn = document.querySelector(".skull_container");
    skullOn.style.display = "block";
  }

  removeSkull() {
    this.reset();
    const skullOn = document.querySelector(".skull_container");
    skullOn.style.display = "none";
    this.addHearts();
  }
}
