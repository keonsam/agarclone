"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const Orb_1 = __importDefault(require("./Orb"));
const orbs = initGame();
function initGame() {
    const arr = [];
    for (let i = 0; i < 500; i++) {
        arr.push(new Orb_1.default());
    }
    return arr;
}
server_1.io.on("connect", (socket) => {
    socket.emit("init", orbs);
});
