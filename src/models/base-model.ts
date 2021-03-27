import { BaseEntity } from 'typeorm';

export abstract class BaseModel<Model> extends BaseEntity {
  /**
   * Properties to be ignored on setPropertiesFromObject
   */
  abstract getProtectedProperties(): string[];

  /**
   * Audit properties present in almost all models
   *
   * @return { string[] }
   */
  protected getAuditProperties(): string[] {
    return ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
  }

  /**
   * Returns the message to be shown on ModelNotFound error
   */
  static getNotFoundMessage(): string {
    return "The resource was either deleted or doesn't exists";
  }

  /**
   * Given an object, update all the model properties present there
   *
   * @param { Partial<Model> } properties
   *
   * @return { void }
   */
  public setPropertiesFromObject(properties: Partial<Model>): void {
    const keys = Object.keys(properties);
    const protectedProperties = this.getProtectedProperties();

    keys.forEach((key) => {
      if (protectedProperties.indexOf(key) > -1) {
        return;
      }

      this[key] = properties[key];
    });
  }
}
