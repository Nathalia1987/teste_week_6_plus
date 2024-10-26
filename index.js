document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "b2a5adcct04b33178913oc335f405433";
  const apiUrl = "https://api.shecodes.io/weather/v1/current";
  const searchForm = document.querySelector("#search-form");

  function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    if (minutes < 10) minutes = `0${minutes}`;
    return `${day} ${hours}:${minutes}`;
  }

  function displayWeather(response) {
    const cityElement = document.querySelector("#current-city");
    const temperatureElement = document.querySelector("#current-temperature");
    const descriptionElement = document.querySelector("#weather-description");
    const humidityElement = document.querySelector("#humidity");
    const windSpeedElement = document.querySelector("#wind-speed");
    const iconElement = document.querySelector("#weather-icon");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(
      response.data.temperature.current
    );
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

    // Use provided icon URL or a fallback
    iconElement.src =
      response.data.condition.icon_url || "path/to/fallback_icon.png";
    iconElement.alt = response.data.condition.description;
  }

  function searchCity(event) {
    event.preventDefault();
    const city = document.querySelector("#search-input").value;
    axios
      .get(`${apiUrl}?query=${city}&key=${apiKey}&units=metric`)
      .then(displayWeather)
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("City not found. Please try again.");
      });
  }

  // Set date on page load
  document.querySelector("#current-date").innerHTML = formatDate(new Date());

  // Attach search event listener
  searchForm.addEventListener("submit", searchCity);
});
