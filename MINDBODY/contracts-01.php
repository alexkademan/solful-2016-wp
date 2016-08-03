<?php

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';


if(isset($_GET['startTime'])){
} else {
};


$servicesOptions = array(
    'LocationID'=>1,
    'HideRelatedPrograms'=>true
);

$staffOptions = [
		'SessionTypeID' => 2
];

$class_info = new get_MINDBODY_classes( $mb_config );
// $data = $class_info->GetServices( $servicesOptions );
$data = $class_info->GetStaff( $staffOptions );

if(gettype($data) == 'string') {
	// it returned an error of some sort:
	echo 'this thing was a string all along....';
} elseif(gettype($data) == 'array') {
	// this is probably running correctly then:
	print_r( $data );
	// print_r( json_encode($data));

}
