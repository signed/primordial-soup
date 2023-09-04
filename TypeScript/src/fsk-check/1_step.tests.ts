import { expect, test } from 'vitest'

type MovieTitle = 'Wall·E' | 'Terminator' | 'Fight Club' | 'Sonic the Hedgehog' | 'Sonic the Hedgehog 2'

type Movie = {
  title: MovieTitle
  minimumAge: number
}

const allowedToSeeThis = (movie: Movie, age: number) => {
  if (age >= movie.minimumAge) {
    return 'allowed'
  }
  return 'denied'
}

test('everybody can see wall e', () => {
  expect(allowedToSee(wallE(), atTheAgeOf(0))).toBe('allowed')
})

test('you have to be 16 to see sonic', () => {
  expect(allowedToSee(sonicTheHedgehog(), atTheAgeOf(5))).toBe('denied')
  expect(allowedToSee(sonicTheHedgehog(), atTheAgeOf(6))).toBe('allowed')
})

test('you have to be 16 to see sonic 2', () => {
  expect(allowedToSee(sonicTheHedgehog2(), atTheAgeOf(11))).toBe('denied')
  expect(allowedToSee(sonicTheHedgehog2(), atTheAgeOf(12))).toBe('allowed')
})

test('you have to be 16 to see terminator', () => {
  expect(allowedToSee(terminator(), atTheAgeOf(15))).toBe('denied')
  expect(allowedToSee(terminator(), atTheAgeOf(16))).toBe('allowed')
})

test('you have to be 18 to see fight club', () => {
  expect(allowedToSee(fightClub(), atTheAgeOf(17))).toBe('denied')
  expect(allowedToSee(fightClub(), atTheAgeOf(18))).toBe('allowed')
})

const atTheAgeOf = (age: number) => age

const allowedToSee = (movie: Movie, age: number) => allowedToSeeThis(movie, age)

const wallE = (): Movie => ({
  title: 'Wall·E',
  minimumAge: 0,
})

const sonicTheHedgehog = (): Movie => ({
  title: 'Sonic the Hedgehog',
  minimumAge: 6,
})

const sonicTheHedgehog2 = (): Movie => ({
  title: 'Sonic the Hedgehog 2',
  minimumAge: 12,
})

const terminator = (): Movie => ({
  title: 'Terminator',
  minimumAge: 16,
})

const fightClub = (): Movie => ({
  title: 'Fight Club',
  minimumAge: 18,
})
