// Models
import { User } from '../../models/user';

export abstract class Authorization<Resource> {
  protected user: User;

  public can(resource: Resource, action: string): boolean {
    return this[action](resource);
  }

  public setUser(user: User) {
    this.user = user;
  }
}
