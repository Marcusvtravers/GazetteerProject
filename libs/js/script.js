
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

Thunderforest_Landscape = L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '1eccea5134314562a5aa86cd7a01e8da',
	maxZoom: 22
});


var map = L.map('map',{
  zoomControl: false,
  layers: [Esri_WorldImagery, Thunderforest_Landscape]
}).setView([0,0], 3);

var baseMaps = {
  "Satelite" : Esri_WorldImagery,
  "Streets" : Thunderforest_Landscape

};

L.control.layers(baseMaps, null, {position: 'bottomright'}).addTo(map);

var popup = L.popup();



var capitalIcon = L.ExtraMarkers.icon({
  icon: 'fa-dot-circle',
  markerColor: 'red',
  iconColor: 'white',
  shape: 'square',
  prefix: 'far'
});
var cityIcon = L.ExtraMarkers.icon({
  icon: 'fa-dot-circle',
  markerColor: 'yellow',
  iconColor: 'white',
  shape: 'square',
  prefix: 'far'
});
var welcomeIcon = L.ExtraMarkers.icon({
  icon: 'fa-dot-circle',
  markerColor: 'cyan',
  iconColor: 'white',
  shape: 'square',
  prefix: 'far'
});


var marker = L.marker();


//Making a function that asks for permission from the user to share their location, then place a marker with a welcome message and instructions on what gazetteer does. 
function success(pos) {

  var crd = pos.coords;
  var latlng = `${crd.latitude},${crd.longitude}`
  $.ajax({
    url: 'libs/php/getOpenCage.php',
    type: 'GET',
    data: {
      'key': '4bf6c8977b574b13989a6f8607c716e3',
      'q': latlng,
      'no_annotations': 1
    },
    dataType: 'json',
    success:function(res){
      
      const countrycode = res.data.countrycode.toUpperCase();
      $('#countryselect').val(countrycode).change();
      const road = res.data.road;
      const city = res.data.city;
      const country = res.data.country;

      marker = L.marker([crd.latitude, crd.longitude], {icon:welcomeIcon}).bindPopup(`<b>Welcome to Gazetteer!</b> 
      </br>Thank you for joining us from ${road} - ${city}, ${country}.
      </br> Please use the select bar to select a country to discover information about a chosen country.
      `)
      marker.addTo(map).openPopup();
      var latLngs = [marker.getLatLng()];
      var markerBounds = L.latLngBounds(latLngs)
      map.flyToBounds(map.fitBounds(markerBounds,{maxZoom: 6})) 
      
    }
  })
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);




//Using a ajax call to populate the select menu

$.fn.selectMenu = function(){

  $.ajax({
    url: 'libs/php/getSelect.php',
    type: 'GET',
    dataType: "JSON",
    success: function(result){
    
      
      const select = document.getElementById('countryselect')
      for (let j = 0; j < result.data.length; j++){
        const element = document.createElement('option');
        const countryName = result.data[j].name;
        const selectValue = result.data[j].code;
        element.textContent = countryName;
        element.value = selectValue
        select.appendChild(element);

      }
      
    },
    error: function(error){
      console.log(error)
    }
  })

}

var zoomin = L.easyButton('<i class="fa fa-search-plus">',function(btn, map){
  map.setZoom(map.getZoom() + 1)
}).addTo(map);
/*zoomin.button.style.height = '35px';
zoomin.button.style.width = '35px';*/
zoomin.button.style.backgroundColor = '#198754';


var zoomout = L.easyButton('<i class="fa fa-search-minus">',function(btn, map){
  map.setZoom(map.getZoom() - 1)
}).addTo(map);
/*zoomout.button.style.height = '35px';
zoomout.button.style.width = '35px';*/
zoomout.button.style.backgroundColor = '#198754';

var countrybtn = L.easyButton('<div class="backButton"><i class="fa fa-info"></i></div>', function(btn, map){
  if ($('#countryselect').val() === null){
    $('#alert').modal('show');
  }else{
      $("#countryInfo").modal('show');
  }
}).addTo(map);

/*countrybtn.button.style.height = '35px';
countrybtn.button.style.width = '35px';*/
countrybtn.button.style.backgroundColor = '#198754';


var weatherbtn = L.easyButton('<i class="fas fa-cloud-sun"></i>', function(btn, map){
  if ($('#countryselect').val() === null){
    $('#alert').modal('show');
  }else{
  $("#weatherInfo").modal('show');
  }
}).addTo(map);

/*weatherbtn.button.style.height = '35px';
weatherbtn.button.style.width = '35px';*/
weatherbtn.button.style.backgroundColor = '#198754';

var newsbtn = L.easyButton('<i class="far fa-newspaper"></i>', function(btn, map){
  if ($('#countryselect').val() === null){
    $('#alert').modal('show');
  }else{
  $("#newsInfo").modal('show');
  }
}).addTo(map);

/*newsbtn.button.style.height = '35px';
newsbtn.button.style.width = '35px';*/
newsbtn.button.style.backgroundColor = '#198754';

var holidaybtn = L.easyButton('<i class="fas fa-umbrella-beach"></i>', function(btn, map){
  if ($('#countryselect').val() === null){
    $('#alert').modal('show');
  }else{
  $("#holidayInfo").modal('show');
  }
}).addTo(map);

/*holidaybtn.button.style.height = '35px';
holidaybtn.button.style.width = '35px';*/
holidaybtn.button.style.backgroundColor = '#198754';

var covidbtn = L.easyButton('<i class="fas fa-virus"></i>', function(btn, map){
  if ($('#countryselect').val() === null){
    $('#alert').modal('show');
  }else{
  $("#covidInfo").modal('show');
  }
}).addTo(map);

/*covidbtn.button.style.height = '35px';
covidbtn.button.style.width = '35px';*/
covidbtn.button.style.backgroundColor = '#198754';

// function for using the nav bar select
$('#countryselect').change(function(){
 
  $('#countryInfoButton').click(function(){
    $('#countryInfo').modal('show');
  })
  $('#weatherInfoButton').click(function(){
    $('#weatherInfo').modal('show');
  })
  $('#newsInfoButton').click(function(){
    $('#newsInfo').modal('show');
  })
  $('#covidInfoButton').click(function(){
    $('#covidInfo').modal('show');
  })
  $('#holidayInfoButton').click(function(){
    $('#holidayInfo').modal('show');
  })
  
  if (marker){
    map.removeLayer(marker)
  }
  let val = $('#countryselect').val()
  
  //Using the value of the country selected in the select bar to the retrieve the border data from the countryBorders.geo.json file 
    $.ajax({
        url: 'libs/php/getCountryBorders.php',
        type: "POST",
        dataType: "JSON",
        data: {
          value: val
        },
        success: function(result){  


        const bordercode = result.data[0].properties.iso_a2
        const outline = result.data[0]
       
              var myLayer = L.geoJSON(outline).addTo(map) 
                if (myLayer){
                  $('#countryselect').change(function(){
                    myLayer.clearLayers();
                  })
                  map.on('click', function(){
                    myLayer.clearLayers();
                    
                  })    
                }  
            map.flyToBounds(myLayer.getBounds(), {"duration":1.25})
              

          // Retrieving the covid data using the select menu
            $.ajax({
              url: "libs/php/getCovidData.php",
              type: 'GET',
              dataType: 'json',
              success: function(res){
               
              for (let i = 0; i < res.data.length; i++){
                const code = res.data[i].code

                if (code === bordercode){
                  
                  const updated = res.data[i].updated_at;
                  const resi = updated.replace('T', '   ')
                  const complete = resi.slice(0, -5)
                  $('#countryNameCovid').html(res['data'][i]['name'])
                  $('#confirmedCovid').html(res['data'][i]['confirmed'])
                  $('#criticalCovid').html(res['data'][i]['critical'])
                  $('#deathsCovid').html(res['data'][i]['deaths'])
                  $('#covidCasesPerMil').html(res['data'][i]['cases_per_million'])
                  
                  $('#deathRateCovid').html(res['data'][i]['death_rate'])
                  $('#recoveredCovid').html(res['data'][i]['recovered'])
                  $('#recoveryRateCovid').html(res['data'][i]['recovery_rate'])
  
                  $('#todayConfirmedCovid').html(res['data'][i]['confirmed_today'])
                  $('#todayDeathsCovid').html(res['data'][i]['deaths_today'])
                  $('#updatedAt').html(complete)

                }
              }
                
              },
              error: function(error){
                console.log(error)
              }
            })

            $.ajax({ 
              url: "./libs/php/getCountryInfo.php",
              type: "POST",
              dataType: "JSON",
              data: {
                country: bordercode
              },
              success: function(result){  
                
                const capital = result.data.capital;
            
                $('.txtcountry').html(result['data']['country'])
                $('.txtcapital').html(result['data']['capital'])
                $('.txtpopulation').html(result['data']['population'])
                $('.countryCode').html(result["data"]["countryCode"])
                $('.isoAlpha3').html(result["data"]["iso_a3"])
                $("#txtpopulation").html(result["data"]["population"]);
                $("#txtarea").html(result["data"]["area"]);
                $(".continent").html(result['data']['continent'])


                let alpha3 = result.data.iso_a3
            
                let alpha3lower = alpha3.toLowerCase()
                
                //AJAX call to retrieve data form the getRestCountries API 
                $.ajax({
                  url: './libs/php/getRestCountries.php',
                  type: "POST",
                  dataType: "json",
                  data: {
                    countrycode: alpha3lower
                  },
                  success: function(result){
                    
                    let flagurl = result.data.flag
                    const currencycode = result.data.currency_code; 
                    $(".currencysymbol").html(result["currency_symbol"])
                    $("#txtcurrency").html(result['data']["currency_name"])
                    $(".flagurl").attr("src", flagurl, result)
                    $("#demonym").html(result["data"]["demonym"])
                    $("#language").html(result["data"]["language"])
                    $("#borders").html(result["data"]["borders"])
                    $("#subregion").html(result["data"]["subregion"])
                    let borders = result.data.borders;
            
                    $.ajax({
                      url: './libs/php/getCountryNeighbours.php',
                      type: "POST",
                      dataType: "json",
                      data:{
                        value: borders
                      },
                    success:function(res){
                
                    
                        for (let i = 0; i < borders.length; i++){
                         const a3 = res.data[i]
                         
                        
                           $.ajax({
                            url: './libs/php/getRestCountries.php',
                            type: "POST",
                            dataType: "json",
                            data: {
                              countrycode: a3
                            },
                            success: function(result){  
                              
                             //this function is for the border flags to be displayed in the country information borders
                              
                                $("#bordersFullName").html(res["data"][i])
                               const bordercountry = res.data[i]
                                var table = document.getElementById('bordertable')
                              var flag = result.data.flag
                             
                                var row = `<tr>
                                 <td class=countryneighbour>${bordercountry}</td><td><img src=${flag} style="width:60px;height:40px;float:right;"></td>
                                </tr>`
                                table.innerHTML += row; 
    
                            },
                            error: function(error){
                              console.log(error)
                            }
                          })
                          
                          $('#countryselect').change(function(){
                            $('#bordertable').empty();
                          })
                       
                        }
                      
    
                                  
                    },
                    error: function(error){
                      
                    }
                  })
                    

                   
                   //AJAX call for getExchangeRates, commented out because I've run out of available API calls 
                    $.ajax({
                      url: './libs/php/getExchangeRates.php',
                      type: 'POST',
                      dataType: 'json',
                      data: {
                        symbols: currencycode
                      },
                      success: function(result){
                        
                        
                        var currencyToDollar = Math.round(result.rates[currencycode] * 100) /100;
                    
                        
                        $("#currencyToDollar").html(currencyToDollar);
                      },
                      error: function(error){
                        console.log(error);
                      }
                      
                    })
                  
                               
                      //AJAX call for the currency exhange from a given country to Euros
                    $.ajax({
                      url: 'libs/php/getEuroCurrency.php',
                      type: 'POST',
                      data: 'JSON',
                      success: function(result){
                     
                        const currency = result.data[currencycode]
                    
                        //Attaching and removinng the given currency when a new currency is clicked
                        let update = $('#currencyToEuro').append(Math.round(currency * 100) / 100)
                          if (update){
                            $('#countryselect').change(function(){
                              $('#currencyToEuro').empty();
                            })
                          }
                        },
                        error: function(error){
                          console.log(error)
                        }
                      })    
                      
                      

                    //AJAX call for the getWeather API 
                    
                    $.ajax({
                      url: './libs/php/getWeatherDiv.php',
                      type: 'POST',
                      dataType: "json",
                      data: {
                        q: `${capital},${bordercode}`
                      },
                      success: function(result){
                        
                        let txttemp = Math.round(result.data.temp)
                        let tempmax = Math.round(result.data.temp_max)
                        let tempmin = Math.round(result.data.temp_min)
                        let windspeed = Math.round(result.data.windspeed)
                        const icon = result.data.icon
                        const iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                        
                        $('.weathericon').attr('src', iconurl, result)
                        $('.weatherdiv').html(result['data']['main']);
                        
                        $('.txthumiditydiv').html(result['data']['humidity'])
                        
                        $('.feelslikediv').html(result['data']['feels_like'])
                        $('.weathermaindiv').html(result['data']['main']);
                        $('.weatherdescdiv').html(result['data']['description']);
                        $('.txthumiditydiv').html(result['data']['humidity'])
                        $('#txttemperaturediv').html(txttemp);
                        $('#tempmaxdiv').html(tempmax);
                        $('#tempmindiv').html(tempmin);
                        $('#windspeeddiv').html(windspeed);
                      },
                      error: function(error){
                        console.log(error)
                      }
                    })
                  },
                  //Error function for the getRestCountries API 
                  error: function(error){
                    console.log(error)
                  }
                })

                
                 // Using data retrieved from the result of the country select to retrieve national holiday data 
            $.ajax({
              url: 'libs/php/getNationalHolidays.php',
              type: 'GET',
              dataType: "JSON",
              data: {
                country: bordercode
              },
              success: function(result){
             
              //Using a for loop to retrieve the holidays from a given bordercode from the countryBorders.geo.json file. 
                const holiday = result.data;
                for (let i = 0; i < holiday.length; i++){
                  const holidayname = result.data[i].name;
                const holidaydate = result.data[i].date;
                const dateslice = holidaydate.slice(5)
                var table = document.getElementById('holidayTable')
                var row = `<tr>
                <td>${holidayname}</td><td>${dateslice}</td>
                </tr>`
                table.innerHTML += row;
                  
                if (row){
                  $('#countryselect').change(function(){
                    $('#holidayTable').empty();
                  })
                }
              }
                  
              },
              error: function(error){
                console.log(error)
              }
            })
            
           
            
            //AJAX call to retrieve data from the news API 
            $.ajax({
            url: "libs/php/getNews.php",
            type: 'GET',
            dataType: 'JSON',
            data: {
              'country': bordercode,  
            },
            success: function(result){
               //looping though the data to retrieve the 4 latest news articles available from the API   
 
              for (let i = 0; i < 10; i++){
                try{
                  
                const author = result.data[i].author
                const title = result.data[i].title
                const description = result.data[i].description
                const url = result.data[i].url
                const image = result.data[i].urlToImage
                const publishedAt = result.data[i].publishedAt
                const source = result.data[i].source.name
               
                const newstotal = `
                <div class="list-group" >
                <a href="${url}" class="list-group-item list-group-item-action flex-column align-items-start ">
                <img src=${image} alt="News Image" style="height:50%; width:100%;" />
                  <div class="d-flex w-100 justify-content-between">
                  
                    <h5 class="mb-1">${title}</h5>
                  </div>
                  <p class="mb-1">${description}</p>
                  <small>${author} - ${source}</small> - 
                  <small>${publishedAt}</small>
                </a>`
                  const newsNoAuthor = `
                  <div class="list-group">
                <a href="${url}" class="list-group-item list-group-item-action flex-column align-items-start ">
                <img src=${image} alt="News Image" style="height:50%; width:100%;" />
                  <div class="d-flex w-100 justify-content-between">
                  
                    <h5 class="mb-1">${title}</h5>
                  </div>
                  <p class="mb-1">${description}</p>
                  <small>${source}</small> - 
                  <small>${publishedAt}</small>
                </a>
                  `
                 
                if (image === null){
                  continue
                } 
                  
                //Attaching and removing the news to the news container div. 
                if (author !== null){
                var news = $('#containerNewsInfo').append(newstotal)
                } else {
                  var news = $('#containerNewsInfo').append(newsNoAuthor)
                }

                  if (news){
                    $('#countryselect').change(function(){
                      $('#containerNewsInfo').empty();
                    })
                  } 
                }
                catch(err){
                var news = $('#containerNewsInfo').append('There is no news available for this selected country. Please choose another country')
                if (news){
                  $('#countryselect').change(function(){
                    $('#containerNewsInfo').empty(); 
                  })
                 break; 
                }
                }                    
              }     
            },
            //Error function for the news AJAX call
            error: function(error){
              error = "There is no available news for this selected country"
              console.log(error)     
            }
          })  
           
          
         
          
                  $.ajax({
                    url: 'libs/php/getCities.php',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                      iso_a2: val
                    },
                    success: function(result){
               
                      
                    let marker = L.marker();
                    let markers = L.markerClusterGroup();

                    if(markers){
                      $('#countryselect').change(function(){
                        markers.eachLayer(function(layer){
                          markers.removeLayer(layer)
                        })
                      })
                    }
                      for (let i = 0; i < result.length; i++){

                        let countryCodeforCity = result[i].countryCode;
                        if(val === countryCodeforCity){

                        let markerLat = result[i].latitude;
                        let markerLng = result[i].longitude;
                        let cityName = result[i].name;
                        let cityPop = result[i].population;
                        let cityWiki = cityName.split(" ").join("_")

                        $.ajax({
                          url: 'libs/php/getTimezone.php',
                          type: 'POST',
                          dataType: "JSON",
                          data: {
                            lat: markerLat,
                            lng: markerLng
                          },
                          success: function(result){
                            
                            let sunrise = result.data.sunrise;
                            let last5sunrise = sunrise.substr(sunrise.length - 5);
                            let sunset = result.data.sunset; 
                            let last5sunset = sunset.substr(sunset.length - 5);
                            let time = result.data.time; 
                            let last5time = time.substr(time.length - 5);  
                            let gmtOffset = result.data.gmtOffset;
                            var str = '';
                            if (gmtOffset > 0){
                              str = `+${gmtOffset}`
                            }else {
                              str = gmtOffset;
                            }
                            
                            $('#time').html(last5time)
                            $('.txttimeformodal').html(last5time)
                            $('.txtsunriseformodal').html(last5sunrise)
                            $('.txtsunsetformodal').html(last5sunset)
                            $('#txttimezoneId').html(result['data']['timezoneId'])    
                            $('.txtgmtoffsetformodal').html(str)
                          },
                          error:function(error){
                            console.log(error)
                          }
                      })

                        if (cityName === capital){
                          marker = L.marker([markerLat, markerLng], 
                            {icon: capitalIcon}).bindPopup(`
                          <h5>${cityName} - Capital</h5>
                          <table class="table borderless">
                          <tr><td><b>Latitude:</b></td><td> ${markerLat} </td>
                          <td><b>Longitude: </b></td><td> ${markerLng} </td> </tr>
                          <tr><td><b>Time: </b></td><td><span id="time"></span> </td>
                          <td><b>Population:</b></td><td> ${cityPop} </td></tr>
                          <tr><td colspan="4"><a href=https://en.wikipedia.org/wiki/${cityWiki} target=_blank >Wikipedia</a> </td></tr>
                            </table>
                            <table class="table borderless">
                          
                          <tr><td rowspan="2"><span id="txttemp" style="font-size:2.5em;"></span>&#176 / <span id="tempmin"></span>&#176
                          </br><span class="weathermain"></span></td>
                          <td><img src="icons/iconfinder_weather-07_1530387sunrise.png"><span class="txtsunrise"></span></td><td><img src="icons/iconfinder_weather-09_1530384sunset.png"><span class="txtsunset"></span></td></tr>
                          <tr><td><img src="icons/iconfinder_Windy_3741354wind.png"><span class="windspeed"></span> mph</td><td><img src="icons/iconfinder_weather_44_2682807humidity.png"><span class="txthumidity"></span>%</td></tr>
                          </table>
                         `)
                            //AJAX call to retrieve Timezone data from the Timezone API
                         
                 

                        } else{
                          marker = L.marker([markerLat, markerLng], 
                            {icon: cityIcon}).bindPopup(`
                          <h5>${cityName}</h5>
                          <table >
                          <table class="table borderless">
                          <tr><td><b>Latitude:</b></td><td> ${markerLat} </td>
                          <td><b>Longitude: </b></td><td> ${markerLng} </td> </tr>
                          <tr><td><b>Time: </b></td><td><span class="txttime"></span> </td>
                          <td><b>Population:</b></td><td> ${cityPop} </td></tr>
                          <tr><td colspan="4"><a href=https://en.wikipedia.org/wiki/${cityWiki} target=_blank >Wikipedia</a> </td></tr>
                        </table>
                          
                          <table class="table borderless">
                          <tr><td rowspan="2"><span id="txttemp" style="font-size:2.5em;"></span>&#176 / <span id="tempmin"></span>&#176
                          </br><span class="weathermain"></span></td>
                          <td><img src="icons/iconfinder_weather-07_1530387sunrise.png"><span class="txtsunrise"></span></td><td><img src="icons/iconfinder_weather-09_1530384sunset.png"><span class="txtsunset"</span></td></tr>
                          <tr><td><img src="icons/iconfinder_Windy_3741354wind.png"><span class="windspeed"></span> mph</td><td><img src="icons/iconfinder_weather_44_2682807humidity.png"><span class="txthumidity"></span>%</td></tr>
                          
                        </table>
                         `
                          )
                        }

                        
                        markers.on('click', function(e){
                          var lat = e.latlng.lat;
                          var lng = e.latlng.lng;
                          $.ajax({
                            url: 'libs/php/getTimezone.php',
                            type: 'GET',
                            dataType: "JSON",
                            data: {
                              lat: lat,
                              lng: lng
                            },
                            success: function(result){

                              let sunrise = result.data.sunrise;
                              let last5sunrise = sunrise.substr(sunrise.length - 5);
                              let sunset = result.data.sunset; 
                              let last5sunset = sunset.substr(sunset.length - 5);
                              let time = result.data.time; 
                              let last5time = time.substr(time.length - 5);  
                              let gmtOffset = result.data.gmtOffset;
                              var str = '';
                                if (gmtOffset > 0){
                                  str = `+${gmtOffset}`
                                }else {
                                  str = gmtOffset;
                                }
                              $('#time').html(last5time)
                              $('.txttime').html(result.data.time.substr(result.data.time.length - 5))
                              $('.txtsunrise').html(last5sunrise)
                              $('.txtsunset').html(last5sunset)
                              $('#txttimezoneId').html(result['data']['timezoneId'])    
                              $('.txtgmtoffset').html(str)
                        
                              
                            },
                            error:function(error){
                              console.log(error)
                            }
                        })
                            //Making a ajax call when the mouse is hovered over a marker to retrieve weather information for each individual marker 
                          $.ajax({
                            url: './libs/php/getWeather.php',
                            type: 'GET',
                            dataType: "json",
                            data: {
                              lati: lat,
                              lngi: lng
                            },
                            success: function(result){
                             
                            //Adding data retrieved from this API to HTML 
                            const icon = result.icon
                            const iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                          
                            const txttemp = Math.round(result.data.temp)
                            const windspeed = Math.round(result.data.temp)
                            const tempmaxround = Math.round(result.data.temp_max);
                            const tempminround = Math.round(result.data.temp_min)
                              $('.weathericonmarker').attr('src', iconurl, result);
                              $('.weathermain').html(result['main']);
                              $('.weatherdesc').html(result['data']['description']);
                              $('.txthumidity').html(result['data']['humidity'])
                              $('#txttemp').html(txttemp)
                              $('.feelslike').html(result['data']['feels_like']);
                              $('#tempmax').html(tempmaxround);
                              $('#tempmin').html(tempminround);
                              $('.windspeed').html(windspeed);
                            },
                            
                            error: function(error){
                              console.log(error)
                            }
                          })

                        })
                      
                      markers.addLayer(marker)
                      markers.addTo(map)
                      }
                    
                      }
                      
                      },
                    error: function(error){
                      console.log(error)
                    }
            })
          },
            error:function(error){
              console.log(error)
            }
          })
      },
          
  
  //Error funtion for the select CountryBorders.geo.json file 
  error:function(error){
    console.log(error)
  }
        
})

})

$('#countryselect').selectMenu();