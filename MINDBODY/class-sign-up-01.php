<?php
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';


if(
	isset($_GET['clientID'])
	&& isset($_GET['classID'])
){

	$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );

	$enroll = $mb->AddClientsToClasses([
		'ClientIDs' => [$_GET['clientID']],
		'ClassIDs' => [$_GET['classID']]
	]);

	// print_r($enroll);
	echo json_encode($enroll);

} else {
	echo json_encode('"error: "' . __DIR__);
}
