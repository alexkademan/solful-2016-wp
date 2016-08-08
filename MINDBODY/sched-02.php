<?php
session_start();
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';


if(
	isset($_SESSION['MINDBODY']['schedule'])
	&& (time() - $_SESSION['MINDBODY']['schedule']['time']) < $mb_config['sessionLifespan']
) {
	// print_r($_SESSION['MINDBODY']['schedule']['info']);

} else {
	unset($_SESSION['MINDBODY']['schedule']);


	if(isset($_GET['startTime'])){
		$sched_start = date('c', $_GET['startTime']);
		// 3600 seconds in an hour
		// 86400 seconds in a day
		// 604800 is the number of seconds in a week
		// 518400 is the number of seconds in 6 days. Show today plus the rest of a week.
		// 1123200 13 days
		$sched_end = date('c', $_GET['startTime'] + 518400);
	} else {
		$sched_start = date('c');
		$sched_end = date('c', strtotime('today + 7 days'));
	};

	$start_stop_dates = [
		'StartDateTime'=> $sched_start,
		'EndDateTime'=> $sched_end
	];

	$class_info = new get_MINDBODY_classes( $mb_config );
	$data = $class_info->getScheduleData( $start_stop_dates );

	if(gettype($data) == 'string') {
		// it returned an error of some sort:
		echo 'this thing was a string all along....';
	} elseif(gettype($data) == 'array') {
		// this is probably running correctly then:
		$data = json_encode($data);
		// print_r( $data );

		unset($_SESSION['MINDBODY']['schedule']);
		$_SESSION['MINDBODY']['schedule']['time'] = time();
		$_SESSION['MINDBODY']['schedule']['info'] = $data;

	}
}

// print_r($_SESSION['MINDBODY']['schedule']['time']);
// echo "\n";
// print_r(time());
// echo "\n\n\n\n";

print_r($_SESSION['MINDBODY']['schedule']['info']);
