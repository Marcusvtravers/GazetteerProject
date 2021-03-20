<?php

	$executionStartTime = microtime(true) / 1000;
    $url='https://openexchangerates.org/api/latest.json?app_id=d7d506f2e88147e3979eb3637746ba79&symbols=' . $_REQUEST['symbols'] . '';

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
	$output['data'] = $decode['rates'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($decode); 

?>