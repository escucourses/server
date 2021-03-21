import { Router } from 'express';

export abstract class BaseRoute {
  public router: Router;
  public uri: string;
  protected controller: any;

  constructor(Controller) {
    this.router = Router();

    this.controller = new Controller();

    this.config();
  }

  abstract config(): void;
}
