<?php

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';
// require_once __DIR__ . '/functions/mb_show_classes.php';

// $sched_start = date('c');
$sched_start = date('c', strtotime('today + 2 days'));
$sched_end = date('c', strtotime('today + 2 days'));

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
