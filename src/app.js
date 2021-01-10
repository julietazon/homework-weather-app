//seting the main date 
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


//setting the main temperature of a city
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity-value");
  let windElement = document.querySelector("#speed-value");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#main-temp-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  //forecastElement.innerHTML = forecastElement.innerHTML + 'what is inside it' 
  //or forecastElement.innerHTML +=
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

//setting search engine
function search(city) {
  let apiKey = "5673b1e9ab29a14a350998bfbcaef49f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  //setting forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

//setting the submit button
//default behavior of a button is reload the page
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//setting the fahrenheit link
//default bevavior of a link is open a new page
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  //remove active class from celsius link
  celsiusLink.classList.remove("active");
  //add active link to fahrenheit
  fahrenheitLink.classList.add("active");
  
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

//setting the celsius link
//default bevavior of a link is open a new page
function displayCelsiusTemperature(event) {
  event.preventDefault();

  //remove active class from fahrenheit link
  fahrenheitLink.classList.remove("active");
  //add active link to celsius
  celsiusLink.classList.add("active");
  
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


//GLOBAL VARIABLES (not created inside a function):

let celsiusTemperature = null;

//calling search engine function 
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//calling fahrenheit link function
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//calling celsius link function
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("São Paulo");
