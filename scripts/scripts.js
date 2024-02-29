// TODO: Geo convert for log lat API
// TODO: Add a spinner while fetching the weather from the API

// grab all our HTML elements
const dateDisplay = document.querySelector( '.date' );
const timeDisplay = document.querySelector( '.hour' );
const locationDisplay = document.querySelector( '#location' );
const temperatureDisplay = document.querySelector( '#temperature' );
const searchLocation = document.querySelector( '#searchButton' );
const locationInput = document.querySelector( '#locationInput' );
const weatherDescriptionDisplay = document.querySelector( '#description' );
const weatherImageDisplay = document.querySelector( '#weatherImage' );
const randomQuoteDisplay = document.querySelector( '#quote' );
const quoteAuthorDisplay = document.querySelector( '#author' );

// sets up an interval function that runs every second (1000 mil.)
setInterval( function() {
    // create a new Date object representing the current date and time.
    const currentDateObject = new Date();
    // get the current time as a localized string (formatted time) using toLocaleTimeString()
    const currentTimeString = currentDateObject.toLocaleTimeString();
    // change the text inside timeDisplay (our p tag in the HTML)
    timeDisplay.innerHTML = currentTimeString;
}, 1000 );

const fetchDate = () => {
    // create a new Date object for the date this time
    const currentDateObject = new Date();
    // get the current date specifically in the Canadian date format
    const currentDateString = currentDateObject.toLocaleDateString( 'en-CA' );
    // change the text inside dateDisplay
    dateDisplay.innerHTML = currentDateString;
};
// we want this on page load every time so call it right after
fetchDate();

// fetch weather data from the OpenWeatherMap API.
async function fetchWeather() {
    // construct the API URL with queries and API key
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.282730&lon=-123.120735&appid=' + apiKey;
    // send HTTP request to the API using the fetch() function.
    //     await keyword ensures that the response is fully received before proceeding
    const response = await fetch( url );
    const weather = await response.json();
    // log the weather data to the console (for debugging purposes)
    console.log( weather );
    // return the weather data to the caller
    //     this allows us to call the function later and get the values
    return weather;
};

async function fetchGeo(location) {
    const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&appid=' + apiKey;
    const response = await fetch( url );
    const geo = await response.json();
    console.log( geo );
}
// set up an event listener for our search button
//     when the button is clicked, the callback function will trigger
searchLocation.addEventListener( 'click', async () => {
    // call fetchWeather() to retrieve weather data when clicked
    const weather = await fetchWeather();
    locationDisplay.innerText = weather.name;
    // calculate the temperature in Celsius by subtracting 273.15 from the temperature in Kelvin
    //    I later discovered there's a query for this but... I figured out the formula so... it's staying
    temperatureDisplay.innerHTML = Math.round( weather.main.temp - 273.15 ) + '&deg;C';
    // update the content displayed in the browser
    //     display the main weather description (e.g., "Cloudy", "Rain", etc.)
    weatherDescriptionDisplay.innerHTML = weather.weather[0].main;
    // hold on before we get too deep into this... there's built in images
    // switch ( weather.weather[0].main ) {
    // case 'Cloudy':
    //     weatherImageDisplay.src = "./images/cloudy.png";
    //     break;
    // case 'Rain':
    //     weatherImageDisplay.src = "./images/light-rain.png";
    //     break;
    // case ''
    // }

    // instead of downloading every single weather image, use the built in ones
    //    we are setting the source of the image by concatenating the img URL and the current icon code
    weatherImageDisplay.src = 'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png';
    fetchGeo( locationInput.value );
} );

// Copyright © 2019 Luke Peavey
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

async function getRandomQuote() {
    const url = 'https://api.quotable.io/quotes/random';
    const response = await fetch( url );
    const randomQuote = await response.json();
    randomQuoteDisplay.innerHTML = randomQuote[0].content;
    quoteAuthorDisplay.innerHTML = randomQuote[0].author;
}
getRandomQuote();

// this way is absolutely cursed why would anyone not use async await
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
