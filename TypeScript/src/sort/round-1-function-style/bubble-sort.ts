import { swap } from './sorter.js'

export const bubbleSort = (input: number[]) => {
  let sorted = false
  while (!sorted) {
    sorted = true
    for (let i = 0; i < input.length - 1; i++) {
      if (input[i] > input[i + 1]) {
        swap(input, i, i + 1)
        sorted = false
      }
    }
  }
  return input
}
