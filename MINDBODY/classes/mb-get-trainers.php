<?php
/*
** This class is intended to interact with the MB_API.php file
** MB_API is the wrapper that handles all interactions with the
** MINDBODY API.
*/

class get_MINDBODY_stuff extends \DevinCrossman\Mindbody\MB_API {

  function __construct($config) {
    // run config vars up the flagpole
    parent::__construct($config);
  }

  /*
  ** make the call to the SOAP server and sort out the data that gets returned.
  */
  public function mb_get_trainers() {
    // ask the API for the raw data based on the days on the calendar we are requesting:
    $trainer_data = parent::GetStaff();
    return $trainer_data;
  }

}
