type Coordinates = { latitude: number; longitude: number }

const eifelTower = () => ({ latitude: 48.858372, longitude: 2.294481 })

export const anyCoordinates = (overrides: Partial<Coordinates> = {}) => {
  return {
    ...eifelTower(),
    ...overrides,
  }
}

export const anyLocation = (coordinates: Coordinates) => {
  return {
    coordinates,
  }
}
