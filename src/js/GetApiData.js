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
    this.currentDogOnPicture = "";
    this.liElementA = document.querySelector(".a");
    this.liElementB = document.querySelector(".b");
    this.liElementC = document.querySelector(".c");
    this.pictureEL = document.querySelector(".dogPicture");
    this.playAfterDeathButton = document.querySelector(".playAfterDeath");
    this.playAfterDeath();
  }

  playAfterDeath() {
    this.playAfterDeathButton.addEventListener("click", () => {
      this.score.removeSkull();
      this.importFullListOfDogs();
    });
  }

  listeners() {
    this.liElementA.addEventListener("click", () => {
      if (this.liElementA.textContent === this.currentDogOnPicture) {
        this.score.addPoint();
        this.liElementA.classList.add("onClick");
        setTimeout(() => this.importFullListOfDogs(), 5000);
      } else {
        this.score.removeHeart();
      }
    });
    this.liElementB.addEventListener("click", () => {
      if (this.liElementB.textContent === this.currentDogOnPicture) {
        this.score.addPoint();
        this.liElementB.classList.add("onClick");
        setTimeout(() => this.importFullListOfDogs(), 5000);
      } else {
        this.score.removeHeart();
      }
    });
    this.liElementC.addEventListener("click", () => {
      if (this.liElementC.textContent === this.currentDogOnPicture) {
        this.score.addPoint();
        this.liElementC.classList.add("onClick");
        setTimeout(() => this.importFullListOfDogs(), 5000);
      } else {
        this.score.removeHeart();
      }
    });
  }

  reset() {
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
    this.liElementA.classList.remove("onClick");
    this.liElementB.classList.remove("onClick");
    this.liElementC.classList.remove("onClick");
  }

  importFullListOfDogs() {
    this.reset();
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
      })
      .then(() => this.listeners());
  }

  displayImage() {
    this.loadImage().then((src) => this.pictureEL.setAttribute("src", src));
  }
}

const next = new GetApiData();
next.importFullListOfDogs();
