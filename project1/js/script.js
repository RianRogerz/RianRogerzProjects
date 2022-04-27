$(document).ready(function() {

    $("#map").css("margin-top", $(".navbar").height()+ 15);
    //$("#map").css("height", $("#map").height() - $(".navbar").height() - 15);

});

const layer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

$(function() {
        
    var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
       
};
    
function success(pos) {
        
    var crd = pos.coords;

    var map = L.map('map').setView([crd.latitude, crd.longitude], 5);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=KFnFMvZDROFAXFHOkVa2',{
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true
                
}).addTo(map);
 
    var marker = L.marker([crd.latitude, crd.longitude]).bindTooltip("You are here!", {
        permanent: true, 
        direction: 'right'
    }
                                                                     
).addTo(map);
    
    let address;
    let postcode;
    let countryISO2;
    let countryISO3;
    let country;
    let countryCode;
    let countryFlag;
    let countryTimezone;
    let countryTimezoneName;
    let currencyISO;
    let currencyISONumeric;
    let currencyHTML;
    let currencySymbol;
    let currencyName;
    let currencySubUnit;
    let currencySubUnitToUnit;
    
    $.ajax({
      url: 'https://api.opencagedata.com/geocode/v1/json',
      method: 'GET',
      async:false,
      data: {
        'key': '5783d30c5b6c4f8186d2c040eb0a6dfc',
        'q': crd.latitude+", "+crd.longitude
      },
      dataType: 'json',
      statusCode: {
        200: function(response){ 
            
            address = (response.results[0].formatted);
            postcode = (response.results[0]['components']['postcode']).replace(/\s+/g, '');
            countryISO2 = (response.results[0]['components']['ISO_3166-1_alpha-2']);
            countryISO3 = (response.results[0]['components']['ISO_3166-1_alpha-3']);
            country = (response.results[0]['components']['country']);
            countryCode = (response.results[0]['components']['country_code']);
            countryFlag = (response.results[0]['annotations']['flag']);
            
            countryTimezone = (response.results[0]['annotations']['timezone']['name']);
            countryTimezoneName = (response.results[0]['annotations']['timezone']['short_name']) + (response.results[0]['annotations']['timezone']['offset_string']);
            
            currencyISO = (response.results[0]['annotations']['currency']['iso_code']);
            currencyISONumeric = (response.results[0]['annotations']['currency']['iso_numeric']);
            currencyHTML = (response.results[0]['annotations']['currency']['html_entity']);
            currencySymbol = (response.results[0]['annotations']['currency']['symbol']);
            currencyName = (response.results[0]['annotations']['currency']['name']);
            currencySubUnit = (response.results[0]['annotations']['currency']['subunit']);
            currencySubUnitToUnit = (response.results[0]['annotations']['currency']['subunit_to_unit']);

        },
        402: function(){
        }
      }
    })
    
    console.log(address);
    console.log(postcode);
    console.log(countryISO2);
    console.log(countryISO3);
    console.log(country);
    console.log(countryCode);
    console.log(countryFlag);
    
    console.log(countryTimezone);
    console.log(countryTimezoneName);
    
    console.log(currencyISO);
    console.log(currencyISONumeric);
    console.log(currencyHTML);
    console.log(currencySymbol);
    console.log(currencyName);
    console.log(currencySubUnit);
    console.log(currencySubUnitToUnit);
    console.log(crd.accuracy);
    
    let name;
    let capital;
    let domain;
    let population;
    let subRegion;
    let region;
    let pngFlag;
    let callingCode;

getCountryInfo(countryISO2);
    
getWIKIInfo(postcode, countryISO2);
    
applyCountryBorder(map, countryISO2);
    
    console.log(name);
    console.log(capital);
    console.log(domain);
    console.log(population.toLocaleString());
    console.log(subRegion);
    console.log(region);
    console.log(pngFlag);
    console.log(callingCode);
    
    $('#countryModal #countryAddress').html("GeoLocation points you at "+address+"<ion-icon id='addressPin' name='pin'></ion-icon>");
    $('#countryModal #countryModalTitle').text(country);
    $('#countryModal #countryModalImage').attr("src",pngFlag);
    $('#countryModal #countryPopulation').text(population.toLocaleString());
    $('#countryModal #countryCapital').text(capital);
    $('#countryModal #countryRegions').text(subRegion+" / "+region);
    $('#countryModal #countryTimezones').text(countryTimezone+" "+countryTimezoneName);
    $('#countryModal #countryDomain').text(domain);
    $('#countryModal #countryMobilePrefix').text("+"+callingCode);

    $("#countryModal").modal('show'); 

function applyCountryBorder(map, countryname) {
  jQuery
    .ajax({
      type: "GET",
      dataType: "json",
      url:
        "https://nominatim.openstreetmap.org/search?country=" +
        countryname.trim() +
        "&polygon_geojson=1&format=json"
    })
    .then(function(data) {
      L.geoJSON(data[0].geojson, {
        color: "black",
        weight: 5,
        opacity: 1,
        fillOpacity: 0.0 
      }).addTo(map);
    });
}
    
function getCountryInfo(countryname) {   
  jQuery
    .ajax({
      type: "GET",
      dataType: "json",
      async:false,
      data: {
            country: countryname,
			},
      url:
          'php/getCountryInfo.php',
      
      success: function(result) {
          
                console.log(JSON.stringify(result));
          
                name = result['data']['name'];
                capital = result['data']['capital'];
                domain = result['data']['topLevelDomain'][0];
                population = result['data']['population'];
                subRegion = result['data']['subregion'];
                region = result['data']['region'];
                pngFlag = result['data']['flags']['png'];
                callingCode = result['data']['callingCodes'][0];
          
        },
        error: function(jqXHR, textStatus, errorThrown) {
				  
        }
    })
};
      
function getWIKIInfo(thePostcode, theCountryISO) {   
  jQuery
    $.ajax({
			url: "php/wikipediaSearch.php",
			type: 'GET',
			dataType: 'json',
            async: false,
			data: {
                postcode: thePostcode,
				countryISO2: theCountryISO,
			},
			success: function(result) {

				console.log(JSON.stringify(result));
                 
                    $('#WIKIModal #txtTitle').html(result['data'][0]['title']);
					$('#WIKIModal #txtSummary').html(result['data'][0]['summary']);
                    $('#WIKIModal #txtURL').html("Visit "+result['data'][0]['title']+" Wiki page");
                    $("#WIKIModal #txtURL").attr("href","https://"+result['data'][0]['wikipediaUrl']);
                    $('#WIKIModal #txtCountryURL').html("Visit "+country+" Wiki page");
                    $("#WIKIModal #txtCountryURL").attr("href","https://en.wikipedia.org/wiki/"+country.split(' ').join('_'));

            },
			error: function(jqXHR, textStatus, errorThrown) {
			
			}
		});
};
     
   L.easyButton('<ion-icon style="font-size:30px;margin-left:-6px;margin-top:-1px;color:red;" name="information-circle"></ion-icon>', function(btn, map){
    $("#countryModal").modal('show'); 
   }).addTo(map);
    
   L.easyButton('<ion-icon style="font-size:30px;margin-left:-6px;margin-top:-1px;color:purple" name="help-circle"></ion-icon>', function(btn, map){
    $("#countryModal2").modal('show');      

    $('#countryModal2 #countryModalTitle').text(country);
    $('#countryModal2 #countryModalImage').attr("src",pngFlag);
    $('#countryModal2 #countryTimezones').text(countryTimezone+" "+countryTimezoneName);
    $('#countryModal2 #countryDomain').text(domain);
    $('#countryModal2 #countryMobilePrefix').text("+"+callingCode); 
       
   }).addTo(map);
    
   L.easyButton('<ion-icon style="font-size:30px;margin-left:-6px;margin-top:-1px;color:black;" name="globe"></ion-icon>', function(btn, map){
     $("#WIKIModal").modal('show');  
       
}).addTo(map);
    
   let countryWeatherIcon;    
    
   let countryWeatherMain;
   let countryWeatherDesc;

   let countryKelvin;
   let countryCelcius;
   let countryFarenheit;
    
   let countryWindspeed;
   let countryWindspeedMPH;
    
   let countryHumidity;
        
   L.easyButton('<ion-icon style="font-size:30px;margin-left:-6px;margin-top:-1px;color:blue;" name="cloud-circle"></ion-icon>', function(btn, map){
     $("#weatherModal").modal('show');      
    $.ajax({
			url: "php/getWeatherData.php",
			type: 'GET',
			dataType: 'json',
            async: false,
			data: {
                lat: crd.latitude,
				lng: crd.longitude,
			},
			success: function(result) {

				console.log(JSON.stringify(result));
                
                countryWeatherIcon = result['data']['weather'][0]['icon'];
                
                countryWeatherMain = result['data']['weather'][0]['main'];
                countryWeatherDesc = result['data']['weather'][0]['description'];

                countryKelvin = result['data']['main']['temp'];
                countryCelcius = result['data']['main']['temp'] - 273.15;
                countryFarenheit = (countryCelcius * 1.8) + 32;
                
                countryWindspeed = result['data']['wind']['speed']; 
                countryWindspeedMPH = countryWindspeed * 2.2369; 
                
                countryHumidity = result['data']['main']['humidity'];

                $('#weatherModal #countryWeatherIcon').attr("src","http://openweathermap.org/img/w/" + countryWeatherIcon + ".png");
                $('#weatherModal #countryWeatherIcon').css("width", "110px");
                
                $('#weatherModal #countryWeatherMain').text(countryWeatherMain.toUpperCase());
                $('#weatherModal #countryWeatherDesc').text(countryWeatherDesc.toUpperCase());
                $('#weatherModal #countryWeatherDesc').css("font-size", "16px");
                
                $('#weatherModal #countryKelvin').text(countryKelvin.toFixed(2) + " K");
                $('#weatherModal #countryCelcius').text(countryCelcius.toFixed(2) + " °C");
                $('#weatherModal #countryFarenheit').text(countryFarenheit.toFixed(2) + " °F");

                $('#weatherModal #countryWindspeed').text(countryWindspeed.toFixed(2) + " m/s"); 
                $('#weatherModal #countryWindspeedMPH').text(countryWindspeedMPH.toFixed(2) + " mph");
                
                $('#weatherModal #countryHumidity').text(countryHumidity + " %");
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			
			}
		}); 
       
        }).addTo(map);
        
        L.easyButton('<ion-icon style="font-size:30px;margin-left:-6px;margin-top:-1px;color:darkgreen;" name="logo-usd"></ion-icon>', function(btn, map){
            $("#currencyModal").modal('show'); 
            $('#currencyModal #currencyExchangeRow').hide();
            $('#currencyModal #currencyRates:nth-child(2)').hide();
            $.ajax({
                url: "php/getCurrencyData.php",
                type: 'GET',
                dataType: 'json',
                async: false,
                data: {
                    lat: crd.latitude,
                    lng: crd.longitude,
                },
                success: function(result) {

				console.log(JSON.stringify(result));
                
                $('#currencyModal #currencyISO').text(currencyISO+" / "+currencyISONumeric);
                $('#currencyModal #currencyName').text(currencySymbol+" "+currencyName);
                $('#currencyModal #currencySubunit').text(currencySubUnitToUnit+" "+currencySubUnit);
                $('#currencyModal #currencyNameRates').text("Rates for "+currencyISO+" to:");
                
                $('#selCurrency').on('change', function() {
                let selectCurrency = $('#selCurrency').val();
                $('#currencyModal #currencyRates').text(result['data']['rates'][selectCurrency]);
                $('#currencyModal #currencyExchange').text("1.00 "+currencyISO+" = "+(1 * result['data']['rates'][selectCurrency]).toFixed(2)+" "+$('#selCurrency').val());
                $('#currencyModal #currencyExchangeRow').show();
                $('#currencyModal #currencyRates:nth-child(2)').show();
                    
                });
                               
                },
                error: function(jqXHR, textStatus, errorThrown) {
			
                }
            }); 
       
            }).addTo(map);
    
    L.easyButton('<ion-icon style="font-size:30px;margin-left:-6px;margin-top:-1px;color:orange;" name="pin"></ion-icon>', function(btn, map){
    
    map.setView([crd.latitude, crd.longitude], 15);

    }).addTo(map);
    
    L.easyButton('<ion-icon style="font-size:30px;margin-left:-6px;margin-top:-1px;color:brown;" name="earth"></ion-icon>', function(btn, map){
    
    map.setView([crd.latitude, crd.longitude], 2);

    }).addTo(map);
    
    L.easyButton('<ion-icon style="font-size:30px;margin-left:-6px;margin-top:-1px;color:grey;" name="locate"></ion-icon>', function(btn, map){
    
    map.setView([crd.latitude, crd.longitude], 5);

    }).addTo(map);
     
} 
    
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
      
});

$("#countryBtn").click(function(){
        $("#countryModal").modal('hide');
}); 

$("#country2Btn").click(function(){
        $("#countryModal2").modal('hide');
}); 

$("#weatherBtn").click(function(){
        $("#weatherModal").modal('hide');
}); 

$("#WIKIBtn").click(function(){
        $("#WIKIModal").modal('hide');
}); 

$("#currencyBtn").click(function(){
        $("#currencyModal").modal('hide');
}); 