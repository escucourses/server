// Models
import { User } from '../../models/user';

export abstract class Authorization<Resource> {
  protected user: User;

  /**
   * Determines if an user can perform a given action against a resource
   *
   * @param { Resource } resource
   * @param { string } action
   *
   * @return { boolean | Promise<boolean> }
   */
  public can(resource: Resource, action: string): boolean | Promise<boolean> {
    return this[action](resource);
  }

  /**
   * Set the user performing the action
   *
   * @param { User } user
   *
   * @return { Authorization<Resource> }
   */
  public setUser(user: User): Authorization<Resource> {
    this.user = user;

    return this;
  }
}
