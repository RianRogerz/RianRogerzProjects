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
					$('#txtCountry').html(result['data'][0]['countryCode']);
					$('#txtCity').html(result['data'][0]['title']);
					$('#txtLanguage').html(result['data'][0]['lang']);
					$('#txtLongitude').html(result['data'][0]['lng']);
					$('#txtLatitude').html(result['data'][0]['lat']);
					$('#txtSummary').html(result['data'][0]['summary']);
                    $('#txtURL').html("Link to "+result['data'][0]['title']+" Wiki page");
                    $("#txtURL").attr("href","https://"+result['data'][0]['wikipediaUrl']);
                    $("#wikiImage").attr("src",result['data'][0]['thumbnailImg']);
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
					$('#txtPostcodeLongitude').html(result['data'][0]['lng']);
					$('#txtPostcodeLatitude').html(result['data'][0]['lat']);
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				  
			}
		}); 
	
	});