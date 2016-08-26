<?php
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';


if(
	isset($_GET['userID'])
	&& isset($_GET['timeStart'])
	&& isset($_GET['duration'])
){

	$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );

	$schedule = $mb->GetClientVisits([
		'ClientID' => $_GET['userID'],
		'StartDate' => date('c', $_GET['timeStart']),
		'EndDate' => date('c', $_GET['timeStart'] + $_GET['duration']),
		'UnpaidsOnly' => true // documentation says this is the default, but its required nonetheless
	]);

	echo json_encode($schedule);
	// print_r($schedule);

} else {
	echo json_encode('"error: "' . __DIR__);
}
