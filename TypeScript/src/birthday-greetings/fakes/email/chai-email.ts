// https://github.com/vitest-dev/vitest/blob/main/packages/expect/src/jest-extend.ts
import { ChaiEmailTo } from './chai-email-to.js'
import { ChaiEmailFrom } from './chai-email-from.js'

export type ChaiPlugin = Chai.ChaiPlugin

export const ChaiEmail: ChaiPlugin = function (chai, _utils) {
  chai.use(ChaiEmailTo)
  chai.use(ChaiEmailFrom)
}
