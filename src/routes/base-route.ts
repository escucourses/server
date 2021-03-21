import { Router } from 'express';

export abstract class BaseRoute<Controller> {
  public router: Router;
  public uri: string;
  protected controller: Controller;

  constructor(Controller) {
    this.router = Router();

    this.controller = new Controller();

    this.config();
  }

  abstract config(): void;
}
