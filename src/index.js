function updateTime() {
  let now = new Date();

  let day = now.getDay();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let time = document.querySelector("#time");
  time.innerHTML = `${days[day]} ${hours}:${minutes}`;
}
setInterval(updateTime, 1000);

let apiKey = "0ebc654fccbc00189d5408f3d6f15b08";

let cityInput = document.querySelector("#city-input");
let currentCity = document.querySelector("#cityName");
let currentTemp = document.querySelector("#currentTemp");
let search = document.querySelector("#searchField");
let currentLocation = document.querySelector("#currentPos");
let feelsLike = document.querySelector("#feels-like");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let weatherDescription = document.querySelector("#weather-description");
let weatherIcon = document.querySelector("#weather-icon");

function changeCity(event) {
  event.preventDefault();
  if (!cityInput.value) {
    alert("Please enter a city");
  }
  currentCity.innerHTML = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = temperature;
  currentCity.innerHTML = response.data.name;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  weatherDescription.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].main}`);
  celsiusTemp = response.data.main.temp;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Converting C to F

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", convertToF);

let backToCelsius = document.querySelector("#celsius");
backToCelsius.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  let newTemp = parseInt(currentTemp.innerHTML);
  let fahrenheitConversion = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitConversion);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}

function convertToC(event) {
  event.preventDefault();
  if (celsiusTemp === null) {
    celsiusTemp = parseInt(currentTemp.innerHTML);
  }
  currentTemp.innerHTML = Math.round(celsiusTemp);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsiusTemp = null;

// Search
search.addEventListener("submit", changeCity);
currentLocation.addEventListener("click", currentPosition);

// Making Stavanger default
function showStavanger(response) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stavanger&units=metric&appid=0ebc654fccbc00189d5408f3d6f15b08`;
  axios.get(apiUrl).then(showTemperature);
}

window.onload = showStavanger;
