<?php

	$executionStartTime = microtime(true) / 1000;

	$url='../../countryBorders.geo.json';

	$result=file_get_contents($url);
	$decode = json_decode($result,true);	


	$final = [];
	$val = $_POST['value'];
	$length = count($decode['features']);

	
	for($x = 0; $x < $length; $x++){
		$temp = null;
		$valborder = $decode['features'][$x]['properties']['iso_a2'];
		if($val === $valborder){
			$border = $decode['features'][$x];
			array_push($final, $border);
		}
	};
	
	
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $final;
	

	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>