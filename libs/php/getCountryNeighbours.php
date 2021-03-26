<?php

	$executionStartTime = microtime(true) / 1000;

	$url='../../countryBorders.geo.json';

	$result=file_get_contents($url);
	$decode = json_decode($result,true);	


	$final = [];
	$val = $_POST['value'];
	$length = count($decode['features']);
	$vallength = count($val);
	
	for($x = 0; $x < $vallength; $x++){
		$border1 = $val[$x];
		for ($y = 0; $y < $length; $y++ ){
		$valborder = $decode['features'][$y]['properties']['iso_a3'];
		if($border1 === $valborder){
			$border['iso_a3'] = $decode['features'][$y]['properties']['iso_a3'];
			$border['name'] = $decode['features'][$y]['properties']['name'];
			array_push($final, $border);
		}
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