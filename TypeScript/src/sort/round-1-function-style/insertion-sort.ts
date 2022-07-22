import { swap } from './sorter.js'

export const insertionSort = (input: number[]) => {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (input[j] < input[j - 1]) {
        swap(input, j, j - 1)
      }
    }
  }
  return input
}
