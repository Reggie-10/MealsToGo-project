import camelize from "camelize";


export const locationRequest = (searchTerm) => {
  return fetch(
    `https://us-central1-mealstogo-65d1f.cloudfunctions.net/geocode?city=${searchTerm}`
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
