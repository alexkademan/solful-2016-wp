<?php
session_start();
// foreach($_SESSION as $key => $value) {
// 	unset($_SESSION[$key]);
// }
unset($_SESSION['MINDBODY']['login']);
header('location:login-01.php');
?>
