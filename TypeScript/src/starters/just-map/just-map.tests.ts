import { expect, test } from 'vitest'

const evaluate = (operations: string[]) => operations.map(trim).map(split).map(transform).map(solve)

type Addition = {
  type: 'addition'
  augend: number
  addend: number
}

type Multiplication = {
  type: 'multiplication'
  multiplier: number
  multiplicand: number
}

type ArithmeticOperation = Addition | Multiplication

const trim = (line: string) => line.trim().replace(/\s/g, '')
const split = (line: string) => line.split('')
const transform = (parts: string[]): ArithmeticOperation => {
  if (parts[1] === '*') {
    return {
      type: 'multiplication',
      multiplier: Number.parseInt(parts[0], 10),
      multiplicand: Number.parseInt(parts[2], 10),
    }
  }
  return {
    type: 'addition',
    augend: Number.parseInt(parts[0], 10),
    addend: Number.parseInt(parts[2], 10),
  }
}
const solve = (operation: ArithmeticOperation) => {
  switch (operation.type) {
    case 'addition':
      return { ...operation, result: operation.augend + operation.addend }
    case 'multiplication':
      return { ...operation, result: operation.multiplier * operation.multiplicand }
  }
}

test('addition', () => {
  const operation = evaluate([' 1+1'])[0]
  expect(operation.result).toEqual(2)
})

test('multiplication', () => {
  expect(evaluate([' 7 * 5 '])[0].result).toEqual(35)
})

test('trim', () => {
  expect(trim(' re place all')).toEqual('replaceall')
})
