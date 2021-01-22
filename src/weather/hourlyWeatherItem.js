import React from 'react';
import useHourlyWeatherItem from './hooks/useHourlyWeatherItem';
import useWeatherNow from './hooks/useWeatherNow';
import {WeatherIcon } from './functions/functions';
export default function HourlyWeatherItem ({ isTemperatureInC, item, timezone }) {
  const {
    temperature,
    timeOptions,
    getTime,
    prepType
  } = useHourlyWeatherItem({ isTemperatureInC, item, timezone });
  const {icon} = useWeatherNow();
  return (
    <div className="hourlyWeatherItem">
      <div>{getTime(item.dt, timeOptions)}</div>
      <div><WeatherIcon owIconType={item.weather[0].icon}/></div>
      <div>{temperature}&deg;{isTemperatureInC ? 'C' : 'F'}</div>
      {item.pop !== 0 &&
        <div>
          {prepType()}
          {(item.pop * 100).toFixed(0)}
          %
        </div>
      }
    </div>
  );
}
