import { expect, test } from 'vitest'
import { Sorter } from './sorter.js'

test('bubblesort puts array in ascending order', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort('bubble', array)
  expect(array).toStrictEqual([1, 2, 3])
})

test('quicksort puts array in ascending order', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort('quick', array)
  expect(array).toStrictEqual([1, 2, 3])
})

test('insertionsort puts array in ascending order', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort('insertion', array)
  expect(array).toStrictEqual([1, 2, 3])
})
