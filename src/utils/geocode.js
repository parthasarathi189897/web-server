const request = require("request");
const forecast = require("./forecast");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGFydGhhc2FyYXRoaTE4OTg5NyIsImEiOiJjanQ2bWc1cjUwaWxwNDNzMGh0aWlrbnY1In0.Cl-1uMqYK7cXYOkshXas5A`;
  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (features.length === 0) {
      callback("Unable to find location, use another search");
    } else {
      const coordinates = features[0].center;
      callback(undefined, {
        longitude: coordinates[0],
        latitude: coordinates[1],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
