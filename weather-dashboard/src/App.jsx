import React, { useState, useEffect } from "react";

const App = () => {
const [city, setCity] = useState("");
const [weatherData, setWeatherData] = useState(null);
const [error, setError] = useState(null);
const [isFocused, setIsFocused] = useState(false);
const [loading, setLoading] = useState(false);
const [darkMode, setDarkMode] = useState(false);
const [language, setLanguage] = useState("en"); // New state for language

// Use your OpenWeatherMap API Key here
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

// Translations object
const translations = {
 en: {
   title: "Weather Dashboard",
   searchPlaceholder: "Enter city name",
   useCurrentLocation: "Use Current Location",
   loading: "Loading weather data...",
   humidity: "Humidity",
   wind: "Wind",
   lightMode: "Light Mode",
   darkMode: "Dark Mode",
 },
 
 es: {
   title: "Panel del Tiempo",
   searchPlaceholder: "Ingrese el nombre de la ciudad",
   useCurrentLocation: "Usar ubicación actual",
   loading: "Cargando datos del clima...",
   humidity: "Humedad",
   wind: "Viento",
   lightMode: "Modo Claro",
   darkMode: "Modo Oscuro",
 },
 fr: {
   title: "Tableau de Bord Météo",
   searchPlaceholder: "Entrez le nom de la ville",
   useCurrentLocation: "Utiliser la localisation actuelle",
   loading: "Chargement des données météo...",
   humidity: "Humidité",
   wind: "Vent",
   lightMode: "Mode Clair",
   darkMode: "Mode Sombre",
 },
 sw: {
   title: "Dashibodi ya Hali ya Hewa",
   searchPlaceholder: "Ingiza jina la mji",
   useCurrentLocation: "Tumia Eneo la Sasa",
   loading: "Inapakia data ya hali ya hewa...",
   humidity: "Unyevunyevu",
   wind: "Upepo",
   lightMode: "Hali ya Mwanga",
   darkMode: "Hali ya Giza",
 },
 de: {
   title: "Wetter-Dashboard",
   searchPlaceholder: "Stadtname eingeben",
   useCurrentLocation: "Aktuellen Standort verwenden",
   loading: "Wetterdaten werden geladen...",
   humidity: "Luftfeuchtigkeit",
   wind: "Wind",
   lightMode: "Heller Modus",
   darkMode: "Dunkler Modus",
 },
 it: {
   title: "Dashboard Meteo",
   searchPlaceholder: "Inserisci il nome della città",
   useCurrentLocation: "Usa posizione attuale",
   loading: "Caricamento dati meteo...",
   humidity: "Umidità",
   wind: "Vento",
   lightMode: "Modalità Chiara",
   darkMode: "Modalità Scura",
 },
 pt: {
   title: "Painel Meteorológico",
   searchPlaceholder: "Digite o nome da cidade",
   useCurrentLocation: "Usar localização atual",
   loading: "Carregando dados meteorológicos...",
   humidity: "Umidade",
   wind: "Vento",
   lightMode: "Modo Claro",
   darkMode: "Modo Escuro",
 },
 
 // Add more languages as needed here
};

const fetchWeather = async (cityName) => {
 setLoading(true);
 try {
   const response = await fetch(
     `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=${language}&appid=${apiKey}`
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
 } finally {
   setLoading(false);
 }
};

const fetchWeatherByCoords = async (lat, lon) => {
 setLoading(true);
 try {
   const response = await fetch(
     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${language}&appid=${apiKey}`
   );
   if (!response.ok) {
     throw new Error("Failed to fetch weather data");
   }
   const data = await response.json();
   setWeatherData(data);
   setError(null);
 } catch (err) {
   console.error(err);
   setWeatherData(null);
   setError(err.message);
 } finally {
   setLoading(false);
 }
};

const getCurrentLocation = () => {
 setLoading(true);
 if ("geolocation" in navigator) {
   navigator.geolocation.getCurrentPosition(
     (position) => {
       const { latitude, longitude } = position.coords;
       fetchWeatherByCoords(latitude, longitude);
     },
     (err) => {
       console.error("Geolocation error:",err);
       setError("Unable to retrieve your location. Please search for a city manually.");
       setLoading(false);
     }
   );
 } else {
   setError("Geolocation is not supported by your browser. Please search for a city manually.");
   setLoading(false);
 }
};

// Fetch current location weather when component mounts
useEffect(() => {
 getCurrentLocation();
}, []);

// Refetch weather data when language changes
useEffect(() => {
 if (weatherData) {
   fetchWeather(weatherData.name);
 }
}, [language]);

const handleSearch = (e) => {
 e.preventDefault();
 fetchWeather(city.trim());
 setCity(""); // Clear the input field after submission
};

const toggleDarkMode = () => {
 setDarkMode(!darkMode);
};

const handleLanguageChange = (e) => {
 setLanguage(e.target.value);
};

const getBackgroundImage = () => {
 if (!weatherData) return "";

 const condition = weatherData.weather[0].main.toLowerCase();
 switch (condition) {
   case "clear":
     return "url('https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')";
   case "clouds":
     return "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=902&q=80')";
   case "rain":
     return "url('https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')";
   case "snow":
     return "url('https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1108&q=80')";
   default:
     return "url('https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')";
 }
};

return (
 <div 
   className={`min-h-screen bg-cover bg-center transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
   style={{ backgroundImage: getBackgroundImage() }}
 >
   {/* Header */}
   <header className="py-7 bg-black bg-opacity-50">
     <h1 className="text-4xl font-extrabold text-center italic text-white">{translations[language].title}</h1>
   </header>

   {/* Main Content */}
   <main className="flex flex-col items-center mt-5 min-h-screen">
     {/* Container for Search Bar and Weather Data */}
     <div className={`border border-gray-300 rounded-lg p-6 bg-opacity-80 backdrop-blur-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
       {/* Theme Toggle and Language Selector */}
       <div className="flex justify-between mb-4">
         <button
           onClick={toggleDarkMode}
           className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
         >
           {darkMode ? '☀️ ' + translations[language].lightMode : '🌙 ' + translations[language].darkMode}
         </button>
         <select
           value={language}
           onChange={handleLanguageChange}
           className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
         >
           <option value="en">English</option>
           <option value="es">Español</option>
           <option value="fr">Français</option>
          {/*  <option value="fr">Kiswahili</option>*/}
           <option value="de">Deutsch</option>
           <option value="it">Italiano</option>
           <option value="pt">Português</option>
           {/* Add more language options as needed */}
         </select>
       </div>

       {/* Search Bar */}
       <form onSubmit={handleSearch} className="mb-4 flex">
         <input
           type="text"
           value={city}
           onChange={(e) => setCity(e.target.value)}
           placeholder={translations[language].searchPlaceholder}
           className={`rounded-full p-2 pl-10 transition-all duration-300 ease-in-out ${
             isFocused ? 'w-4/5' : 'w-full'
           } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
           required
         />
         <button
           type="submit"
           className={`font-serif p-2 rounded-full ms-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
           aria-label="Search"
         >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
         </button>
       </form>

       {/* Current Location Button */}
       <button
         onClick={getCurrentLocation}
         className={`w-full font-serif p-2 rounded-full mb-4 ${darkMode ? 'bg-green-600 hover:bg-green-500' : 'bg-green-500 hover:bg-green-600'}`}
       >
         {translations[language].useCurrentLocation}
       </button>

       {/* Loading Message */}
       {loading && <p className="text-center font-semibold">{translations[language].loading}</p>}

       {/* Error Message */}
       {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

       {/* Weather Data Display */}
       {weatherData && (
         <div className={`min-h-[350px] shadow-md rounded-xl p-4 text-center w-full max-w-sm transition-transform duration-300 ease-in-out hover:scale-110 mt-3 backdrop-blur-sm ${
           darkMode ? 'bg-gray-800/40' : 'bg-white/40'
         }`}>
           <h2 className="text-xl font-semibold text-green-500">{weatherData.name}</h2>
           <p className="text-6xl font-serif font-semibold mt-5">
             {Math.round(weatherData.main.temp)}°C
           </p>
           <p className="font-serif font-semibold mt-4 text-red-600">{weatherData.weather[0].description}</p>
           <p className="flex justify-center mt-10 ">
             <img
               src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
               alt={weatherData.weather[0].description}
             />
           </p>

           {/*  Humidity */}
           <div className="flex justify-around mt-5">
             <div className="flex items-center">
              {/*Humidity icon*/}
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
                   d="M12 21.5C16.6944 21.5 20.5 17.6944 20.5 13C20.5 6.5 12 2.5 12 2.5C12 2.5 3.5 6.5 3.5 13C3.5 17.6944 7.30558 21.5 12 21.5Z"
                 />
               </svg>
               <span className="font-extrabold text-yellow-500">
                 {translations[language].humidity}: {weatherData.main.humidity}%
               </span>
             </div>
                        {/* Wind Speed */}
             <div className="flex items-center ml-10">
                         {/* Wind icon*/}
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
                   d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"
                 />
               </svg>
               <span className="font-bold text-yellow-500">
                 {translations[language].wind}: {Math.round(weatherData.wind.speed)} km/h
               </span>
             </div>
           </div>
         </div>
       )}
     </div>
   </main>
 </div>
);
};

export default App;