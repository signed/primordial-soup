import { swap } from './sorter.js'

export const quickSort = (input: number[]) => {
  quicksortInternal(input, 0, input.length - 1)
  return input
}

const quicksortInternal = (input: number[], left: number, right: number): number[] => {
  const index = partition(input, left, right)
  sortLeft(left, index, input)
  sortRight(index, right, input)
  return input
}

const partition = (array: number[], left: number, right: number) => {
  let i = left,
    j = right
  const pivot = array[Math.floor((left + right) / 2)]
  i = pivotElements(array, i, j, pivot)
  return i
}

const pivotElements = (array: number[], i: number, j: number, pivot: number) => {
  while (i <= j) {
    while (array[i] < pivot) i++
    while (array[j] > pivot) j--
    if (i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }
  return i
}

const sortRight = (index: number, right: number, input: number[]) => {
  if (index < right) {
    quicksortInternal(input, index, right)
  }
}

const sortLeft = (left: number, index: number, input: number[]) => {
  if (left < index - 1) {
    quicksortInternal(input, left, index - 1)
  }
}
