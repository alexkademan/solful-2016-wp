<?php
/*
*	This file is just to check on the user info stored in the SESSION
*	and return what is there.
* ALSO, it can destroy the session "login" array,
* effectively logging the user out.
*/
session_start();
if( isset($_GET['leave']) && isset($_SESSION['MINDBODY']['login'])){
	// time to log off:
	unset($_SESSION['MINDBODY']['login']);
}
// user is logged out, so return the string: 'stranger'
if(!isset($_SESSION['MINDBODY']['login'])){
	$_SESSION['MINDBODY']['login'] = 'stranger';
}

// echo 'data(';
print_r( json_encode($_SESSION['MINDBODY']['login']) );
// echo ');';	
