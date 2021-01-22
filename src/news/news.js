import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './news.css';
import left from './../images/left.png';
import right from './../images/next.png';
const News = () => {
    const URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=980ac95f3a1342aa8498fb6af8b946d6";
    const [newsData, setNewsData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [index, setIndex] = useState(1);
    const [showButton, setShowButton] = useState(false);
    const [disabledNext, setDisabledNext] = useState(true);
    const [disabledPrev, setDisabledPrev] = useState(false);
    const item =3;
    useEffect(() => {
        getNews().then(data => setNewsData(data.articles));
        
    }, []);

    const getNews = () => {
        return axios({
            url: URL,
            method: 'GET'
        }).then(response => {
            setDisplayData(response.data.articles.slice(index,item+1));
            return response.data;
        })
    };
    const showData = () => {
        return displayData.map(data => {
            return <div className="news" key={data['title']}>
                <div className="flex-1">
                    <img className="icon" src={data['urlToImage']} width="97%"></img>
                </div>
                <div className="flex-1 padding-left10">
                    <a className="news-text" href={data['url']}>{data['title']}</a>
                    <div>
                        {data['description']}
                    </div>
                </div>
            </div>
        });
    };

    const togglePrev = (e) => {
        let startIndex = index - item;
        let endindex = startIndex+item;
        let disabledNext = endindex <= (newsData.length - 1);
        let disabledPrev = (startIndex > 1);
        setDisplayData(newsData.slice(startIndex,endindex));
        setIndex(startIndex);
        setDisabledNext(disabledNext);
        setDisabledPrev(disabledPrev);
    }

    const toggleNext = (e) => {
        let startIndex = index + item;
        let endIndex = startIndex+item;
        if(startIndex>=newsData.length)
            startIndex=newsData.length;
        let disabledNext = endIndex <= (newsData.length - 1);
        let disabledPrev = (startIndex != 0);
        setDisplayData(newsData.slice(startIndex,endIndex));
        setIndex(startIndex);
        setDisabledNext(disabledNext);
        setDisabledPrev(disabledPrev);
    }
    return (
        <div className="news-card" 
            onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
            <div className="flex-column">
                <div className="flex-1 left-slider">
                {showButton&&disabledPrev?<button type="submit" className="left"  
                    onClick={(e) => togglePrev(e)} >
                    <img src={left} width="30" height="30" alt="submit" />
                </button>:null}
                </div>
                <div className="flex-4">{showData()}</div>
                <div className="flex-1 right-slider">
                {showButton&&disabledNext?<button type="submit" className="left"
                    onClick={(e) => toggleNext(e)} >
                    <img src={right} width="30" height="30" alt="submit" />
                </button>:null}
                </div>
            </div>
        </div>
    )
}

export default News;