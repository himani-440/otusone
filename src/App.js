import React, { Component } from 'react';
import News from './news/news'
import Music from './music/music';
import Weather from './weather/weather';
import Stocks from './stocks/stocks';
import Horoscope from './horoscope/horoscope';
import home from './images/home.gif';
import weather from './images/weather.gif';
import stocks from './images/stocks.gif';
import music from './images/music.png';
import news from './images/news.gif';

import './App.css';
class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="navBar">
          <img src={home} width="50" height="50" className="news-icon" ></img>
          <img src={weather} width="50" height="50" className="news-icon"></img>
          <img src={music} width="50" height="50" className="news-icon"></img>
          <img src={stocks} width="50" height="50" className="news-icon"></img>
          <img src={news} width="50" height="50" className="news-icon"></img>
        </div>
        <div className="main-panel">
          <div className="display-flex column">
          <div className="navBar">
            <Horoscope />
          </div>
          <div className="flex-4 display-flex">
          <div className="flex-1 height">
            <Weather />
          </div>
          <div className="flex-1 width height">
            <Music />
            <News />
          </div>
          <div className="flex-1 height">
            <Stocks />
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
