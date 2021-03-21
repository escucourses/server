// Libraries
import { Router } from 'express';

// Internal dependencies
import { BaseRoute } from './base-route';
import { IndexController } from '../controllers/index-controller';

export class IndexRoutes extends BaseRoute {
  uri = '';
  protected controller: IndexController;

  constructor() {
    super(IndexController);
  }

  public config(): void {
    this.get();
  }

  public get() {
    this.router.get('/', this.controller.get);
  }
}
