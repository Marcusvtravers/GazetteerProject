<?php

	$executionStartTime = microtime(true) / 1000;
    $url='https://api.opencagedata.com/geocode/v1/json?q=' . $_REQUEST['q'] . '&key=' . $_REQUEST['key'] . '&no_annotations=' . $_REQUEST['no_annotations'] . '&lang=en';

   
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
	
	$output['data']['road'] = $decode['results'][0]['components']['road'];
	$output['data']['city'] = $decode['results'][0]['components']['city'];
	$output['data']['country'] = $decode['results'][0]['components']['country'];
	$output['data']['countrycode'] = $decode['results'][0]['components']['country_code'];


	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>