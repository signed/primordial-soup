import { Email, isEmail } from './smtp-server.js'
import { AssertionError } from 'chai'
import { ChaiPlugin } from './chai-email.js'
import ChaiUtils = Chai.ChaiUtils

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

function ensureEmail(chai: Chai.AssertionStatic, utils: ChaiUtils, actual: any): asserts actual is Email {
  const negated = utils.flag(chai, 'negate') as boolean
  if (!isEmail(actual)) {
    chai.assert(negated, 'expected an Email but got #{act}', 'expected an Email but got #{act}', 'Email', actual, false)
  }
}

export const ChaiEmailFrom: ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion
  Assertion.addMethod('from', function (expectedFrom: string, message?: string) {
    const actual = this._obj
    const ssfi = utils.flag(this, 'ssfi')

    ensureEmail(this, utils, actual)

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
