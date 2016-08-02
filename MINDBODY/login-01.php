<?php

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';


// if(isset($_GET['startTime'])){
// 	$sched_start = date('c', $_GET['startTime']);
// 	$sched_end = date('c', $_GET['startTime'] + 518400);
// } else {
// 	$sched_start = date('c');
// 	$sched_end = date('c', strtotime('today + 7 days'));
// };
//
// $start_stop_dates = [
// 	'StartDateTime'=> $sched_start,
// 	'EndDateTime'=> $sched_end
// ];

$class_info = new get_MINDBODY_classes( $mb_config );
$data = $class_info->getScheduleData( );

if(gettype($data) == 'string') {
	// it returned an error of some sort:
	echo 'this thing was a string all along....';
} elseif(gettype($data) == 'array') {
	// this is probably running correctly then:
	print_r( $data );
	// print_r( json_encode($data) );

}
