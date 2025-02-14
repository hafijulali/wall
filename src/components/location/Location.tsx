export const getGeolocation = (): Promise<GeolocationCoordinates> => {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (err) => {
        reject(`Error: ${err.message}`);
      }
    );
  });
};

export const isUserWithinRadius = (
  fixedLocation: { latitude: number; longitude: number },
  userLat: number,
  userLon: number,
  radius: number
): boolean => {
  const distance = haversine(
    userLat,
    userLon,
    fixedLocation.latitude,
    fixedLocation.longitude
  );
  console.log(radius);
  return distance <= radius;
};


const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const RADIUS_OF_EARTH = 6371;
  const toRadians = (degree: number) => degree * (Math.PI / 180);
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RADIUS_OF_EARTH * c;
};
