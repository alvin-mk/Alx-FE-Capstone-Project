import React, { useState } from "react";


 

const App = () => {

 const [city, setCity] = useState("");

 const [weatherData, setWeatherData] = useState(null);

 const [error, setError] = useState(null);


 

 // Use your OpenWeatherMap API Key here

 const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


 

 const fetchWeather = async (city) => {

   try {

     const response = await fetch(

       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

     );


 

     if (!response.ok) {

       const errorResponse = await response.json(); // Get the error response

       console.error('Error response:', errorResponse); // Log the error response

       if (response.status === 404) {

         throw new Error("City not found");

       } else {

         throw new Error("Failed to fetch weather data");

       }

     }


 

     const data = await response.json();

     setWeatherData(data);

     setError(null);

   } catch (err) {

     console.error(err);

     setWeatherData(null);

     setError(err.message);

   }

 };


 

 const handleSearch = (e) => {

   e.preventDefault();

   fetchWeather(city.trim());

   setCity(""); // Clear the input field after submission

 };


 

 return (

   <div

     className="min-h-screen bg-gradient-to-r from-[rgb(45,56,123)] to-[rgb(76,67,109)] p-4 bg-cover bg-center"

  >  "

   

     {/* Header */}

     <header className=" text-gray-900 py-7  border-width: 0px;">

       <h1 className="text-4xl font-extrabold text-center italic ">Weather Dashboard</h1>

     </header>


 

     {/* Main Content */}

      <main className="flex flex-col items-center mt-5 h-screen filter: blur(8px);">

       {/* Search Bar */}

       <form onSubmit={handleSearch} className="mb-4 flex ">

         <input

           type="text"

           value={city}

           onChange={(e) => setCity(e.target.value)}

           placeholder="Enter city name"

           className="text-white border rounded-full p-2 pl-10 transition-all duration-300 ease-in-out bg-[rgb(79,92,152)] ${isFocused ? 'w-4/5' : 'w-full'} border-transparent`}

      onFocus={() => setIsFocused(true)}

      onBlur={() => setIsFocused(false)}

      required"

         />

          <button

           type="submit"

           className="bg-[rgb(79,92,152)] font-serif text-white p-2 rounded-full hover:bg-blue-300   ms-2"

         >Search

         </button>

       </form>


 

       {/* Error Message */}

       {error && <p className="text-red-500 text-center font-semibold">{error}</p>}


 

       {/* Weather Data Display */}

       {weatherData && (

          <div className= "filter: blur(8px);  shadow-md rounded-xl p-4 text-center w-full max-w-sm bg-gradient-to-r bg-opacity-30 border-opacity-40 transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-opacity-50 mt-3">

           <h2 className="text-xl font-semibold text-green-500 ">{weatherData.name}</h2>

           <p className="text-lg font-serif font-semibold mt-3 text-white">

             {Math.round(weatherData.main.temp)}°C

           </p>

           <p className="font-serif font-semibold mt-3">{weatherData.weather[0].description}</p>

          <p className="flex justify-center"> <img

             src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}

             alt={weatherData.weather[0].description}

           /></p>


 

           {/* Icons for Humidity and Wind Speed */}

    <div className="flex justify-around mt-5">

      <div className="flex items-center">

        {/* Humidity Icon */}

        <svg

          xmlns="http://www.w3.org/2000/svg"

          className="h-6 w-6 text-yellow-500 mr-1"

          fill="none"

          viewBox="0 0 24 24"

          stroke="currentColor"

        >

          <path

            strokeLinecap="round"

            strokeLinejoin="round"

            strokeWidth={2}

            d="M12 8v4m0 4h.01M12 4h.01M8 4h8m-8 0a8 8 0 01-8 8 8 8 0 018 8 8 8 0 018-8 8 8 0 01-8-8m0 16a8 8 0 010-16 8 8 0 000 16z"

          />

        </svg>

        <span className="font-extrabold text-yellow-500">

        Humidity:{weatherData.main.humidity}%

        </span>

      </div>


 

      <div className="flex items-center">

        {/* Wind Icon */}

        <svg

          xmlns="http://www.w3.org/2000/svg"

          className="h-6 w-6 text-yellow-500 mr-1"

          fill="none"

          viewBox="0 0 24 24"

          stroke="currentColor"

        >

          <path

            strokeLinecap="round"

            strokeLinejoin="round"

            strokeWidth={2}

            d="M16 12h-4m4 4h-4m0-8h4m-6 0H8m4 0H6m0 0H4m6 0H2m8 8a2 2 0 00-2-2m0 0a2 2 0 00-2 2m2-2h8"

          />

        </svg>

        <span className="font-bold text-yellow-500">

        Wind: {Math.round(weatherData.wind.speed)} km/h

        </span>

      </div>

    </div>

  </div>

)}

          </main>

     


 

     {/* Footer */}

     <footer className="bg-gray-800 text-white py-4 text-center">

       <p>© 2024 Weather Dashboard. All rights reserved.</p>

     </footer>

   </div>

 );

};


 

export default App;

 

