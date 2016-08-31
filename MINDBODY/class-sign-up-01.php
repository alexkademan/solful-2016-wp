<?php
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';


if(
	isset($_GET['clientID'])
	&& isset($_GET['classID'])
	&& !isset($_GET['cancel'])
){
	// time to join a class!!!!!
	$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );

	$enroll = $mb->AddClientsToClasses([
		'ClientIDs' => [$_GET['clientID']],
		'ClassIDs' => [$_GET['classID']],
		'Test' => false,
		'RequirePayment' => true
	]);

	// print_r($enroll);
	echo json_encode($enroll);


} elseif(
	isset($_GET['clientID'])
	&& isset($_GET['classID'])
	&& isset($_GET['cancel'])
){
	// time to CANCEL a class!!!!!
	$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );

	$enroll = $mb->RemoveClientsFromClasses([
		'ClientIDs' => [$_GET['clientID']],
		'ClassIDs' => [$_GET['classID']],
		'Test' => false,
		'SendEmail' => true,
		'LateCancel' => true
	]);

	// print_r($enroll);
	echo json_encode($enroll);








} else {
	echo json_encode('"error: "' . __DIR__);
}
