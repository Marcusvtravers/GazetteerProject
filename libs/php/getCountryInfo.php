<?php

	$executionStartTime = microtime(true) / 1000;

	$url='http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=' . $_REQUEST['country'] . '&username=marcusvtravers&style=full';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);
	
	$decode = json_decode($result,true);	
			
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";



	$output['data']['country'] = $decode['geonames'][0]['countryName'];	
	$output['data']['capital'] = $decode['geonames'][0]['capital'];
	$output['data']['population'] = number_format($decode['geonames'][0]['population']);
	$output['data']['iso_a3'] = $decode['geonames'][0]['isoAlpha3'];
	$output['data']['area'] = number_format($decode['geonames'][0]['areaInSqKm']);
	$output['data']['countryCode'] = $decode['geonames'][0]['countryCode'];
	$output['data']['continent'] = $decode['geonames'][0]['continentName'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>