import './styles/style.css';
import { getWeather } from './weather';

getWeather('s').catch((error) => console.log(error));
