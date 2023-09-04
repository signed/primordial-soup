import { expect, test } from 'vitest'

type Movie = 'Wall·E' | 'Terminator' | 'Fight Club' | 'Sonic the Hedgehog' | 'Sonic the Hedgehog 2'

const allowedToSee = (age: number, movie: Movie) => {
  if (movie === 'Wall·E') {
    return 'allowed'
  }
  if (movie === 'Sonic the Hedgehog' && age >= 6) {
    return 'allowed'
  }
  if (movie === 'Sonic the Hedgehog 2' && age >= 12) {
    return 'allowed'
  }
  if (movie === 'Terminator' && age >= 16) {
    return 'allowed'
  }
  if (movie === 'Fight Club' && age >= 18) {
    return 'allowed'
  }
  return 'denied'
}

test('everybody can see wall e', () => {
  expect(allowedToSee(0, 'Wall·E')).toBe('allowed')
})

test('you have to be 16 to see sonic', () => {
  expect(allowedToSee(5, 'Sonic the Hedgehog')).toBe('denied')
  expect(allowedToSee(6, 'Sonic the Hedgehog')).toBe('allowed')
})

test('you have to be 16 to see sonic 2', () => {
  expect(allowedToSee(11, 'Sonic the Hedgehog 2')).toBe('denied')
  expect(allowedToSee(12, 'Sonic the Hedgehog 2')).toBe('allowed')
})

test('you have to be 16 to see terminator', () => {
  expect(allowedToSee(15, 'Terminator')).toBe('denied')
  expect(allowedToSee(16, 'Terminator')).toBe('allowed')
})

test('you have to be 18 to see fight club', () => {
  expect(allowedToSee(17, 'Fight Club')).toBe('denied')
  expect(allowedToSee(18, 'Fight Club')).toBe('allowed')
})
