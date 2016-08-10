<?php
session_start();
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';

$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );


if(!isset($_SESSION['MINDBODY']['login'])) {
	$_SESSION['MINDBODY']['login'] = 'stranger';
}

print_r( json_encode($_SESSION['MINDBODY']['login']) );
