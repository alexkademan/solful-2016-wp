<?php
class getMINDBODYclasses extends \DevinCrossman\Mindbody\MB_API {

  // \DevinCrossman\Mindbody\MB_API
  function __construct($config, $start_stop_dates) {
    parent::__construct($config);

    $class_data = parent::GetClasses( $start_stop_dates );


    if(!empty($class_data['GetClassesResult']['Classes']['Class'])){
      $classes = parent::makeNumericArray( $class_data['GetClassesResult']['Classes']['Class'] );
      print_r($classes);
    };
    // $this->classes = $class_data;
  }

  public function pull_class_data($start_stop_array) {
    // print_r($start_stop_array);

  }

}
