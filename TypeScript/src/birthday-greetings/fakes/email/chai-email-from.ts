import { isEmail } from './smtp-server.js'
import { AssertionError } from 'chai'
import { ChaiPlugin } from './chai-email.js'

declare global {
  namespace Chai {
    interface EmailFrom {
      (address: string, message?: string): Assertion
    }

    interface Assertion {
      from: EmailFrom
    }
  }
}

export const ChaiEmailFrom: ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion
  Assertion.addMethod('from', function (expectedFrom: string, message?: string) {
    const actual = this._obj
    const ssfi = utils.flag(this, 'ssfi')
    const negated = utils.flag(this, 'negate') as boolean

    if (!isEmail(actual)) {
      this.assert(
        negated,
        'expected an Email but got #{act}',
        'expected an Email but got #{act}',
        'Email',
        actual,
        false,
      )
      return
    }

    const from = actual.from
    if (from === undefined) {
      throw new AssertionError('not implemented, to undefined')
    } else if (Array.isArray(from)) {
      throw new AssertionError('not implemented, to is an array')
    } else {
      const assertTo = new Assertion(from.text, message, ssfi, true)
      utils.transferFlags(this, assertTo, false)
      assertTo.eq(expectedFrom)
    }
  })
}
