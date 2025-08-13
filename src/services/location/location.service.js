import camelize from "camelize";


export const locationRequest = (searchTerm) => {
  return fetch(
    `${process.env.EXPO_PUBLIC_GEOCODE_URL}?city=${searchTerm}`
  ).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result) => {
  console.log(result)
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
