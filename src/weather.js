let threeDaysForecastData = [];

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
  const {
    maxtemp_c: maxTempC,
    mintemp_c: minTempC,
    mintemp_f: minTempF,
    maxtemp_f: maxTempF,
    avghumidity: humidity,
  } = day.day;
  const { text: weatherDescription, icon } = day.day.condition;
  const weatherInfo = {
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
  // try to get user location if no location provided
  getUserLocation()
    .then((response) => {
      latitude = response.coords.latitude;
      longitude = response.coords.longitude;
      url = `http://api.weatherapi.com/v1/forecast.json?key=a92646fcecc1405c93e80851233007&q=${latitude},${longitude}&days=3`;
    })
    .catch((error) => {
      console.error('Error getting user location:', error.message);
    })
    .then(() => {
      if (location) {
        url = `http://api.weatherapi.com/v1/forecast.json?key=a92646fcecc1405c93e80851233007&q=${location}&days=3`;
      } else throw new Error('No location provided');
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
      threeDaysForecastData = [];
      forecast.forEach(filterAndTransformForecast);
      console.log(country, name, region);
      console.log(threeDaysForecastData);
      console.log(response);
    })
    .catch((error) => {
      console.error('Failed to fetch:', error.message);
    });
}

export { getWeather, getUserLocation };
