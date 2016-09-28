<?php
session_start();
// session_destroy();
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';



if( isset($_GET['startTime']) && isset($_GET['duration']) && isset($_GET['sessionLife']) ){
  // // we have the required parts:
	$start_stop_dates = [
		'StartDateTime'=> date('c', $_GET['startTime']),
		'EndDateTime'=> date('c', $_GET['startTime'] + $_GET['duration'])
	];

	$class_info = new get_MINDBODY_classes( $mb_config );
	$data = $class_info->getScheduleData( $start_stop_dates );

	if(gettype($data) == 'string') {
		// it returned an error of some sort:
	} elseif(gettype($data) == 'array') {
		// this is probably running correctly then:

		$sched['sched'] = $data;
		$sched['requestStartTime'] = $_GET['startTime'];



		$sched = json_encode($sched);
		// unset($_SESSION['MINDBODY']['schedule']);
		// $_SESSION['MINDBODY']['schedule']['time'] = $_GET['startTime'];
		// $_SESSION['MINDBODY']['schedule']['info'] = $data;

	}

	// print_r($_SESSION['MINDBODY']['schedule']['info']);
	print_r($sched);






} else {
	echo json_encode('"error: "' . __DIR__);
}
