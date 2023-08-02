const errorDisplay = document.getElementById('message');
export default function showFormError() {
  const locationInput = document.getElementById('location');
  const location = locationInput.value.trim();
  const validPattern = /^[A-Za-z, -]+$/;

  if (location.length < 2) {
    errorDisplay.innerText = 'Please enter a valid location!';
    locationInput.setCustomValidity('location');
    return;
  }
  if (!validPattern.test(location)) {
    errorDisplay.innerText = 'Letters, spaces, hyphens allowed only!';
    locationInput.setCustomValidity('pattern');
    return;
  }
  if (location.length > 28) {
    errorDisplay.innerText = 'Max 28 characters!';
    locationInput.setCustomValidity('characters');
    return;
  }
  errorDisplay.innerText = '';
  locationInput.setCustomValidity('');
}
