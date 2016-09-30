<?php
require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';


if( isset($_GET['startTime']) && isset($_GET['duration']) && isset($_GET['sessionLife']) ){
  // the table in question is named:
  $table_name = $table_prefix . "MINDBODY_cache";

  // connect to the database:
  $conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);

  if($conn) {

    $cache = $conn->prepare("SELECT `shcedule`, `schedule_time` FROM `sf_MINDBODY_cache` WHERE id=1");
    $cache->execute();
    $cache = $cache->fetch();


    // we've got what the DB has to offer, so now make sure that the info we
    // got from it has what we need:
  	if(
  		isset($cache['schedule']) && isset($cache['schedule_time']) // both items have a place within the db
  		&& $cache['schedule'] != NULL // there was no last time
  		&& $cache['schedule_time'] != NULL // there was no last time

  	) {
  		// we have the parts that we need.
      print_r($cache['schedule']);

  	} else {
      // going to have to call the API.
      $schedule = populate_database($table_name, $mb_config, $conn);
      print_r($schedule);

  	}

    $conn = null; // close the PDO connection.

  }
} else {
  echo json_encode('"error: "' . __DIR__);

}
