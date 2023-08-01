import './styles/style.css';
import { getWeather } from './weather';

getWeather().catch((error) => console.log(error));
