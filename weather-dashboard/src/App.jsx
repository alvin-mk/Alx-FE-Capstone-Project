import React, { useState, useEffect } from "react";


 

const App = () => {

 const [city, setCity] = useState("");

 const [weatherData, setWeatherData] = useState(null);

 const [error, setError] = useState(null);

 const [isFocused, setIsFocused] = useState(false);


 

 // Use your OpenWeatherMap API Key here

 const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


 

 const fetchWeather = async (cityName) => {

   try {

     const response = await fetch(

       `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`

     );

     if (!response.ok) {

       const errorResponse = await response.json();

       console.error('Error response:', errorResponse);


 

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


 

 // Fetch Nairobi weather when component mounts

 useEffect(() => {

   fetchWeather("Nairobi");

 }, []);


 

 const handleSearch = (e) => {

   e.preventDefault();

   fetchWeather(city.trim());

   setCity(""); // Clear the input field after submission

 };


 

 return (

   <div className="min-h-screen bg-gradient-to-r from-[#373b44] to-[#4286f4]">

     {/* Header */}

     <header className="text-white py-7">

       <h1 className="text-4xl font-extrabold text-center italic">Weather Dashboard</h1>

     </header>


 

     {/* Main Content */}

     <main className="flex flex-col items-center mt-5 h-screen">

       {/* Container for Search Bar and Weather Data */}

       <div className="border border-gray-300 rounded-lg p-6 bg-opacity-30 backdrop-blur-sm">

         {/* Search Bar */}

         <form onSubmit={handleSearch} className="mb-4 flex">

           <input

             type="text"

             value={city}

             onChange={(e) => setCity(e.target.value)}

             placeholder="Enter city name"

             className={`text-white rounded-full p-2 pl-10 transition-all duration-300 ease-in-out  ${

               isFocused ? 'w-4/5' : 'w-full'

             }`}

             onFocus={() => setIsFocused(true)}

             onBlur={() => setIsFocused(false)}

             required

           />

           <button

             type="submit"

             className="bg-[rgb(79,92,152)] font-serif text-white p-2 rounded-full hover:bg-blue-300 ms-2"

           >

             Search

           </button>

         </form>


 

         {/* Error Message */}

         {error && <p className="text-red-500 text-center font-semibold">{error}</p>}


 

         {/* Weather Data Display */}

         {weatherData && (

           <div className="shadow-md rounded-xl p-4 text-center w-full max-w-sm bg-gradient-to-r bg-opacity-30 transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-opacity-50 mt-3">

             <h2 className="text-xl font-semibold text-green-500">{weatherData.name}</h2>

             <p className="text-lg font-serif font-semibold mt-3 text-white">

               {Math.round(weatherData.main.temp)}°C

             </p>

             <p className="font-serif text-white font-semibold mt-3">{weatherData.weather[0].description}</p>

             <p className="flex justify-center">

               <img

                 src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}

                 alt={weatherData.weather[0].description}

               />

             </p>


 

             {/* Icons for Humidity and Wind Speed */}

             <div className="flex justify-around mt-5">

               <div className="flex items-center">

                 <svg

                   xmlns="http://www.w3.org/2000/svg"

                   className="h-6 w-6 text-yellow-500  mr-1"

                   fill="none"

                   viewBox="0 0 24 24"

                   stroke="currentColor"

                 >

                   {/* New Water Drop Icon for Humidity */}

                   <path

                     strokeLinecap="round"

                     strokeLinejoin="round"

                     strokeWidth={2}

                     d="M12 21.5C16.6944 21.5 20.5 17.6944 20.5 13C20.5 6.5 12 2.5 12 2.5C12 2.5 3.5 6.5 3.5 13C3.5 17.6944 7.30558 21.5 12 21.5Z"

                   />

                 </svg>

                 <span className="font-extrabold text-yellow-500 ml-2 ">

                   Humidity: {weatherData.main.humidity}%

                 </span>

               </div>


 

               <div className="flex items-center">

                 <svg

                   xmlns="http://www.w3.org/2000/svg"

                   className="h-6 w-6 text-yellow-500 mr-1"

                   fill="none"

                   viewBox="0 0 24 24"

                   stroke="currentColor"

                 >

                   {/* New Wind Icon */}

                   <path

                     strokeLinecap="round"

                     strokeLinejoin="round"

                     strokeWidth={2}

                     d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"

                   />

                 </svg>

                 <span className="font-bold text-yellow-500 mx- ">

                   Wind: {Math.round(weatherData.wind.speed)} km/h

                 </span>

               </div>

             </div>

           </div>

         )}

       </div>

     </main>


 

     {/* Footer */}

     <footer className="bg-gray-800 text-white py-4 text-center">

       <p>© 2024 Weather Dashboard. All rights reserved.</p>

     </footer>

   </div>

 );

};


 

export default App;