export const anyLocation = (latitude: number = 48.858372, longitude: number = 2.294481) => {
  return {
    coordinates: {
      latitude,
      longitude,
    },
  }
}
