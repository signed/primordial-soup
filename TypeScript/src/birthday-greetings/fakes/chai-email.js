import { Assertion } from 'chai'
import { Model } from './chai-email-converted'

export const ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion

  Assertion.overwriteProperty('ok', function (_super) {
    return function checkModel() {
      const obj = this._obj
      if (obj && obj instanceof Model) {
        const negate = utils.flag(this, 'negate')
        if (negate && !Object.hasOwn(obj._attrs, 'id')) {
          return
        }
        new Assertion(obj).to.have.nested.property('_attrs.id')

        const assertIdType = new Assertion(obj._attrs.id, 'model assert ok id type')
        utils.transferFlags(this, assertIdType, false) // false means don't transfer `object` flag
        assertIdType.is.a('number')
      } else {
        _super.call(this)
      }
    }
  })

  utils.addProperty(Assertion.prototype, '', function () {
    this.assert(this._obj instanceof Model, 'expected #{this} to be a Model', 'expected #{this} to not be a Model')
  })

  Assertion.addMethod('model', function (type) {
    const obj = this._obj

    // first, our instanceof check, shortcut
    new Assertion(this._obj).to.be.instanceof(Model)

    // second, our type check
    this.assert(
      obj._type === type,
      'expected #{this} to be of type #{exp} but got #{act}',
      'expected #{this} to not be of type #{act}',
      type, // expected
      obj._type, // actual
    )
  })
}
