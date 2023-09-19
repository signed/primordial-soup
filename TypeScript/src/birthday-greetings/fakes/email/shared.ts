import { Email, isEmail } from './smtp-server.js'
import { ChaiUtils } from './types.js'

export function ensureEmail(chai: Chai.AssertionStatic, utils: ChaiUtils, actual: any): asserts actual is Email {
  const negated = utils.flag(chai, 'negate') as boolean
  if (!isEmail(actual)) {
    chai.assert(negated, 'expected an Email but got #{act}', 'expected an Email but got #{act}', 'Email', actual, false)
  }
}
