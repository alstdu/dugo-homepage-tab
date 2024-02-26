// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const dateDisplay = document.querySelector( '.date' );
const timeDisplay = document.querySelector( '.hour' );
const locationDisplay = document.querySelector( '#location' );
const temperatureDisplay = document.querySelector( '#temperature' );
const searchLocation = document.querySelector( '#search-button' );
const weatherDescriptionDisplay = document.querySelector( '#description' );

setInterval( function() {
    const currentDateObject = new Date();
    const currentTimeString = currentDateObject.toLocaleTimeString();
    timeDisplay.innerHTML = currentTimeString;
}, 1000 );

const fetchDate = () => {
    const currentDateObject = new Date();
    const currentDateString = currentDateObject.toLocaleDateString( 'en-CA' );
    dateDisplay.innerHTML = currentDateString;
};
fetchDate();

async function fetchWeather() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.282730&lon=-123.120735&appid=' + apiKey;
    const response = await fetch( url );
    const weather = await response.json();
    console.log( weather );
    return weather;
};

searchLocation.addEventListener( 'click', async () => {
    const weather = await fetchWeather();
    locationDisplay.innerText = weather.name;
    temperatureDisplay.innerHTML = Math.round( weather.main.temp - 273.15 ) + '&deg;C';
    weatherDescriptionDisplay.innerHTML = weather.weather[0].main;
} );

const displayWeather = ( weather ) => {
    locationDisplay.innerText = weather.name;
};

// this way is absolutely cursed why would anyone not use async await oh my god why
// function testing2() {
//     const url = 'https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=' + apiKey;

//     // callback hell
//     fetch( url ).then( ( response ) => {
//         response.json().then( ( weather ) => {
//             console.log( weather );
//         } );
//     } );
// }
// testing2();

// TODO: Geo convert for log lat API
// TODO: Implement openweather API
// TODO: Add a spinner while fetching the weather from the API

// TODO: Change image daily
