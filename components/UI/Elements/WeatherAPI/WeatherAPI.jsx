import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherAPI() {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios.get('https://api.open-meteo.com/v1/forecast?latitude=8.8811&longitude=76.5847&daily=temperature_2m_max&hourly=temperature_2m&timezone=auto')
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return(
        <>
            {weather.current ? (
                <span>
                    {weather.current.temperature_2m}
                    {weather.current_units.temperature_2m}
                </span>
            ) : (
                <span>Weather forecast is loading...</span>
            )}
        </>
    );
}