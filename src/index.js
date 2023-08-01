import './styles/style.css';
import { getWeather } from './weather';

getWeather('sandomierz').catch((error) => console.log(error));
