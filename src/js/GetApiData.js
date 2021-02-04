/* eslint-disable */

import ScoreApi from "./ScoreApi.js";

export default class GetApiData {
  constructor(score = new ScoreApi()) {
    this.score = score;
    this.apiSrc = "https://dog.ceo/api";
    this.arrayOfBreeds = [];
    this.arayOfThree = [];
    this.deaths = 0;
    this.points = 0;
    this.timeLeft = 10;
    this.currentDogOnPicture = "";
    this.liElementA = document.querySelector(".a");
    this.liElementB = document.querySelector(".b");
    this.liElementC = document.querySelector(".c");
    this.pictureEL = document.querySelector(".pictureContainer__picture");
    this.backgroundEL = document.querySelector(".pictureContainer__background");
    this.timerCount = document.querySelector(".quiz__time");
    this.playAfterDeathButton = document.querySelector(".playAfterDeath");
    this.playAfterDeath();
    this.letsPlay();
  }

  winnerInfo() {
    const winnerContainer = document.querySelector(".winnerContainer");
    const playAgainButton = document.querySelector(
      ".winnerContainer__play-button"
    );
    winnerContainer.style.display = "flex";
    confetti.start();
    playAgainButton.addEventListener("click", () => {
      window.location.reload();
    });
  }

  getPointsAndWin() {
    this.points++;
    if (this.points === 10) {
      this.winnerInfo();
    }
  }

  timer() {
    setInterval(() => {
      this.timeLeft--;
      this.timerCount.textContent = this.timeLeft + " sec";
      if (this.timeLeft === 0) {
        this.timeLeft = 11;
        this.score.removeHeart();
        this.importFullListOfDogs();
        this.reset();
      }
    }, 1500);
  }

  letsPlay() {
    document.querySelector(".letsPlay").addEventListener("click", () => {
      document.querySelector(".startGame").style.display = "none";
      this.importFullListOfDogs();
      this.timer();
    });
  }

  playAfterDeath() {
    this.playAfterDeathButton.addEventListener("click", () => {
      this.score.removeSkull();
      window.location.reload();
    });
  }

  listeners() {
    this.liElementA.addEventListener("click", () => {
      if (this.liElementA.textContent === this.currentDogOnPicture) {
        this.score.addPoint();
        this.liElementA.classList.add("onClick");
        this.getPointsAndWin();
        this.reset();
        setTimeout(() => this.importFullListOfDogs(), 2000);
      } else {
        this.score.removeHeart();
        this.liElementA.classList.add("onClickFalse");
        this.reset();
        setTimeout(() => this.importFullListOfDogs(), 2000);
      }
    });
    this.liElementB.addEventListener("click", () => {
      if (this.liElementB.textContent === this.currentDogOnPicture) {
        this.score.addPoint();
        this.liElementB.classList.add("onClick");
        this.getPointsAndWin();
        this.reset();
        setTimeout(() => this.importFullListOfDogs(), 2000);
      } else {
        this.score.removeHeart();
        this.liElementB.classList.add("onClickFalse");
        this.reset();
        setTimeout(() => this.importFullListOfDogs(), 2000);
      }
    });
    this.liElementC.addEventListener("click", () => {
      if (this.liElementC.textContent === this.currentDogOnPicture) {
        this.score.addPoint();
        this.liElementC.classList.add("onClick");
        this.getPointsAndWin();
        this.reset();
        setTimeout(() => this.importFullListOfDogs(), 2000);
      } else {
        this.score.removeHeart();
        this.liElementC.classList.add("onClickFalse");
        this.reset();
        setTimeout(() => this.importFullListOfDogs(), 2000);
      }
    });
  }

  reset() {
    this.timeLeft = 11;
    document.querySelector(".quiz__answers").removeChild(this.liElementA);
    document.querySelector(".quiz__answers").removeChild(this.liElementB);
    document.querySelector(".quiz__answers").removeChild(this.liElementC);
    let a = this.liElementA;
    let b = this.liElementB;
    let c = this.liElementC;
    this.liElementA = a.cloneNode(true);
    this.liElementB = b.cloneNode(true);
    this.liElementC = c.cloneNode(true);
    document.querySelector(".quiz__answers").appendChild(this.liElementA);
    document.querySelector(".quiz__answers").appendChild(this.liElementB);
    document.querySelector(".quiz__answers").appendChild(this.liElementC);
    this.arrayOfBreeds = [];
    this.arayOfThree = [];
    setTimeout(() => this.liElementA.classList.remove("onClick"), 2000);
    setTimeout(() => this.liElementB.classList.remove("onClick"), 2000);
    setTimeout(() => this.liElementC.classList.remove("onClick"), 2000);
    setTimeout(() => this.liElementA.classList.remove("onClickFalse"), 2000);
    setTimeout(() => this.liElementB.classList.remove("onClickFalse"), 2000);
    setTimeout(() => this.liElementC.classList.remove("onClickFalse"), 2000);
  }

  importFullListOfDogs() {
    return fetch(`${this.apiSrc}/breeds/list/all`)
      .then((resp) => resp.json())
      .then((data) => data.message)
      .then((breeds) => {
        for (const breed in breeds) {
          if (breeds[breed].length === 0) {
            this.arrayOfBreeds.push(breed);
          } else {
            for (const subBreed of breeds[breed]) {
              this.arrayOfBreeds.push(`${breed} ${subBreed}`);
            }
          }
        }
        return this.arrayOfBreeds;
      })
      .then((arrayOfDogs) => {
        for (let i = 0; i < 3; i++) {
          const number = Math.floor(Math.random() * arrayOfDogs.length);
          this.arayOfThree.push(arrayOfDogs[number]);
        }
        return this.arayOfThree;
      })
      .then((arr) => {
        this.liElementA.textContent = arr[0];
        this.liElementB.textContent = arr[1];
        this.liElementC.textContent = arr[2];
        const number = Math.floor(Math.random() * 3);
        this.currentDogOnPicture = arr[number];
        return arr[number].replace(/\s/g, "/");
      })
      .then((src) => {
        return fetch(`${this.apiSrc}/breed/${src}/images`)
          .then((resp) => resp.json())
          .then((data) => data.message);
      })
      .then((src) => {
        const randomImage = Math.floor(Math.random() * src.length);
        this.pictureEL.setAttribute("src", src[randomImage]);
        this.backgroundEL.style.backgroundImage = `url("${src[randomImage]}")`;
      })
      .then(() => {
        this.listeners();
      });
  }

  displayImage() {
    this.loadImage().then((src) => this.pictureEL.setAttribute("src", src));
  }
}

const next = new GetApiData();
