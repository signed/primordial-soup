// https://github.com/vitest-dev/vitest/blob/main/packages/expect/src/jest-extend.ts
import { isEmail } from './smtp-server.js'
import { AssertionError } from 'chai'

export type ChaiPlugin = Chai.ChaiPlugin

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

export const ChaiEmail: ChaiPlugin = function (chai, utils) {
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

  Assertion.addMethod('from', function (expectedFrom: string, message?: string) {
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
