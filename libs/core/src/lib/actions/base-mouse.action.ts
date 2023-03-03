import { BaseAction } from './base.action';

export class BaseMouseAction extends BaseAction {
  mouseX: number;
  mouseY: number;

  constructor(mouseX: number, mouseY: number) {
    super();
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }
}
