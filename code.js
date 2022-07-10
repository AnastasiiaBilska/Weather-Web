function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[weekDay]} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;

  cel = response.data.main.temp;

  document.querySelector("#temperature").innerHTML = Math.round(
   cel
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;


  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "35752fd152a08e3963494751b63d8392";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function push(event) {
  event.preventDefault();
  let city = document.querySelector("#result").value;
  search(city);
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
}

function changeFah (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahTemp = (cel * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahTemp);
}

function changeCel (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(cel); 
}

let currentTime = document.querySelector("#current-time");
let time = new Date();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", push);

let fah = document.querySelector("#fah");
fah.addEventListener("click", changeFah);

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", changeCel);

let cel = null;


currentTime.innerHTML = formatDate(time);

navigator.geolocation.getCurrentPosition(currentPosition);

search("New York");
