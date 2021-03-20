<?php

	$executionStartTime = microtime(true) / 1000;

	$url='https://corona-api.com/countries';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

    
	$decode = json_decode($result,true);	
	$arr =[];
	$length = count($decode['data']);

	for($x = 0; $x < $length; $x++){
		$temp = null;
		$temp['code'] = $decode['data'][$x]['code'];
		$temp['name'] = $decode['data'][$x]['name'];
		$temp['cases_per_million'] = number_format($decode['data'][$x]['latest_data']['calculated']['cases_per_million_population']);
		$temp['death_rate'] = round($decode['data'][$x]['latest_data']['calculated']['death_rate'], 1);
		$temp['recovery_rate'] = round($decode['data'][$x]['latest_data']['calculated']['recovery_rate'],1);	
		$temp['confirmed'] = number_format($decode['data'][$x]['latest_data']['confirmed']);
		$temp['critical'] = number_format($decode['data'][$x]['latest_data']['critical']);
		$temp['deaths'] = number_format($decode['data'][$x]['latest_data']['deaths']);
		$temp['recovered'] = number_format($decode['data'][$x]['latest_data']['recovered']);
		$temp['confirmed_today'] = $decode['data'][$x]['today']['confirmed'];
		$temp['deaths_today'] = $decode['data'][$x]['today']['deaths'];
		$temp['updated_at'] = $decode['data'][$x]['updated_at'];
		array_push($arr, $temp);
	};
	
	
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $arr;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>