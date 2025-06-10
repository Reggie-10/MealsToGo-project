require('dotenv').config();
const { mocks, addMockImage } = require("./mock");
const url = require("url");

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos?.[0]?.photo_reference;
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
      process.env.GOOGLE_API_KEY
    }`,
  ];
  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;

  // if (mock === "true") {
  //   const data = mocks[location];
  //   if (data) {
  //     data.results = data.results.map(addMockImage);
  //     return response.json(data);
  //   }
  // }

  client
    .placesNearby({
      params: {
        location: location,
        radius: 1500,
        type: "restaurant",
        key: process.env.GOOGLE_API_KEY,
      },
      timeout: 1000,
    })
    .then((res) => {
      console.log('log res '+res); // Inspect the response structure
      if (res.data && res.data.results) {
        res.data.results = res.data.results.map(addGoogleImage);
        return response.json(res.data);
      }
      throw new Error("Unexpected response structure");
    })
    .catch((e) => {
      response.status(400);
      console.error(e);
      return response.send(e.response?.data?.error_message || "An error occurred");
    });
};



// const { mocks, addMockImage } = require("./mock");
// const url = require("url");

// module.exports.placesRequest = (request, response) => {
//   const { location } = url.parse(request.url, true).query;
//   const data = mocks[location];
//   if (data) {
//     data.results = data.results.map(addMockImage);
//   }

//   response.json(data);
// };