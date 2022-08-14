function formatDate(date){
let days = ["Sunday", "Monday", "Tuesday", 
  "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[date.getDay()];
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`
}
let minute = date.getMinutes();
if (minute < 10){
  minute = `0${minute}`
}
  return `${day}, ${hour}:${minute}`;
}

let currentDate = document.querySelector("#date");
let now = new Date();
currentDate.innerHTML = formatDate(now);

function showTemperature(response){
  let temperature = document.querySelector("#temp");
  let tempRound = Math.round(response.data.main.temp);
  let showHumidity = document.querySelector("#humidity");
  let showWind= document.querySelector("#wind");
  let windRound = Math.round(response.data.wind.speed)
  temperature.innerHTML = tempRound;
  showHumidity.innerHTML = response.data.main.humidity;
  showWind.innerHTML = windRound;

}

function searchCity(event){
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let enterCity = document.querySelector("#enter-city");
  cityName.innerHTML = enterCity.value;
  let units = "metric"
  let apiKey ="8193ca299e026ed6459f4b81cdd9bf21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
};



let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity)

function showPosition(currentPosition){
    console.log(currentPosition);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = currentPosition.data.name;
  showTemperature(currentPosition);
}

function showCurrentPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric"
  let apiKey ="8193ca299e026ed6459f4b81cdd9bf21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showPosition);
}
function navigatorFunction(){
navigator.geolocation.getCurrentPosition(showCurrentPosition)
}

let buttonCurrent = document.querySelector("#buttonCurrent");
buttonCurrent.addEventListener("click", navigatorFunction);




