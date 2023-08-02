export default function updateWeatherInfo(weatherData) {
  if (!weatherData) {
    return;
  }
  document.getElementById('weatherInfo').className = 'visible';
  document.getElementById('country').textContent = weatherData.country;
  document.getElementById('name').textContent = weatherData.name;
  document.getElementById('region').textContent =
    weatherData.region || `Not available`;

  weatherData.threeDaysForecastData.forEach((day, index) => {
    document.getElementById(`date${index + 1}`).innerText = `Date ${day.date}`;
    document.getElementById(
      `sunrise${index + 1}`
    ).textContent = `Sunrise: ${day.sunrise}`;
    document.getElementById(
      `sunset${index + 1}`
    ).textContent = `Sunset ${day.sunset}`;
    document.getElementById(
      `maxTempC${index + 1}`
    ).textContent = `Max Temp(C) ${day.maxTempC}`;
    document.getElementById(
      `minTempC${index + 1}`
    ).textContent = `Min Temp(C) ${day.minTempC}`;
    document.getElementById(
      `weatherDescription${index + 1}`
    ).textContent = `Weather Description ${day.weatherDescription}`;
    document
      .getElementById(`icon${index + 1}`)
      .setAttribute('src', `https:${day.icon}`);
  });
}
