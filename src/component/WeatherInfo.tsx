import React from "react";
import { CardBody } from "@chakra-ui/react";
import failed from '../assets/failed.png'
import humidityimg from '../assets/humidity.svg'
import windImg from '../assets/wind.svg'

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  weatherImage: string | null;
}

interface WeatherInfoProps {
  weatherData: WeatherData | null;
  error: boolean; 
  locationName?:string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData, error, locationName }) => {
  if (error) {
    return (
      <CardBody className={`flex flex-col items-center fade-in-animation active`}>
        <img className="w-40" src={failed} alt="Error" /> {/* Display the error image */}
        <p className="text-white">Error: Invalid location</p>
      </CardBody>
    );
  }

  // Weather data is available, display weather information
  return (
    <CardBody className={`flex flex-col items-center fade-in-animation active`}>
      <p className="text-white text-2xl">{locationName}</p>
      <div className="info justify-center flex-col items-center text-white">
        {weatherData?.weatherImage && <img src={weatherData.weatherImage}  alt="Weather" />}
        <div className="temp flex flex-col items-center">
          <p className="text-2xl mt-[-10px]">{weatherData?.temperature}°C</p>
          <p>{weatherData?.description}</p>
        </div>
        <div className="stats grid grid-cols-2 gap-10 p-1 mt-4">
          <div className="humidity grid grid-cols-2">
            <div className="flex items-center">
              <img src={humidityimg} className="w-10" alt="" />
            </div>
            <div className="grid grid-rows-2 pt-2">
              <p>{weatherData?.humidity}%</p>
              <p className="text-sm">Humidity</p>
            </div>
          </div>
          <div className="Wind humidity grid grid-cols-2">
            <div className="flex items-center">
              <img src={windImg} className="w-10" alt="" />
            </div>
            <div className="grid grid-rows-2 pt-2">
              <p>{weatherData?.windSpeed}</p>
              <p className="text-sm">Wind</p>
            </div>
          </div>
        </div>
      </div>
    </CardBody>
  );
};

export default WeatherInfo;
