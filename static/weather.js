//ToDo:
//-Add error handling if user does not allow location to be known
//-Add additional testing




  $(document).ready(function() {

    // sunny[0], overcast[1], raining[2], thunder[3], snow[4], default[5]
    weatherBackgrounds = ["static/sunny.png", "static/overcast.jpg", "static/rain.jpg", "static/thunder.png","static/snow.jpg", "static/default.png", "static/default2.jpg" ];


  function getWeather() {
    var coords = {
      lat: latitude,
      lon: longitude,
    };

    $.get("/get-weather", coords, function(results){

      weatherObject = JSON.parse(results);
      var weather = weatherObject[0];
      var icon = weatherObject[1];
      var humidity = weatherObject[2];
      var temp = weatherObject[3];


      // select the correct background image based on the local weather
      // if none found, default to generic image
      if (weather === 'sunny') {
        image = weatherBackgrounds[0];
      } else if (weather === 'overcast') {
        image = weatherBackgrounds[1];
      } else if (weather === 'rain') {
        image = weatherBackgrounds[2];
      } else if (weather === 'thunderstorm') {
        image = weatherBackgrounds[3];
      } else if (weather === 'snow') {
        image = weatherBackgrounds[4];
      } else {
        image = weatherBackgrounds[6];
      }


      $('#name').css('background-image', 'url(' + image + ')');
      $('#display-temp').html(temp + '°C');
      $('#display-weather').html(weather);
      $('#display-humidity').html("humidity: " + humidity);
      $('#display-icon').attr("src", icon);

      var farenheit = (parseInt(temp) * 1.8) + 32;

      var ckbox = $('#Farenheit');
      $('input').on('click', function() {
        if (ckbox.is(':checked')) {
          $('#display-temp').html(farenheit + '°F');
        }
      });
    });
  }



  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          console.log("lat: " + latitude);

          getWeather(latitude, longitude);
        });
    // } else {
    //     x.innerHTML = "Geolocation is not supported by this browser.";
    // }

    }
  }


  getLocation();

  });