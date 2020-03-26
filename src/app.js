const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(path.join(__dirname, "../public"));
// console.log(__filename);

const app = express();
const port = process.env.port || 4000;
//Define paths for express config
const publickDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials" );

//Set up handle bar and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); //If we don't provide the path it will search for `views` folder by default
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publickDirectoryPath));

// app.get("", (req, res) => {
//   res.send("<h1>Hello Express!!</h1>");
// });

// app.get("/help", (req, res) => {
//   //res.send("Help page!!");
//   res.send([
//     {
//       name: "Partha",
//       age: 32
//     },
//     {
//       name: "Nandini",
//       age: 32
//     }
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page!</h1>");
// });

// app.get("/weather", (req, res) => {
//   //res.send("Weather page!!");
//   res.send({
//     forecast: "Its 42 degree",
//     age: "Santa clara"
//   });
// });

app.get("/product", (req, res) => {
  const {search, rating} = req.query;
  if(!search){
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/weather", (req, res) => {
  const {address} = req.query;
  if(!address){
    return res.send({
      error: "You must provide an address to check weather"
    });
  }
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    } else {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          });
        } else {
          res.send({
            forecast: forecastData,
            location,
            address
          })
        }
      });
    }
  });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Partha"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Partha"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helptext: "This is some helpfull text!!",
    name: "Partha"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found !!",
    name: "Partha"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found !!",
    name: "Partha"
  });
});

app.listen(port, () => {
  console.log("server started!!");
});
