import { expect, test } from 'vitest'
import { bubbleSort } from './bubble-sort.js'
import { insertionSort } from './insertion-sort.js'
import { quickSort } from './quick-sort.js'
import { Sorter } from './sorter.js'

test('bubblesort puts array in ascending order', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort(bubbleSort, array)
  expect(array).toStrictEqual([1, 2, 3])
})

test('quicksort puts array in ascending order', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort(quickSort, array)
  expect(array).toStrictEqual([1, 2, 3])
})

test('insertionsort puts array in ascending order', () => {
  let array = [3, 1, 2]
  array = new Sorter().sort(insertionSort, array)
  expect(array).toStrictEqual([1, 2, 3])
})
