<?php

function populate_database($table_name, $mb_config, $conn) {
  // going to have to call the API.
  // get all the things we need from MINDBODY
  $data = get_data_from_API($mb_config);

  $query = "
    LOCK TABLES `".$table_name."` WRITE;
    UPDATE ".$table_name." SET schedule=:all_JSON, schedule_time=:right_now WHERE id=1;
    UNLOCK TABLES;
  ";


  // Prepare statement
  $statement = $conn->prepare($query);
  $statement->bindParam(':all_JSON', $data);
  $statement->bindParam(':right_now', time());

  // execute the query
  $statement->execute();


  return $data;
}

function get_data_from_API($mb_config) {

  // we have the required parts:
	$start_stop_dates = [
		'StartDateTime'=> date('c', $_GET['startTime']),
		'EndDateTime'=> date('c', $_GET['startTime'] + $_GET['duration'])
	];

	$class_info = new get_MINDBODY_classes( $mb_config );
	$data = $class_info->getScheduleData( $start_stop_dates );

	if(gettype($data) == 'string') {
		// it returned an error of some sort:
    print_r($data);

	} elseif(gettype($data) == 'array') {
		// this is probably running correctly then:
		$sched['sched'] = $data;
		$sched['requestStartTime'] = $_GET['startTime'];
		$sched = json_encode($sched);

	}

	return $sched;
}
