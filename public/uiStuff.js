// set canvas width and height to window
const wWidth = window.innerWidth;
const wHeight = window.innerHeight;

const canvas = document.querySelector("#the-canvas");
const context = canvas.getContext("2d");

canvas.height = wHeight;
canvas.width = wHeight;

//  login
const player = {};
let orbs = [];
let players = [];

const loginModal = new bootstrap.Modal(document.querySelector("#loginModal"));
const spawnModal = new bootstrap.Modal(document.querySelector("#spawnModal"));

window.addEventListener("load", () => {
  loginModal.show();
});

document.querySelector(".name-form").addEventListener("submit", (e) => {
  e.preventDefault();
  player.name = document.querySelector("#name-input").value;
  document.querySelector(".player-name").innerHTML = player.name;
  loginModal.hide();
  spawnModal.show();
  console.log({ player });
});

document.querySelector(".start-game").addEventListener("click", () => {
  spawnModal.hide();
  const eleArray = Array.from(document.querySelectorAll(".hiddenOnStart"));
  eleArray.forEach((el) => {
    el.removeAttribute("hidden");
  });
  init();
});
