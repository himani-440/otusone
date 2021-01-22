import React from 'react';
import { getTime } from '../functions/functions';
import {ReactComponent as Sun} from './images/icons/sun.svg';
import {ReactComponent as Sunrise} from './images/icons/sunrise.svg';
import {ReactComponent as SunSet} from './images/icons/sunset.svg';
export default function SunCycle(props) {
  const { sunrise, sunset, timezone } = props;

  const dayLength = sunset - sunrise;
  const timeNow = (new Date() / 1e3).toFixed(0);
  const dayProgress = sunset - timeNow;
  // We're adding 1 to sunPositionX so it would be 0÷2 rather than -1÷1
  let sunPositionX = Math.cos((dayProgress / dayLength) * Math.PI) + 1;
  let sunPositionY = Math.sin((dayProgress / dayLength) * Math.PI);
  // 2 conditions valid at night (before sunrise and after sunset), placing the Sun
  // on the sunCycle rather than leaving it somewhere below the semicircle;
  // 3rd condition valid only if we have white nights (hello, trolls!) ;)
  if (timeNow < sunrise) {
    sunPositionX = 0;
    sunPositionY = 0;
  } else if (timeNow > sunset) {
    sunPositionX = 2;
    sunPositionY = 0;
  } else if (sunrise === undefined && sunset === undefined) {
    sunPositionX = 1;
    sunPositionY = 1;
  }

  const timeOptions = {
    timeZone : timezone,
    hour     : '2-digit',
    minute   : '2-digit',
    hour12   : true
  };

  const sunRise = sunrise ? getTime(sunrise, timeOptions) : 'White night';
  const sunSet = sunset ? getTime(sunset, timeOptions) : 'White night';

  return (
    <div className="sunCycle">
      <span className="sunrise">
        <div>
        <Sunrise />
        </div>
        <span className="sunriseTime">{sunRise}</span>
      </span>
      <span className="sunset">
        <div>
      <SunSet />
      </div>
        <span className="sunsetTime">{sunSet}</span>
      </span>
      <span className="sun">
        <div style={{
            left: `calc(${sunPositionX} * 50% - 23px)`,
            bottom: `calc((${sunPositionY} * 100%) - 12px)`
          }}>
      <Sun />
        </div>
      </span>
    </div>
  );
}
