import {ReactComponent as ClearDay }  from './../images/icons/clear-day.svg';
import {ReactComponent as ClearNight }  from './../images/icons/clear-night.svg';
import {ReactComponent as PartlyCloudyDay }  from './../images/icons/partly-cloudy-day.svg';
import {ReactComponent as PartlyCloudyNight }  from './../images/icons/partly-cloudy-night.svg';
import {ReactComponent as Cloudy }  from './../images/icons/cloudy.svg';
import {ReactComponent as Rain }  from './../images/icons/rain.svg';
import {ReactComponent as Thunderstorm }  from './../images/icons/thunderstorm.svg';
import {ReactComponent as Snow }  from './../images/icons/snow.svg';
import {ReactComponent as Fog }  from './../images/icons/fog.svg';
import {ReactComponent as Search }  from './../images/icons/search.svg';
export function getDate(time, options) {
  return new Date(time * 1e3).toLocaleDateString('en', options);
}

export function getTime(time, options) {
  return new Date(time * 1e3).toLocaleTimeString('en', options);
}

export function KtoC(tempK) {
  return tempK - 272.15;
}

export function KtoF(tempK) {
  return tempK * 1.8 - 459.67;
}

export function WeatherIcon(owIconType) {
  switch (owIconType.owIconType) {
    case '01n':
      return <ClearNight />
    case '02d':
    case '04d':
      return <PartlyCloudyDay />;
    case '02n':
    case '04n':
      return <PartlyCloudyNight />;
    case '03d':
    case '03n':
      return <Cloudy />;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return <Rain />;
    case '11d':
    case '11n':
      return <Thunderstorm />;
    case '13d':
    case '13n':
      return <Snow />;
    case '50d':
    case '50n':
      return <Fog />;
    case '111':
        return <Search />;
    default:
      return <ClearDay />;
  }
}
