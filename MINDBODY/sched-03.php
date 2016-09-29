<?php
session_start();
// session_destroy();
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';


$db_connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// if(!$db_connection) {
//   echo "Error: Unable to connect to MySQL." . PHP_EOL;
//   echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
//   echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
//   exit;
// } else {
// 	// echo $table_prefix;
//
//
// 	$check_table = '';
// 	$check_table .= 'IF NOT EXISTS(SELECT * FROM ' . DB_NAME . ')';
// 	$check_table .= "WHERE object_id = OBJECT_ID(N'[dbo].[" . $table_prefix . "MINDBODY_cache]') AND type in (N'U'))";
//
// 	$check_table .= "BEGIN"
// 	$check_table .= "CREATE TABLE [dbo].[" . . "]"
//
// 	// IF  NOT EXISTS (SELECT * FROM sys.objects
// 	// WHERE object_id = OBJECT_ID(N'[dbo].[YourTable]') AND type in (N'U'))
// 	//
// 	// BEGIN
// 	// CREATE TABLE [dbo].[YourTable](
// 	//     ....
// 	//     ....
// 	//     ....
// 	// )
// 	//
// 	// END
//
// 	mysqli_close($db_connection);
// }



if( isset($_GET['startTime']) && isset($_GET['duration']) && isset($_GET['sessionLife']) ){

  // we have the required parts:
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

	}

	print_r($sched);




} else {
	echo json_encode('"error: "' . __DIR__);
}
