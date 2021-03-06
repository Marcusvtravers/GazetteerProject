<?php

	$executionStartTime = microtime(true) / 1000;

	$url='http://api.geonames.org/timezoneJSON?lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['lng'] . '&username=marcusvtravers';
  
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
	$output['data']['time'] = $decode['time'];
	$output['data']['sunrise'] = $decode['sunrise'];
	$output['data']['sunset'] = $decode['sunset'];
	$output['data']['timezoneId'] = $decode['timezoneId'];
	$output['data']['gmtOffset'] = $decode['gmtOffset'];
	$output['datsa'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
