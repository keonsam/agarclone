import express from "express";
import { Server } from "socket.io";

const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () =>
  console.log("Server listening on port 9000")
);

const io = new Server(expressServer);

// update
export { app, io };
