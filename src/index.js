import './styles/style.css';
import { getWeather } from './weather';
import showFormError from './formValidation';

const searchLocationForm = document.getElementById('searchLocationForm');

searchLocationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showFormError();
  if (searchLocationForm.checkValidity()) {
    const locationInput = document.getElementById('location');
    const location = locationInput.value.trim();
    getWeather(location);
  }
});
getWeather();
