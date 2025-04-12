import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherAPI() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('https://api.open-meteo.com/v1/forecast?latitude=8.8811&longitude=76.5847&current=temperature_2m&timezone=auto')
            .then(response => {
                setWeather(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to load weather data");
                setLoading(false);
            });
    }, []);

    if (loading) return <span>Weather forecast is loading...</span>;
    if (error) return <span>{error}</span>;
    
    return (
        <>
            {weather && weather.current ? (
                <span>
                    Current temperature in Kollam: {weather.current.temperature_2m}
                    {weather.current_units.temperature_2m}
                </span>
            ) : (
                <span>Weather data unavailable</span>
            )}
        </>
    );
}