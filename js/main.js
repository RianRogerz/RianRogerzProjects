var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 7000);
}

$(function() {
    $('#weatherResults, #wikiResults, #postcodeResults').hide();
});

$('#btnRun1').click(function() {

		$.ajax({
			url: "php/getWeatherInfo.php",
			type: 'POST',
			dataType: 'json',
			data: {
				icao: $('#selICAO').val(),
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {

					$('#txtDatetime').html(result['data']['datetime']);
					$('#txtCountrycode').html(result['data']['countryCode']);
					$('#txtStationname').html(result['data']['stationName']);
					$('#txtTemperature').html(result['data']['temperature']);
					$('#txtHumidity').html(result['data']['humidity']);
					$('#txtWindspeed').html(result['data']['windSpeed']);
                    $('#weatherResults').show();
                    $('#wikiResults').hide();
                    $('#postcodeResults').hide();
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			
			}
		}); 
	
	});

    $('#btnRun2').click(function() {

		$.ajax({
			url: "php/wikipediaSearch.php",
			type: 'POST',
			dataType: 'json',
			data: {
				city: $('#selCity').val(),
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {
					$('#txtCity').html(result['data'][0]['title']);
					$('#txtSummary').html(result['data'][0]['summary']);
                    $('#txtURL').html("Link to "+result['data'][0]['title']+" Wiki page");
                    $("#txtURL").attr("href","https://"+result['data'][0]['wikipediaUrl']);
                    $("#wikiImage").attr("src",result['data'][0]['thumbnailImg']);
                    $('#txtLatitude').html(result['data'][0]['lat'].toFixed(4));
					$('#txtLongitude').html(result['data'][0]['lng'].toFixed(4));
                    $("#wikiMapCoordinates").attr("src","https://maps.google.com/maps?q="+result['data'][0]['lat'].toFixed(4)+", "+result['data'][0]['lng'].toFixed(4)+"&z=15&output=embed");
                    $('#weatherResults').hide();
                    $('#wikiResults').show();
                    $('#postcodeResults').hide();
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
			
			}
		}); 
	
	});

    $('#btnRun3').click(function() {

		$.ajax({
			url: "php/getPostcodeInfo.php",
			type: 'POST',
			dataType: 'json',
			data: {
				postcode: $('#typePostcode').val(),
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {
					$('#txtCountryName').html(result['data'][0]['adminName1']);
					$('#txtCounty').html(result['data'][0]['adminName2']);
					$('#txtDistrict').html(result['data'][0]['adminName3']);
					$('#txtPostcode').html(result['data'][0]['postalcode']);
					$('#txtPlacename').html(result['data'][0]['placeName']);
                    $('#txtPostcodeLatitude').html(result['data'][0]['lat'].toFixed(5));
					$('#txtPostcodeLongitude').html(result['data'][0]['lng'].toFixed(5));
                    $("#mapCoordinates").attr("src","https://maps.google.com/maps?q="+result['data'][0]['lat'].toFixed(5)+", "+result['data'][0]['lng'].toFixed(5)+"&z=15&output=embed");
                    $('#weatherResults').hide();
                    $('#wikiResults').hide();
                    $('#postcodeResults').show();
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				  
			}
		}); 
	
	});