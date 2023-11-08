"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.static(__dirname + "/public"));
const expressServer = app.listen(9000, () => console.log("Server listening on port 9000"));
const io = new socket_io_1.Server(expressServer);
exports.io = io;
