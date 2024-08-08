let threeDaysForecastData = [];
const loadingContainer = document.getElementById('loadingContainer');

function showLoading() {
  loadingContainer.classList.remove('hidden');
}

// Function to hide the loading component
function hideLoading() {
  loadingContainer.classList.add('hidden');
}
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser'));
    }
  });
}

function filterAndTransformForecast(day) {
  const { sunrise, sunset, moon_phase: moonPhase } = day.astro;
  // eslint-disable-next-line prefer-destructuring
  const date = day.date;
  const {
    maxtemp_c: maxTempC,
    mintemp_c: minTempC,
    mintemp_f: minTempF,
    maxtemp_f: maxTempF,
    avghumidity: humidity,
  } = day.day;
  const { text: weatherDescription, icon } = day.day.condition;
  const weatherInfo = {
    date,
    sunrise,
    sunset,
    maxTempC,
    minTempC,
    minTempF,
    maxTempF,
    weatherDescription,
    icon,
    moonPhase,
    humidity,
  };
  return threeDaysForecastData.push(weatherInfo);
}

function getWeather(location) {
  let latitude;
  let longitude;
  let url = '';
  threeDaysForecastData = [];
  // try to get user location if no location provided
  showLoading();
  return getUserLocation()
    .then((response) => {
      latitude = response.coords.latitude;
      longitude = response.coords.longitude;
      url = `https://api.weatherapi.com/v1/forecast.json?key=a92646fcecc1405c93e80851233007&q=${latitude},${longitude}&days=3`;
    })
    .catch((error) => {
      console.error('Error getting user location:', error.message);
    })
    .then(() => {
      if (location) {
        url = `https://api.weatherapi.com/v1/forecast.json?key=a92646fcecc1405c93e80851233007&q=${location}&days=3`;
      }
      if (!url) throw new Error('No location provided');
      return fetch(url, { mode: 'cors' });
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      const { country, name, region } = response.location;
      const forecast = response.forecast.forecastday;
      forecast.forEach(filterAndTransformForecast);
      hideLoading();
      return { country, name, region, threeDaysForecastData };
    })
    .catch((error) => {
      hideLoading();
      console.error('Failed to fetch:', error.message);
    });
}

export { getWeather, getUserLocation };
