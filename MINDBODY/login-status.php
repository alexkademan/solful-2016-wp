<?php
session_start();

if( isset($_GET['leave']) && isset($_SESSION['MINDBODY']['login'])){
	// time to log off:
	unset($_SESSION['MINDBODY']['login']);
}elseif( isset($_GET['un']) && isset($_GET['pw'])) {
	// now we have to actually log in:
	require_once __DIR__ . '/mb-config.php';
	require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
	$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );
	
	$validateLogin = $mb->ValidateLogin(array(
		'Username' => $_POST['username'],
		'Password' => $_POST['password']
	));
}

if(!isset($_SESSION['MINDBODY']['login'])){
	$_SESSION['MINDBODY']['login'] = 'stranger';
}
print_r( json_encode($_SESSION['MINDBODY']['login']) );
