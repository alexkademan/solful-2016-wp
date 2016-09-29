<?php
// session_start();
// session_destroy();
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';

// the table in question is named:
$table_name = $table_prefix . "MINDBODY_cache";

// connect to the database:
$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if(!$db_connection) {
  echo "Error: Unable to connect to MySQL." . PHP_EOL;
  echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
  echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
  exit;

} else {
	$cache_table = check_table($table_name, DB_NAME);
	$db_connection->query( $cache_table );


	$get_sched = get_information('schedule', $table_name);
	$cached_sched = $db_connection->query($get_sched);

	if ($cached_sched->num_rows == 1) {
		while($row = $cached_sched->fetch_assoc()) {

			$cached_schedule_time = $row["schedule_time"];
			$cached_schedule = $row["schedule"];
    }
	}

	if(
		isset($cached_schedule_time) && isset($cached_schedule)
		&& $cached_schedule_time != NULL
		&& $cached_schedule != NULL
	) {
		echo "we have the parts that we need.";
	} else {
		echo "going to have to call the API.";
	}


	// print_r($_GET['startTime']);
	print_r( $cached_sched );


	mysqli_close($db_connection);
}



if( isset($_GET['startTime']) && isset($_GET['duration']) && isset($_GET['sessionLife']) ){

  // we have the required parts:
	$start_stop_dates = [
		'StartDateTime'=> date('c', $_GET['startTime']),
		'EndDateTime'=> date('c', $_GET['startTime'] + $_GET['duration'])
	];

	// $class_info = new get_MINDBODY_classes( $mb_config );
	// $data = $class_info->getScheduleData( $start_stop_dates );

	if(gettype($data) == 'string') {
		// it returned an error of some sort:
	} elseif(gettype($data) == 'array') {
		// this is probably running correctly then:

		$sched['sched'] = $data;
		$sched['requestStartTime'] = $_GET['startTime'];

		$sched = json_encode($sched);

	}

	print_r($sched);




} else {
	echo json_encode('"error: "' . __DIR__);
}
