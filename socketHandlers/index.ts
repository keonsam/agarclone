import { io } from "../server";
import { Settings } from "../types/Settings";
import {
  checkForOrbCollisions,
  checkForPlayerCollisions,
} from "./checkForCollision";
import Orb from "./classes/Orb";
import Player from "./classes/Player";
import PlayerConfig from "./classes/PlayerConfig";
import PlayerData from "./classes/PlayerData";

const settings: Settings = {
  defaultNumberOfOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
  defaultGenericOrbSize: 5,
};
const orbs = initGame();
const players: Player[] = [];
let player: Player;
const playersForUsers: PlayerData[] = [];
let tickTockInterval: NodeJS.Timeout;

io.on("connect", (socket) => {
  socket.on("init", (playerObj, callback) => {
    if (players.length === 0) {
      tickTockInterval = setInterval(() => {
        io.to("game").emit("tick", playersForUsers);
      }, 33);
    }

    socket.join("game");

    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerObj.playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);
    players.push(player);
    playersForUsers.push(playerData);
    callback({ orbs, index: playersForUsers.length - 1 });
  });

  socket.on("tock", (position) => {
    if (!player) {
      return;
    }

    const speed = player.playerConfig.speed;
    const xV = (player.playerConfig.xVector = position.xVector);
    const yV = (player.playerConfig.yVector = position.yVector);

    //if player can move in the x, move
    if (
      (player.playerData.locX > 5 && xV < 0) ||
      (player.playerData.locX < settings.worldWidth && xV > 0)
    ) {
      player.playerData.locX += speed * xV;
    }
    //if player can move in the y, move
    if (
      (player.playerData.locY > 5 && yV > 0) ||
      (player.playerData.locY < settings.worldHeight && yV < 0)
    ) {
      player.playerData.locY -= speed * yV;
    }

    //check for the tocking player to hit orbs
    const capturedOrbI = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings
    );
    //function returns null if not collision, an index if there is a collision
    if (capturedOrbI !== null) {
      //index could be 0, so check !null
      //remove the orb that needs to be replaced (at capturedOrbI)
      //add a new Orb
      orbs.splice(capturedOrbI, 1, new Orb(settings));

      //now update the clients with the new orb
      const orbData = {
        capturedOrbI,
        newOrb: orbs[capturedOrbI],
      };
      //emit to all sockets playing the game, the orbSwitch event so it can update orbs... just the new orb
      io.to("game").emit("orbSwitch", orbData);
      //emit to all sockets playing the game, the updateLeaderBoard event because someone just scored
      io.to("game").emit("updateLeaderBoard", getLeaderBoard());
    }

    //player collisions of tocking player
    const absorbData = checkForPlayerCollisions(
      player.playerData,
      player.playerConfig,
      players,
      playersForUsers,
      socket.id
    );
    if (absorbData) {
      io.to("game").emit("playerAbsorbed", absorbData);
      io.to("game").emit("updateLeaderBoard", getLeaderBoard());
    }
  });

  socket.on("disconnect", (reason) => {
    // console.log(reason)
    //loop through players and find the player with THIS players socketId
    //and splice that player out
    for (let i = 0; i < players.length; i++) {
      if (players[i].socketId === player.socketId) {
        //these are the droids we're looking for
        //splice the player out of the players AND playersForUsers
        players.splice(i, 1, {} as Player);
        playersForUsers.splice(i, 1, {} as PlayerData);
        break;
      }
    }
    //check to see if players is empty. If so, stop "ticking"
    if (players.length === 0) {
      clearInterval(tickTockInterval);
    }
  });
});

// initial game orbs
function initGame() {
  const arr = [];
  for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
    arr.push(new Orb(settings));
  }

  return arr;
}

function getLeaderBoard() {
  const leaderBoardArray = players.map((curPlayer) => {
    if (curPlayer.playerData) {
      return {
        name: curPlayer.playerData.name,
        score: curPlayer.playerData.score,
      };
    } else {
      return {};
    }
  });
  return leaderBoardArray;
}
