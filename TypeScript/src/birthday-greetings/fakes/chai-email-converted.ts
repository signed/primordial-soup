// https://github.com/vitest-dev/vitest/blob/main/packages/expect/src/jest-extend.ts

/**
 * # Model
 *
 * A constructor for a simple data model
 * object. Has a `type` and contains arbitrary
 * attributes.
 *
 * @param {String} type
 */
export class Model {
  _type
  _attrs: Record<string, any>

  constructor(type: string) {
    this._type = type
    this._attrs = {}
  }

  /**
   * .set (key, value)
   *
   * Set an attribute to be stored in this model.
   */
  set(key: string, value: any) {
    this._attrs[key] = value
  }

  /**
   * .get (key)
   *
   * Get an attribute that is stored in this model.
   *
   * @param {String} key
   */
  get(key: string) {
    return this._attrs[key]
  }
}
