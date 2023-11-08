"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
server_1.app.get("/test", (req, res) => {
    console.log(req);
    res.json("Welcome");
});
