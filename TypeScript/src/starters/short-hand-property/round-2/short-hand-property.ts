interface PartialCoordinates {
  latitude?: number
  longitude?: number
}

export function anyCoordinates(args: PartialCoordinates) {
  const latitude = args.latitude === undefined ? 48.858372 : args.latitude
  const longitude = args.longitude === undefined ? 2.294481 : args.longitude
  return { latitude, longitude }
}

export const anyLocation = (coordinates: { latitude: number; longitude: number }) => {
  const { latitude, longitude } = coordinates
  return {
    coordinates: {
      latitude,
      longitude,
    },
  }
}
