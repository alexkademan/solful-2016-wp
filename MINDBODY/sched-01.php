<?php

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';


if(isset($_GET['startTime'])){
	$sched_start = date('c', $_GET['startTime']);
	// 604800 is the number of seconds in a week
	// 518400 is the number of seconds in 6 days. Show today plus the rest of a week.
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
	print_r( json_encode($data));

}
