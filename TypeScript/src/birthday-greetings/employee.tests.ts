import { test, expect } from 'vitest'
import { Employee } from './employee.js'
import { XDate } from './date.js'

test('birthday', () => {
  const employee = new Employee('foo', 'bar', '1990/01/31', 'a@b.c')

  expect(employee.isBirthday(XDate.fromPattern('2008/01/30'))).to.be.false
  expect(employee.isBirthday(XDate.fromPattern('2008/01/31'))).to.be.true
})
