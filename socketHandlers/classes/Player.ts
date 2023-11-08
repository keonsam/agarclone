// this is where ALL the data is stored about a given player

import PlayerConfig from "./PlayerConfig";
import PlayerData from "./PlayerData";

export default class Player {
  socketId: string;
  playerConfig: PlayerConfig;
  playerData: PlayerData;
  alive: boolean;

  constructor(
    socketId: string,
    playerConfig: PlayerConfig,
    playerData: PlayerData
  ) {
    this.socketId = socketId;
    this.playerConfig = playerConfig;
    this.playerData = playerData;
    this.alive = true;
  }
}
