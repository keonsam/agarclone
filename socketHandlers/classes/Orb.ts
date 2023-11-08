import { Settings } from "../../types/Settings";

export default class Orb {
  color: string;
  locX: number;
  locY: number;
  radius: number;
  constructor(settings: Settings) {
    this.color = this.getRandomColor();
    this.locX = Math.floor(Math.random() * settings.worldWidth);
    this.locY = Math.floor(Math.random() * settings.worldWidth);
    this.radius = settings.defaultGenericOrbSize;
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 200 + 50);
    const g = Math.floor(Math.random() * 200 + 50);
    const b = Math.floor(Math.random() * 200 + 50);

    return `rgb(${r},${g},${b})`;
  }
}
