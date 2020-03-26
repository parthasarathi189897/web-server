

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

let forecastEl = document.getElementById("forecast");
let locationEl = document.getElementById("location")

weatherForm.onsubmit = (event) => {
  event.preventDefault();
  const {value} = search;
  forecastEl.innerText = "";
  locationEl.innerText = "";
  fetch(`/weather?address=${value}`).then(response => {
    return response.json();
  }).then(({forecast="", location="", error=""}) => {
    forecastEl.innerText = location;
    locationEl.innerText = forecast || error;
  }).catch(error => {
    forecastEl.innerText = error;
  });
};