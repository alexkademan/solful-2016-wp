<?php
session_start();
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';

if( isset($_GET['un']) && isset($_GET['pw']) && isset($_GET['loginTime']) ){

	$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );
	$validateLogin = $mb->ValidateLogin(array(
		'Username' => $_GET['un'],
		'Password' => $_GET['pw']
	));


	if(!empty($validateLogin['ValidateLoginResult']['GUID'])) {
		// we just logged in. So set up the session:
		$client_info = $validateLogin['ValidateLoginResult'];

		if(isset($_SESSION['MINDBODY']['login'])){
			// clear the way for info:
			unset($_SESSION['MINDBODY']['login']);
		}

		$_SESSION['MINDBODY']['login']['GUID'] = $client_info['GUID'];
		$_SESSION['MINDBODY']['login']['client'] = $client_info['Client'];
		$_SESSION['MINDBODY']['login']['loginTime'] = $_GET['loginTime'];

		echo json_encode($_SESSION['MINDBODY']['login']);

	} else {
		// echo json_encode($validateLogin);
	}


} else {
	// you didn't supply the proper arguments
	echo json_encode("error: " . __DIR__);
}
