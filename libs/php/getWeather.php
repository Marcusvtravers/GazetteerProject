<?php

	$executionStartTime = microtime(true) / 1000;
    $url='http://api.openweathermap.org/data/2.5/weather?lat=' . $_REQUEST['lati'] . '&lon=' . $_REQUEST['lngi'] . '&units=metric&appid=d08a5b51dc651b0e686c4d1a2d807787';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	



	$output['data']['main'] = $decode['weather'][0]['main'];
	$output['data']['icon'] = $decode['weather'][0]['icon'];
	$output['data']['description'] = $decode['weather'][0]['description'];
	$output['data']['temp'] = $decode['main']['temp'];
	$output['data']['temp_max'] = $decode['main']['temp_max'];
	$output['data']['temp_min'] = $decode['main']['temp_min'];
	$output['data']['humidity'] = $decode['main']['humidity'];
	$output['data']['feels_like'] = $decode['main']['feels_like'];
	$output['data']['windspeed'] = $decode['wind']['speed'];
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>