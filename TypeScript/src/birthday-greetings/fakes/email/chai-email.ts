// https://github.com/vitest-dev/vitest/blob/main/packages/expect/src/jest-extend.ts
import { ChaiEmailTo } from './chai-email-to.js'
import { ChaiEmailFrom } from './chai-email-from.js'
import { ChaiEmailSubject } from './chai-email-subject.js'
import { ChaiEmailText } from './chai-email-text.js'
import { ChaiPlugin } from './types.js'

export const ChaiEmail: ChaiPlugin = function (chai, _utils) {
  chai.use(ChaiEmailTo)
  chai.use(ChaiEmailFrom)
  chai.use(ChaiEmailSubject)
  chai.use(ChaiEmailText)
}
