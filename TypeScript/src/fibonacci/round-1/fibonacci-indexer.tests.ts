import { expect, test } from 'vitest'
import { FibonacciIndexer } from './fibonacci-indexer.js'

test.each([
  { expectedIndex: 0, fibonacci: 0 },
  { expectedIndex: 1, fibonacci: 1 },
  { expectedIndex: 3, fibonacci: 2 },
  { expectedIndex: 4, fibonacci: 3 },
  { expectedIndex: 5, fibonacci: 5 },
  { expectedIndex: 6, fibonacci: 8 },
  { expectedIndex: 7, fibonacci: 13 },
  { expectedIndex: 8, fibonacci: 21 },
  { expectedIndex: 49, fibonacci: 7778742049 },
])('return index for fibonacci number $fibonacci', ({ fibonacci, expectedIndex }) => {
  expect(new FibonacciIndexer().findIndexOf(fibonacci)).toBe(expectedIndex)
})

test('return index -1 when number not found', () => {
  expect(new FibonacciIndexer().findIndexOf(7)).toBe(-1)
})

test('there is no index for negative numbers', () => {
  expect(new FibonacciIndexer().findIndexOf(-1)).toBe(-1)
})
