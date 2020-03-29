const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/f0fe0ceb10b89d1d30c67052dc98bec3/${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (body.error) {
      callback("Unable to find forecast");
    } else {
      const data = body.currently;
      callback(
        undefined,
        `It is currently ${
          data.temperature
        } degrees out. There is a ${data.precipProbability *
          100}% chance of rain. It will be ${data.summary} today.`
      );
    }
  });
};

module.exports = forecast;
