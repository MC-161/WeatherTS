import { useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import SearchBar from "./component/SearchBar";
import icon2 from "./assets/icon2.svg";
import WeatherInfo from "./component/WeatherInfo"; // Updated import for WeatherInfo component
import { fetchWeatherData, WeatherData as WeatherDataInterface } from "./utils/useFetch"; // Updated import for fetchWeatherData and WeatherDataInterface

function App(): JSX.Element {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [locationName, setLocationName ] = useState<string>('')

  const [weatherData, setWeatherData] = useState<WeatherDataInterface | null>(null);
  const [error, setError] = useState(false); 

  const handleSubmit = async (location: string) => {
    setIsSubmitted(true);
    setError(false); 
    setLocationName(location)
    const data = await fetchWeatherData(location);
    
    if (data === null) {
      // Handle error when data is null (fetchWeatherData returned null)
      setError(true);
    } else {
      setWeatherData(data);
    }
  };

  return (
    <div className="App overflow-y-scroll w-full h-screen flex flex-col items-center">
      <img src={icon2} className="w-20 m-8 lg:m-2" alt="" />
      <div className="siteName text-white text-center text-4xl lg:text-4xl md:text-4xl">Weather.com</div>
      <div className="flex flex-col items-center pr-8 pl-8 pt-6">
        <Card className="h-full bg-slate-800 max-w-[600px] m-5">
          <CardBody className={`flex flex-col items-center ${isSubmitted ? "fade-in-transition" : ""}`}>
            <SearchBar onSubmit={handleSubmit} />
          </CardBody>
          {weatherData && !error && (
            <WeatherInfo weatherData={weatherData} error={false} locationName={locationName} />
          )}
          {error && (
            <WeatherInfo weatherData={null} error={true} /> // Display the error image and message
          )}
        </Card>
      </div>
    </div>
  );
}

export default App;
