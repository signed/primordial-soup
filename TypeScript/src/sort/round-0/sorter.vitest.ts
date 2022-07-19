import { test, expect } from 'vitest'
import { Sorter } from './sorter.js'

test('bubblesortPutsArrayInAscendingOrder', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort('bubble', array)
  expect(array).toStrictEqual([1, 2, 3])
})

test('quicksortPutsArrayInAscendingOrder', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort('quick', array)
  expect(array).toStrictEqual([1, 2, 3])
})

test('insertionsortPutsArrayInAscendingOrder', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort('insertion', array)
  expect(array).toStrictEqual([1, 2, 3])
})
