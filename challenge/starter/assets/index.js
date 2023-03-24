// Get the current date and time
var now = moment();

// Format the date and time in a specific way
var formattedDate = now.format('MMM D, YYYY');
var formattedTime = now.format('h:mm A');

// Define the API endpoint URL and parameters
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
var apiKey = 'YOUR_API_KEY';
var city = 'New York';
var countryCode = 'US';

// Build the full API URL with parameters
var fullUrl = apiUrl + '?q=' + city + ',' + countryCode + '&appid=' + apiKey;

// Use the Fetch API to retrieve the weather data
fetch(fullUrl)
  .then(response => response.json())
  .then(data => {
    // Use the weather data in your dashboard
    var temperature = data.main.temp;
    var weatherDescription = data.weather[0].description;
  });
// Update the date and time elements in your HTML
document.getElementById('date').textContent = formattedDate;
document.getElementById('time').textContent = formattedTime;

// Update the weather elements in your HTML
document.getElementById('temperature').textContent = temperature;
document.getElementById('weather-description').textContent = weatherDescription;
