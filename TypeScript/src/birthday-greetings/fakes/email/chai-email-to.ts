import { AssertionError } from 'chai'
import { ensureEmail } from './shared.js'
import { ChaiPlugin } from './types.js'

declare global {
  namespace Chai {
    interface EmailTo extends Chai.Assertion {
      (address: string, message?: string): Assertion
    }

    interface Assertion {
      to: EmailTo
    }
  }
}

export const ChaiEmailTo: ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion

  function assertTo(this: Chai.AssertionStatic, expectedTo: string, message?: string) {
    const actual = this._obj
    ensureEmail(this, utils, actual)

    const ssfi = utils.flag(this, 'ssfi')
    const to = actual.to
    if (to === undefined) {
      throw new AssertionError('not implemented, to undefined')
    } else if (Array.isArray(to)) {
      throw new AssertionError('not implemented, to is an array')
    } else {
      const assertTo = new Assertion(to.text, message, ssfi, true)
      utils.transferFlags(this, assertTo, false)
      assertTo.eq(expectedTo)
    }
  }
  Assertion.addChainableMethod('to', assertTo)
}
