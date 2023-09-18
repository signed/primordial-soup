import { test, expect } from 'vitest'
import { XDate } from './date.js'

test('consistent zero based behaviour', () => {
  const date = XDate.fromPattern('1789/01/24')
  expect(date.getMonth()).toBe(1)
  expect(date.getDay()).toBe(24)
})

test('isSameDay', () => {
  const date = XDate.fromPattern('1789/01/24')
  const sameDay = XDate.fromPattern('2001/01/24')
  const notSameDay = XDate.fromPattern('1789/01/25')
  const notSameMonth = XDate.fromPattern('1789/02/25')

  expect(date.isSameDay(sameDay)).to.be.true
  expect(date.isSameDay(notSameDay)).to.be.false
  expect(date.isSameDay(notSameMonth)).to.be.false
})
