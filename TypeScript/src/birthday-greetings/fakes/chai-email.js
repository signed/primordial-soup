import { Assertion } from 'chai'
import { Model } from './chai-email-converted'

export const ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion

  function chainModelAge() {
    utils.flag(this, 'model.age', true)
  }

  function assertModelAge(n, message) {
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

  Assertion.overwriteMethod('above', function (_super) {
    return function assertAge(n) {
      if (utils.flag(this, 'model.age')) {
        const obj = this._obj

        // first we assert we are actually working with a model
        new Assertion(obj).instanceof(Model)

        // next, make sure we have an age
        new Assertion(obj).to.have.deep.nested.property('_attrs.age').a('number')

        // now we compare
        const age = obj.get('age')
        this.assert(
          age > n,
          'expected #{this} to have an age above #{exp} but got #{act}',
          'expected #{this} to not have an age above #{exp} but got #{act}',
          n,
          age,
        )
      } else {
        _super.apply(this, arguments)
      }
    }
  })

  Assertion.overwriteMethod('below', function (_super) {
    return function assertAge(n) {
      if (utils.flag(this, 'model.age')) {
        const obj = this._obj

        // first we assert we are actually working with a model
        new Assertion(obj).instanceof(Model)

        // next, make sure we have an age
        new Assertion(obj).to.have.deep.nested.property('_attrs.age').a('number')

        // now we compare
        const age = obj.get('age')
        this.assert(
          age < n,
          'expected #{this} to have an age above #{exp} but got #{act}',
          'expected #{this} to not have an age above #{exp} but got #{act}',
          n,
          age,
        )
      } else {
        _super.apply(this, arguments)
      }
    }
  })

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
