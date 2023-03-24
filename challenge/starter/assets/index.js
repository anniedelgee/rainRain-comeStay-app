let apiKey="22f003c1dfb906c0eac4952b94e79b73";
var forecast = $("#forecast");
var input = $(".form-input");
var currentcity = $("#currentcity");
var currenttemp = $("#currenttemp");
var currentwind = $("#currentwind");
var currenthumid = $("#currenthumid");
var buttonlist = $(".buttonlist");

var city;
var lat;
var lon;

var counter;

$("#search-button").on("click", function() {
city = input.val();
run();
if(input.val() != "")
{
    var HistoryButton = $('<button>');
    HistoryButton.addClass("btn search-button");
    HistoryButton.attr('id', 'history-button');
    HistoryButton.attr('data-id', input.val());
    HistoryButton.text(city);
    buttonlist.append(HistoryButton);

    var currentlyStored = $(".buttonlist").children().length

     if(currentlyStored == 2)
     {
        console.log("saved")
        var temp = $('.buttonlist').children().eq(1).prop('outerHTML')
        localStorage.setItem(1,temp);
     }
     if(currentlyStored == 3)
     {
        var temp = $('.buttonlist').children().eq(2).prop('outerHTML')
        localStorage.setItem(2,temp);
     }
     if(currentlyStored == 4)
     {
        var temp = $('.buttonlist').children().eq(3).prop('outerHTML')
        localStorage.setItem(3,temp);
     }
     if(currentlyStored == 5)
     {
        var temp = $('.buttonlist').children().eq(4).prop('outerHTML')
        localStorage.setItem(4,temp);
     }
     if(currentlyStored == 6)
     {
        var temp = $('.buttonlist').children().eq(5).prop('outerHTML')
        localStorage.setItem(5,temp);
     }
     if(currentlyStored == 7)
     {
        var temp = $('.buttonlist').children().eq(6).prop('outerHTML')
        localStorage.setItem(6,temp);
     }
     if(currentlyStored == 8)
     {
        var temp = $('.buttonlist').children().eq(7).prop('outerHTML')
        localStorage.setItem(7,temp);
     }
     if(currentlyStored == 9)
     {
        var temp = $('.buttonlist').children().eq(8).prop('outerHTML')
        localStorage.setItem(8,temp);
     }
     if(currentlyStored == 10)
     {
        var temp = $('.buttonlist').children().eq(9).prop('outerHTML')
        localStorage.setItem(9,temp);
     }
     if(currentlyStored == 11)
     {
        var temp = $('.buttonlist').children().eq(10).prop('outerHTML')
        localStorage.setItem(10,temp);
     }

}
});

var stored = [localStorage.getItem(1),localStorage.getItem(2),localStorage.getItem(3),localStorage.getItem(4),localStorage.getItem(5),localStorage.getItem(6),localStorage.getItem(7),localStorage.getItem(8),localStorage.getItem(9),localStorage.getItem(10)]
for(var i=0; i<stored.length; i++)
{
    var HistoryButton = $(stored[i]);
    buttonlist.append(HistoryButton);
}


$(document.body).on('click', '#history-button' ,function(){
     city = $(this).data().id;
     run();
});

$('#clear-button').on('click',function(){
    localStorage.clear();
    location.reload();
});



function run()
{  
var queryUrlGeocode = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+apiKey;
$.ajax({
  url: queryUrlGeocode,
  method: "GET"
}).then(function(response) {
    var lat = response[0].lat;
    var lon = response[0].lon;
    var queryUrlWeather = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=metric";
    $.ajax({
        url: queryUrlWeather,
        method: "GET"
    }).then(function(response) {

         
            var today = moment().format("GGGG-MM-DD");
            var todayDay = parseInt(moment().format("DD"));

            

           

            for(var i =0; i<response.list.length;i++)
            {
                var date = response.list[i].dt_txt;
                var time = date.slice(11,13)
                if(time == "00")
                {
                  counter = i;
                  break
                }
           
            }

            currentcity.text(response.city.name);
            currenttemp.text("Temp: "+response.list[0].main.temp+"°C");
            currentwind.text("Wind Speed: "+response.list[0].wind.speed);
            currenthumid.text("Humidity: "+response.list[0].main.humidity);

            
            forecast.empty();
            var addition = 0;
     
            for(var i =0; i<5;i++)
            {
         
                var forecastdiv = $('<div>');
                var header = $('<h3>');
                var icon = $('<img>');
                var temp = $('<p>');
                var wind = $('<p>');
                var humidity = $('<p>');
                var forecastDate = response.list[counter+addition].dt_txt.slice(5,10)
                header.text(forecastDate);
                temp.text("Temp: "+response.list[counter+addition].main.temp+"°C");
                wind.text("Wind Speed: "+response.list[counter+addition].wind.speed);
                humidity.text("Humidity: "+response.list[counter+addition].main.humidity);
            
                $(icon).attr("src","http://openweathermap.org/img/wn/"+response.list[counter+addition].weather[0].icon+"@2x.png");
                forecastdiv.addClass("forecastdiv")
            
                forecastdiv.append(header);
                forecastdiv.append(icon);
                forecastdiv.append(temp);
                forecastdiv.append(wind);
                forecastdiv.append(humidity);
            
                forecast.append(forecastdiv);
                addition+=8;
            }
    });
    });
}