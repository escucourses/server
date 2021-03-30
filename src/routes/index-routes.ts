// Internal dependencies
import { BaseRoute } from './base-route';
import { IndexController } from '../controllers/index-controller';

export class IndexRoutes extends BaseRoute<IndexController> {
  constructor() {
    super(IndexController);
  }

  public config(): void {
    this.uri = '';

    this.get();
  }

  public get() {
    this.router.get(this.uri, this.controller.get);
  }
}
