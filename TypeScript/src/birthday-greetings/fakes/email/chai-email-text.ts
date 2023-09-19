import { isEmail } from './smtp-server.js'
import { ChaiPlugin } from './chai-email.js'

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
    const ssfi = utils.flag(this, 'ssfi')

    if (!isEmail(actual)) {
      this.assert(
        false,
        'expected #{this} to be an Email but got #{act}',
        'expected #{this} to be an Email but got #{act}',
        true,
      )
      return
    }

    const text = actual.text
    const assertTo = new Assertion(text, message, ssfi, true)
    utils.transferFlags(this, assertTo, false)
    assertTo.eq(expectedTo)
  }
  Assertion.addChainableMethod('text', assertTo)
}
