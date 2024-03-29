import { expect, test } from 'vitest'
import { anyCoordinates, anyLocation } from './short-hand-property.js'

test('default to the eifel tower', () => {
  const { coordinates } = anyLocation(anyCoordinates({}))
  expect(coordinates.latitude).toEqual(48.858372)
  expect(coordinates.longitude).toEqual(2.294481)
})

test('override latitude', () => {
  const { coordinates } = anyLocation(anyCoordinates({ latitude: 13.412469 }))
  expect(coordinates.latitude).toEqual(13.412469)
  expect(coordinates.longitude).toEqual(2.294481)
})

test('override longitude', () => {
  const { coordinates } = anyLocation(anyCoordinates({ latitude: undefined, longitude: 103.866989 }))
  expect(coordinates.latitude).toEqual(48.858372)
  expect(coordinates.longitude).toEqual(103.866989)
})
