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

     className="min-h-screen bg-cover bg-center"

     style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }} // Update with your image path

   >

     {/* Header */}

     <header className="bg-blue-600 text-white py-4">

       <h1 className="text-3xl font-bold text-center italic ">Weather Dashboard</h1>

     </header>


 

     {/* Main Content */}

     <main className="flex flex-col items-center mt-10 h-screen">

       {/* Search Bar */}

       <form onSubmit={handleSearch} className="mb-4 flex ">

         <input

           type="text"

           value={city}

           onChange={(e) => setCity(e.target.value)}

           placeholder="Enter city name"

           className="p-2 border border-blue-300 rounded-l-md"

           required

         />

         <button

           type="submit"

           className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-500 transition"

         >

           Search

         </button>

       </form>


 

       {/* Error Message */}

       {error && <p className="text-red-500 text-center font-weight: 900;">{error}</p>}


 

       {/* Weather Data Display */}

       {weatherData && (

         <div className="bg-white shadow-md rounded p-4 text-center w-full max-w-sm border border-gray-300">

           <h2 className="text-xl font-semibold text-green-500 italic hover:not-italic">{weatherData.name}</h2>

           <p className="text-lg font-serif font-semibold">

             {Math.round(weatherData.main.temp)}°C

           </p>

           <p className="font-serif font-semibold mt-3">{weatherData.weather[0].description}</p>

          <p className="justify-center"> <img

             src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}

             alt={weatherData.weather[0].description}

           /></p>

           <p className="font-extrabold mt-10  text-yellow-500">Humidity: {weatherData.main.humidity}%</p>

           <p className="font-bold mt-5  text-yellow-500">Wind Speed: {Math.round(weatherData.wind.speed)} km/h</p>

         

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

 


 

 