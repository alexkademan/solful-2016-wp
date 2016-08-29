<?php
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';


if(
	isset($_GET['userID'])
	&& isset($_GET['timeStart'])
	&& isset($_GET['duration'])
){

	$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );

	$schedule = $mb->GetClientSchedule([
		'ClientID' => $_GET['userID'],
		'StartDate' => date('c', $_GET['timeStart']),
		'EndDate' => date('c', $_GET['timeStart'] + $_GET['duration'])
	]);

	print_r($schedule);
	// echo json_encode($schedule);

} else {
	echo json_encode('"error: "' . __DIR__);
}
