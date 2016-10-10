<?php
/*
** This class is intended to interact with the MB_API.php file
** MB_API is the wrapper that handles all interactions with the
** MINDBODY API.
*/

class get_MINDBODY_classes extends \DevinCrossman\Mindbody\MB_API {

  function __construct($config) {
    // run config vars up the flagpole
    parent::__construct($config);
  }

  /*
  ** make the call to the SOAP server and sort out the data that gets returned.
  */
  public function getScheduleData($start_stop_dates) {
    // ask the API for the raw data based on the days on the calendar we are requesting:
    $class_data = parent::GetClasses( $start_stop_dates );

    if(!empty($class_data['GetClassesResult']['Classes']['Class'])){
      $classes = parent::makeNumericArray( $class_data['GetClassesResult']['Classes']['Class'] );

      // sort the data and add things while looping thru it all:
      return $this->sortClassesByDate($classes);

    } else {
      if(!empty($class_data['GetClassesResult']['Message'])) {
    		return $class_data['GetClassesResult']['Message'];
    	} else {
    		$errMessage = "Error getting classes<br />";
    		$errMessage .= '<pre>' . print_r( $class_data, 1 ) . '</pre>';
        return $errMessage;
    	}
    }
  }


  /*
  ** This method is copied form the example file that came with the API wrapper:
  ** https://github.com/devincrossman/mindbody-php-api
  ** examples/class-schedule-example/index.php
  */
  private function sortClassesByDate( $classes = [] ) {
    $classesByDate = array();
    foreach($classes as $key => $class) {

      // add start time to the data via PHP, because JS doesn't do this as well.
      // JS has timezone issues. Was too much headache.

      $class['unixStartTime'] = strtotime($class['StartDateTime']);
      $classDate = date("Y-m-d", $class['unixStartTime']);

      if(!empty($classesByDate[$classDate])) {
        $classesByDate[$classDate] = array_merge($classesByDate[$classDate], array($class));
      } else {
        $classesByDate[$classDate] = array($class);
      }
    }

    ksort($classesByDate);
    foreach($classesByDate as $classDate => &$classes) {
      usort($classes, function($a, $b) {
        if(strtotime($a['StartDateTime']) == strtotime($b['StartDateTime'])) {
          return 0;
        }
        return $a['StartDateTime'] < $b['StartDateTime'] ? -1 : 1;
      });
    }
    return $classesByDate;

  }

}
