<?php
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';


if( isset($_GET['un']) && isset($_GET['pw']) ){

	$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );
	$validateLogin = $mb->ValidateLogin(array(
		'Username' => $_GET['un'],
		'Password' => $_GET['pw']
	));


	if(!empty($validateLogin['ValidateLoginResult']['GUID'])) {
		session_start();
		$client_info = $validateLogin['ValidateLoginResult'];

		if(isset($_SESSION['MINDBODY']['login'])){
			// clear the way for info:
			unset($_SESSION['MINDBODY']['login']);

			$_SESSION['MINDBODY']['login']['GUID'] = $client_info['GUID'];
			$_SESSION['MINDBODY']['login']['client'] = $client_info['Client'];

			print_r(json_encode($_SESSION['MINDBODY']['login']));

		} else {
			if(!empty($validateLogin['ValidateLoginResult']['Message'])) {
				echo 'err?';
				print_r(json_encode($validateLogin['ValidateLoginResult']['Message']));
			} else {
				echo '"Invalid Login"';
			}
			echo 'uhhuuhuhuh';
		}
	}


} else {
	print_r (json_encode('missing info'));
}
