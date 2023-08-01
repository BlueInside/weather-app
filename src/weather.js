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
  }).catch((error) => console.log(error));
}

function getWeather(location) {
  let url = ``;
  let latitude;
  let longitude;
  getUserLocation()
    .then((response) => {
      latitude = response.coords.latitude;
      longitude = response.coords.longitude;
      if (latitude && longitude) {
        url = `http://api.weatherapi.com/v1/forecast.json?key=a92646fcecc1405c93e80851233007&q=${latitude},${longitude}&days=3`;
      }
    })
    .catch((error) => {
      console.error('Error getting user location:', error);
    })
    .then(() => {
      if (!url) {
        if (location) {
          url = `http://api.weatherapi.com/v1/forecast.json?key=a92646fcecc1405c93e80851233007&q=${location}&days=3`;
        } else
          url = `http://api.weatherapi.com/v1/forecast.json?key=a92646fcecc1405c93e80851233007&q=&days=3`;
      }
    })
    .then(() => {
      fetch(url, { mode: 'cors' })
        .then((response) => {
          if (response.status === 400) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((response) => {
          console.log(response);
          const { country, name, region } = response.location;
          const threeDaysForecast = [];
          const forecast = response.forecast.forecastday;
          forecast.forEach((day) => {
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
            return threeDaysForecast.push(weatherInfo);
          });
          console.log(country, name, region);
          console.log(threeDaysForecast);
          console.log(response);
        })
        .catch((error) => {
          console.error('Failed to fetch:', error);
        });
    });
}
export { getWeather, getUserLocation };
