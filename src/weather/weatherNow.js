import React from 'react';
import SunCycle from './sunCycle';
import useWeatherNow from './hooks/useWeatherNow';
import {WeatherIcon } from './functions/functions';
export default function WeatherNow(props) {
  const isFullScreen = !props.isFullScreen;
  const {
    icon,
    sunrise,
    sunset,
    temperatureMax,
    temperatureMin,
    temperatureNow,
    timeNow,
    timeOptions,
    timezone,
    tInC,
    weatherMain,
    getDate,
  } = useWeatherNow();
  return (
    <div className="todayWeather">
      {isFullScreen?<SunCycle
        sunrise={sunrise}
        sunset={sunset}
        timezone={timezone}
      />:null}
      <div className="tNow">
        <div className="padding7">{temperatureNow}&deg;{tInC ? 'C' : 'F'}</div>
        <WeatherIcon className={isFullScreen?"":"svg-icon"} owIconType={icon}/>
      </div>
      
      <div>{weatherMain}</div>
      <div className="padding7">{temperatureMin} / {temperatureMax}&deg;{tInC ? 'C' : 'F'}</div>
      <div className="timeNow"></div>
      {!props.isFullScreen?<hr />:null}
      <div>{getDate(timeNow, timeOptions)}</div>
    </div>
  );
}
