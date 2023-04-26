import { expect, test } from 'vitest'
import { score } from './greed.js'

test('score of an empty list is zero', () => {
  expect(score([])).toBe(0)
})

test('score of a single roll of 5 is 50', () => {
  expect(score([5])).toBe(50)
})

test('score of a single roll of 1 is 100', () => {
  expect(score([1])).toBe(100)
})

test('score of multiple 1s and 5s is the sum of individual scores', () => {
  expect(score([1, 5, 5, 1])).toBe(300)
})

test('score of single 2s 3s 4s and 6s are zero', () => {
  expect(score([2, 3, 4, 6])).toBe(0)
})

test('score of a triple 1 is 1000', () => {
  expect(score([1, 1, 1])).toBe(1000)
})

test('score of other triples is 100x', () => {
  expect(score([2, 2, 2])).toBe(200)
  expect(score([3, 3, 3])).toBe(300)
  expect(score([4, 4, 4])).toBe(400)
  expect(score([5, 5, 5])).toBe(500)
  expect(score([6, 6, 6])).toBe(600)
})

test('score of mixed is sum', () => {
  expect(score([2, 5, 2, 2, 3])).toBe(250)
  expect(score([5, 5, 5, 5])).toBe(550)
  expect(score([1, 1, 1, 1])).toBe(1100)
  expect(score([1, 1, 1, 1, 1])).toBe(1200)
  expect(score([1, 1, 1, 5, 1])).toBe(1150)
})

test('acceptance test cases', () => {
  expect(score([2, 3, 4, 6, 2])).toEqual(0)
  expect(score([1, 5, 1, 2, 4])).toEqual(250)
  expect(score([3, 4, 5, 3, 3])).toEqual(350)
  expect(score([1, 1, 1, 5, 1])).toEqual(1150)
})
