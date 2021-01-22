import React, {useContext} from 'react';
import { GlobalStoreContext } from './../store';
import { KtoC, KtoF, getDate, WeatherIcon } from './functions/functions';
import useWeatherNow from './hooks/useWeatherNow';
export default function DailyWeather() {
  const [globalStore] = useContext(GlobalStoreContext);

  const DAYS_TO_DISPLAY = 7;

  const displayedWeather = globalStore.JSON.daily.slice(1, DAYS_TO_DISPLAY + 1) || [];
  //const icon = useWeatherNow();
  // function getIconURL(date) {
  //   const icon = getIcon(`${date.weather[0].icon}`);
  //   return `../static/images/icons/${icon}.svg`;
  // }

  function getTemp (temp) {
    if (globalStore.tInC) {
      return KtoC(temp).toFixed(0);
    } else {
      return KtoF(temp).toFixed(0);
    }
  }

  const dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: globalStore.JSON.timezone
  };

  return displayedWeather.map((day, i) =>
    <div className="dailyWeather" key={i}>
      <div>
        <div className="icon">
        <WeatherIcon owIconType={day.weather[0].icon}/>
        </div>
        <div className="date">
          {getDate(day.dt, dateOptions)}
        </div>
        <div>
          {getTemp(day.temp.min)}&deg;
          /&nbsp;
          {getTemp(day.temp.max)}&deg;
          {globalStore.tInC ? 'C' : 'F'}
        </div>
        <div className="forecastSummary">{day.weather[0].description}</div>
        <hr/>
      </div>
    </div>
  );
}
