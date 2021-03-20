<?php

	$executionStartTime = microtime(true) / 1000;

	$url='https://restcountries.eu/rest/v2/alpha/' . $_REQUEST['countrycode'] . '/';
  
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

	$output['data']['currency_code'] = $decode['currencies'][0]['code'];
	$output['data']['currency_symbol'] = $decode["currencies"][0]["symbol"];
	$output['data']['currency_name'] = $decode["currencies"][0]["name"];
	$output['data']['demonym'] = $decode["demonym"];
	$output['data']['language'] = $decode["languages"][0]["name"];
	$output['data']['borders'] = $decode['borders'];
	$output['data']['subregion'] = $decode['subregion'];
	$output['data']['flag'] = $decode['flag'];

	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
