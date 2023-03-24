//api key
let apiKey="22f003c1dfb906c0eac4952b94e79b73";

//variables
var city;
var latitude;
var longitude;

var today = $("#today");
var forecast = $("#forecast");
var input = $(".form-input");
var cityNow= $("#cityNow");
var tempNow= $("#tempNow");
var windNow= $("#windNow");
var humidNow= $("#humidNow");
var buttonlist = $(".buttonlist");

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
  
      // Log the queryURL
      console.log(queryURL);
  
      // Log the resulting object
      console.log(response);
  
      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      
      // Convert the temp to Celsius
      var tempC = response.main.temp - 273.15;
  
      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempC").text("Temperature (C) " + tempC.toFixed(2));
  
      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (C): " + tempC);
    });