import { isEmail } from './smtp-server.js'
import { ChaiPlugin } from './chai-email.js'

declare global {
  namespace Chai {
    interface EmailSubject extends Chai.Assertion {
      (text: string, message?: string): Assertion
    }

    interface Assertion {
      subject: EmailSubject
    }
  }
}

export const ChaiEmailSubject: ChaiPlugin = function (chai, utils) {
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

    const subject = actual.subject
    const assertTo = new Assertion(subject, message, ssfi, true)
    utils.transferFlags(this, assertTo, false)
    assertTo.eq(expectedTo)
  }
  Assertion.addChainableMethod('subject', assertTo)
}
