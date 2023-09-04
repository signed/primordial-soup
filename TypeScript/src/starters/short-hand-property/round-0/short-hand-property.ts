export const anyLocation = (lat?: number, long?: number) => {
  return {
    coordinates: {
      latitude: lat ?? 48.858372,
      longitude: long ?? 2.294481,
    },
  }
}
