// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const dateDisplay = document.querySelector( '.date' );
const timeDisplay = document.querySelector( '.hour' );

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
