import { expect, test } from 'vitest'

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
  expect(findIndexOf(fibonacci)).toBe(expectedIndex)
})

test('return index -1 when number not found', () => {
  expect(findIndexOf(7)).toBe(-1)
})

test('there is no index for negative numbers', () => {
  expect(findIndexOf(-1)).toBe(-1)
})

const findIndexOf = (fibonacci: number) => {
  if (fibonacci >= 0 && fibonacci < 2) {
    return fibonacci
  }
  let indexOfFibonacci = -1
  let currentIndex = 2
  let f = 0
  const sequence: Array<number> = [0, 1]
  while (f < fibonacci) {
    f = sequence[currentIndex - 1] + sequence[currentIndex - 2]
    if (f == fibonacci) indexOfFibonacci = currentIndex
    sequence.push(f)
    currentIndex++
  }

  return indexOfFibonacci
}
