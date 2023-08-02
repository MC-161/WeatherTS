import sunny from '../assets/sunny.svg'
import clear from '../assets/clear.svg'
import rain from '../assets/rain.svg'
import cloudy from '../assets/cloudy.svg'

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  weatherImage: string | null; // Add weatherImage property to the interface
}

const API_KEY = "11fd6cfa6aa140872647e9bf171fcd59"; // Replace this with your OpenWeather API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeatherData(location: string): Promise<WeatherData | null> {
  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    const data = await response.json();

    const getWeatherImage = (weatherDescription: string) => {
      const lowercaseDescription = weatherDescription.toLowerCase();
      const rainRegex = /rain/;
      const cloudsRegex = /clouds/;
      const clearRegex = /clear/;
      const sunnyRegex = /sunny/;
    
      switch (true) {
        case rainRegex.test(lowercaseDescription):
          return rain;
        case cloudsRegex.test(lowercaseDescription):
          return cloudy;
        case clearRegex.test(lowercaseDescription):
          return clear;
        case sunnyRegex.test(lowercaseDescription):
          return sunny;
        // Add more cases for other weather conditions and their corresponding images
        default:
          return null; // Return null if no image matches the description
      }
    };
    

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weatherImage: getWeatherImage(data.weather[0].main), // Get the weather image based on the weather description
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
