import { ensureEmail } from './shared.js'
import { ChaiPlugin } from './types.js'

declare global {
  namespace Chai {
    interface EmailText extends Chai.Assertion {
      (text: string, message?: string): Assertion
    }

    interface Assertion {
      text: EmailText
    }
  }
}

export const ChaiEmailText: ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion

  function assertTo(this: Chai.AssertionStatic, expectedTo: string, message?: string) {
    const actual = this._obj
    ensureEmail(this, utils, actual)

    const ssfi = utils.flag(this, 'ssfi')
    const text = actual.text
    const assertTo = new Assertion(text, message, ssfi, true)
    utils.transferFlags(this, assertTo, false)
    assertTo.eq(expectedTo)
  }
  Assertion.addChainableMethod('text', assertTo)
}
