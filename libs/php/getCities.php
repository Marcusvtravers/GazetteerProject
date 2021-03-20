<?php



$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://geohub3.p.rapidapi.com/cities/country/" . $_REQUEST['iso_a2'] . "?page=1&pageSize=10&sort=desc&orderBy=population",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"x-rapidapi-host: geohub3.p.rapidapi.com",
		"x-rapidapi-key: 7475b670e9msh37c858c1d0676c0p18973fjsn05eaddce1757"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

$arr =[];

$decode = json_decode($response, true);
$decodehere = $decode['data']['cities'];
$count = count($decodehere);


for ($x = 0; $x < $count; $x++){
	$temp = null;
	$format = null;
	$temp['name'] = $decodehere[$x]['name'];
	$temp['population'] = number_format($decodehere[$x]['population']);
	$temp['latitude'] = $decodehere[$x]['latitude'];
	$temp['longitude'] = $decodehere[$x]['longitude'];
	$temp['countryCode'] = $decodehere[$x]['countryCode'];

	array_push($arr, $temp);
	

}

echo json_encode($arr);
