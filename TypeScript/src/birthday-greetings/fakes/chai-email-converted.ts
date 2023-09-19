import { use as chaiUse } from 'chai'

// https://github.com/vitest-dev/vitest/blob/main/packages/expect/src/jest-extend.ts
export type FirstFunctionArgument<T> = T extends (arg: infer A) => unknown ? A : never
export type ChaiPlugin = FirstFunctionArgument<typeof chaiUse>

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

export const ChaiPluginAge: ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion

  function chainModelAge() {
    // @ts-ignore
    utils.flag(this, 'model.age', true)
  }

  function assertModelAge(this: Chai.AssertionStatic, n: number, message?: string) {
    const ssfi = utils.flag(this, 'ssfi')
    // make sure we are working with a model
    new Assertion(this._obj, message, ssfi, true).to.be.instanceof(Model)

    // make sure we have an age and its a number
    const age = this._obj.get('age')
    new Assertion(age, message, ssfi, true).to.be.a('number')

    // do our comparison
    this.assert(
      age === n,
      'expected #{this} to have age #{exp} but got #{act}',
      'expected #{this} to not have age #{act}',
      n,
      age,
    )
  }

  Assertion.addChainableMethod('age', assertModelAge, chainModelAge)
}
