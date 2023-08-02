let weatherTemperature = [];

function handleClick() {
  weatherTemperature.forEach((temperature, index) => {
    const max = document.getElementById(`maxTempC${index + 1}`);
    const min = document.getElementById(`minTempC${index + 1}`);
    max.innerText =
      max.innerText === `Max Temp(C): ${temperature[0]}`
        ? `Max Temp(F): ${temperature[1]}`
        : `Max Temp(C): ${temperature[0]}`;

    min.innerText =
      min.innerText === `Min Temp(C): ${temperature[2]}`
        ? `Min Temp(F): ${temperature[3]}`
        : `Min Temp(C): ${temperature[2]}`;
  });
}
export default function updateWeatherInfo(weatherData) {
  if (!weatherData) {
    const weatherDisplay = document.getElementById('weatherInfo');
    weatherDisplay.className = `hidden`;
    return;
  }
  weatherTemperature = [];

  document.getElementById('weatherInfo').className = 'visible';
  document.getElementById('country').textContent = weatherData.country;
  document.getElementById('name').textContent = weatherData.name;
  document.getElementById('region').textContent =
    weatherData.region || `Not available`;

  const switchScaleBtn = document.getElementById('scale');
  switchScaleBtn.addEventListener('click', handleClick);
  weatherData.threeDaysForecastData.forEach((day, index) => {
    weatherTemperature.push([
      day.maxTempC,
      day.maxTempF,
      day.minTempC,
      day.minTempF,
    ]);
    document.getElementById(`date${index + 1}`).innerText = `Date ${day.date}`;
    document.getElementById(
      `sunrise${index + 1}`
    ).innerText = `Sunrise: ${day.sunrise}`;
    document.getElementById(
      `sunset${index + 1}`
    ).innerText = `Sunset: ${day.sunset}`;
    document.getElementById(
      `maxTempC${index + 1}`
    ).innerText = `Max Temp(C): ${day.maxTempC}`;
    document.getElementById(
      `minTempC${index + 1}`
    ).innerText = `Min Temp(C): ${day.minTempC}`;
    document.getElementById(
      `weatherDescription${index + 1}`
    ).innerText = `Weather Description: \n ${day.weatherDescription}`;
    document
      .getElementById(`icon${index + 1}`)
      .setAttribute('src', `https:${day.icon}`);
  });

  console.log(weatherTemperature);
}
