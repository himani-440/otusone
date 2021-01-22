import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import left from './../images/left.png';
import right from './../images/next.png';

import Aquarius from './../images/Aquarius.PNG';
import Pisces from './../images/Pisces.PNG';
import Aries from './../images/Aries.PNG';
import Taurus from './../images/Taurus.PNG';
import Gemini from './../images/Gemini.PNG';
import Cancer from './../images/Cancer.PNG';
import Leo from './../images/Leo.PNG';
import Virgo from './../images/Virgo.PNG';
import Libra from './../images/Libra.PNG';
import Scorpio from './../images/Scorpio.PNG';
import Sagittarius from './../images/Sagittarius.PNG';
import Capricorn from './../images/Capricorn.PNG';

const Horoscope = () => {
    const [horoData, setHoroData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [index, setIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [disabledNext, setDisabledNext] = useState(true);
    const [disabledPrev, setDisabledPrev] = useState(false);
    var sign = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "leo",
        "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];
    const item = 3;
    useEffect(() => {
        for (let i = 0; i < sign.length; i++) {
            getHoro(sign[i]).then(data => {
                data["sign"] = sign[i];
                if(i<3)
                displayData.push(data);
            });
        }
        setHoroData(horoData);
        console.log(horoData,displayData,displayData.length);
    }, []);

    const getHoro = (sign) => {
        return axios({
            url: "https://aztro.sameerkumar.website/?sign=" + sign + "&day=today",
            method: 'POST'
        }).then(response => {
            return response.data;
        })
    };

    const getImage = (sign) => {
        switch (sign) {
            case 'Aquarius':
                return <img src={Aquarius} width="90" height="75" className="horo-icon" ></img>
            case 'Pisces':
                return <img src={Pisces} width="100" height="80" className="horo-icon" ></img>;
            case 'Aries':
                return <img src={Aries} width="80" height="80" className="horo-icon" ></img>;
            case 'Taurus':
                return <img src={Taurus} width="90" height="80" className="horo-icon" ></img>;
            case 'Gemini':
                return <img src={Gemini} width="90" height="80" className="horo-icon" ></img>;
            case 'Cancer':
                return <img src={Cancer} width="90" height="80" className="horo-icon" ></img>;
            case 'Leo':
                return <img src={Leo} width="90" height="80" className="horo-icon" ></img>;
            case 'Virgo':
                return <img src={Virgo} width="90" height="80" className="horo-icon" ></img>;
            case 'Libra':
                return <img src={Libra} width="90" height="80" className="horo-icon" ></img>;
            case 'Scorpio':
                return <img src={Scorpio} width="90" height="80" className="horo-icon" ></img>;
            case 'Sagittarius':
                return <img src={Sagittarius} width="90" height="80" className="horo-icon" ></img>;
            case 'Capricorn':
                return <img src={Capricorn} width="90" height="80" className="horo-icon" ></img>;
        }
    }
    const showData = () => {
        return displayData.map(data => {
            return <div className="display-flex" key={data.date_range}>
                <div align="center" className="flex-1">
                        {getImage(data.sign)}
                    <div>
                        {data.sign}
                    </div>
                </div>
                <div className="flex-4">
                    <div>
                        {data.date_range}
                    </div>
                    <div>
                        {data.description}
                    </div>
                </div>
            </div>
        });
    };

    const togglePrev = (e) => {
        let startIndex = index - item;
        let endindex = startIndex+item;
        let disabledNext = endindex <= (horoData.length - 1);
        let disabledPrev = (startIndex > 1);
        setDisplayData(horoData.slice(startIndex,endindex));
        setIndex(startIndex);
        setDisabledNext(disabledNext);
        setDisabledPrev(disabledPrev);
    }

    const toggleNext = (e) => {
        let startIndex = index + item;
        let endIndex = startIndex+item;
        if(startIndex>=horoData.length)
            startIndex=horoData.length;
        let disabledNext = endIndex <= (horoData.length - 1);
        let disabledPrev = (startIndex != 0);
        setDisplayData(horoData.slice(startIndex,endIndex));
        setIndex(startIndex);
        setDisabledNext(disabledNext);
        setDisabledPrev(disabledPrev);
    }
    return (
        <div
            onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
            <div className="flex-column">
                <div className="flex-1 left-slider">
                    {showButton && disabledPrev ? <button type="submit" className="left"
                        onClick={(e) => togglePrev(e)} >
                        <img src={left} width="30" height="30" alt="submit" />
                    </button> : null}
                </div>
                <div className="flex-4 display-flex">{showData()}</div>
                <div className="flex-1 right-slider">
                    {showButton && disabledNext ? <button type="submit" className="left"
                        onClick={(e) => toggleNext(e)} >
                        <img src={right} width="30" height="30" alt="submit" />
                    </button> : null}
                </div>
            </div>
        </div>
    )
}

export default Horoscope;