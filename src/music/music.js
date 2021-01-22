import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import left from './../images/left.png';
import right from './../images/next.png';

const Music = () => {
    const [songs, setSongs] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [index, setIndex] = useState(1);
    const [showButton, setShowButton] = useState(false);
    const [disabledNext, setDisabledNext] = useState(true);
    const [disabledPrev, setDisabledPrev] = useState(false);
    const item =7;
    useEffect(() => {
        getToken();
    }, []);

    const getToken = () => {
        return axios({
            url: '/api/token',
            method: 'POST',
            auth: {
                username: "44e38f2719624deb86d61d95285ca685",
                password: "2f0d59ce79bb4f548ba1d1729ac2f4f0"
            },
            data: qs.stringify({
                grant_type: "client_credentials"
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }

        }).then(response => {
            getSongs(response.data['access_token']).then(data => setSongs(data));
        })
    };
    const getSongs = (access_token) => {
        return axios({
            url: '/v1/browse/new-releases',
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*"
            }
        }).then(response => {
            setDisplayData(response.data.albums.items.slice(index,item+1));
            return response.data.albums.items;
        })
    }
    const togglePrev = (e) => {
        let startIndex = index - item;
        let endindex = startIndex+item;
        let disabledNext = endindex <= (songs.length - 1);
        let disabledPrev = (startIndex > 1);
        console.log(startIndex,endindex);
        setDisplayData(songs.slice(startIndex,endindex));
        setIndex(startIndex);
        setDisabledNext(disabledNext);
        setDisabledPrev(disabledPrev);
    }

    const toggleNext = (e) => {
        let startIndex = index + item;
        let endIndex = startIndex+item;
        if(startIndex>=songs.length)
            startIndex=songs.length;
        let disabledNext = endIndex <= (songs.length - 1);
        let disabledPrev = (startIndex != 0);
        console.log(startIndex,endIndex,songs.length);
        setDisplayData(songs.slice(startIndex,endIndex));
        setIndex(startIndex);
        setDisabledNext(disabledNext);
        setDisabledPrev(disabledPrev);
    }

    const showData = () => {
        return displayData.map(data => {
            return <div className="flex-1 padding" key={data.id}>
                <iframe
                    src={"https://open.spotify.com/embed/album/" + data.id}
                    frameBorder="0"
                    alltransparancy="true"
                    allow="encypted-media"
                    title="preview"
                    className="song"
                />
                <div className="song-font">{data.name}</div>
            </div>
        });
    };
    return (
        <div className="music-card" 
            onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
            <div className="flex-column padding-10">
                <div className="flex-1 left-slider">
                    {showButton && disabledPrev ? <button type="submit" className="left"
                        onClick={(e) => togglePrev(e)} >
                        <img src={left} width="30" height="30" alt="submit" />
                    </button> : null}
                </div>
                <div className="flex-4">
                    <div className="display-flex">{showData()}</div>
                </div>
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

export default Music;