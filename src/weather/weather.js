import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DailyWeather from './dailyWeather';
import WeatherByTheHour from './weatherByTheHour';
import WeatherNow from './weatherNow';
import {WeatherIcon } from './functions/functions';
import { GlobalStoreContext } from './../store';
const Weather = () => {
    const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);
    const [weatherData, setWeatherData] = useState(null);
    const [isFullScrn, setFullScrn] = useState(false);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        getCity();
    }, []);

    const getCity = () => {
        return axios({
            url: 'https://ipapi.co/json/',
            method: 'GET'
        }).then(response => {
            getWeather(response.data.latitude,response.data.longitude,response.data.city,response.data.region_code,response.data.country).then(data => setWeatherData(data));
        })
    }
    const getWeather = (lat,lng,city,state,country) => {
        return axios({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&APPID=e6fe32bf79ccd97f877ea6bf15dcc542`,
            method: 'GET'
        }).then(response => {
            setGlobalStore({
                ...globalStore,
                city: city,
                state:state,
                country: country,
                JSON: response.data,
                isAppLoaded: true
            });
            return response.data;
        })
    };
    const handleTemperatureUnitChange = event => {
        event.preventDefault();
        setGlobalStore({ ...globalStore, tInC: !globalStore.tInC });
    };

    const handleInputChange = event => {
        event.preventDefault();
        setSearchText(event.target.value);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        handleAddressSearch(searchText);
        setSearchText('');
    };
    const handleClick = event => {
        if(event.target.id !=='cOrF' && event.target.id !=='city_search'){
        event.preventDefault();
        setFullScrn(!isFullScrn);
        }
    };

    const handleAddressSearch = (address) => {
        // event.preventDefault();
        setGlobalStore({
            ...globalStore,
            city: '',
            address: '',
            isAppLoaded: false
        });

        axios({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=iz1i9Bamn9GHEvIjcXUpIy142aX1Zny8&location=${address}`,
            method: "GET"
        }).then(response => {
            // setGlobalStore({
            //     ...globalStore,
            //     latitude: response.data.results[0].locations[0].latLng.lat,
            //     longitude: response.data.results[0].locations[0].latLng.lng,
            //     city: response.data.results[0].locations[0].adminArea5,
            //     state: response.data.results[0].locations[0].adminArea3,
            //     country: response.data.results[0].locations[0].adminArea1,
            //     isAppLoaded: true
            // });
            getWeather(response.data.results[0].locations[0].latLng.lat,response.data.results[0].locations[0].latLng.lng,response.data.results[0].locations[0].adminArea5,response.data.results[0].locations[0].adminArea3,response.data.results[0].locations[0].adminArea1);
        })
    }

    const showData = () => {
        return <div className="renderedWeather" onClick={handleClick}>
            <div className="display-flex">
                <div className="flex-1">
                    <button id="cOrF" className={isFullScrn?'fcOrF':'cOrF'} onClick={handleTemperatureUnitChange}>
                        &deg;{globalStore.tInC ? 'F' : 'C'}
                    </button>
                </div>
                <div className="flex-2" align="right">
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            id="city_search"
                            placeholder={globalStore.city}
                            value={searchText}
                            onChange={handleInputChange}
                            className={isFullScrn?'fsearch':'search'}
                        />
                        {/* <WeatherIcon owIconType="111"/> */}
                    </form>
                </div>
            </div>
            <div className="">
                <div className={isFullScrn?'cityFName':'cityName'}>{globalStore.city}{globalStore.state? (','+globalStore.state):''}{globalStore.country?(','+globalStore.country):''}</div>
                <WeatherNow isFullScreen={isFullScrn}/>
            </div>
            {isFullScrn ? <div><WeatherByTheHour /> </div> : null}
            {isFullScrn ? <div className="display-flex">
                <DailyWeather />
            </div> : null}
        </div>
    };

    return (
        <div className="weather-card">
            {weatherData ? showData() : "weather"}
        </div>
    )
}

export default Weather;