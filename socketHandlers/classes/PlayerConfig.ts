// This is where all the data is that no other player needs to know about

import { Settings } from "../../types/Settings";

export default class PlayerConfig {
  xVector: number;
  yVector: number;
  speed: number;
  zoom: number;
  
  constructor(settings: Settings) {
    this.xVector = 0;
    this.yVector = 0;
    this.speed = settings.defaultSpeed;
    this.zoom = settings.defaultZoom;
  }
}
