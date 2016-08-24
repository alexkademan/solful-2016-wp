<?php
session_start();

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-trainers.php';


if( isset($_GET['startTime']) && isset($_GET['duration']) && isset($_GET['sessionLife']) ){
  // we have the required parts:
  if(
    isset($_SESSION['MINDBODY']['trainers'])
    && (time() - $_SESSION['MINDBODY']['trainers']['time']) < $_GET['sessionLife']
  ) {
    // API call is cached in session. (So don't actually do anything here)

  } else {
    $trainer_data = new get_MINDBODY_stuff( $mb_config );
    $data = $trainer_data->mb_get_trainers();


    $data = json_encode($data['GetStaffResult']['StaffMembers']['Staff']);
    unset($_SESSION['MINDBODY']['trainers']);
    $_SESSION['MINDBODY']['trainers']['time'] = $_SERVER['REQUEST_TIME']; // record what time this was created.
    $_SESSION['MINDBODY']['trainers']['info'] = $data;
  }

  print_r($_SESSION['MINDBODY']['trainers']['info']);


} else {
	echo json_encode('"error: "' . __DIR__);

}
