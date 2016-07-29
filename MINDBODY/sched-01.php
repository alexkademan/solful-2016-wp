<?php

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-classes.php';

$sched_start = date('c');
$sched_start = date('c', strtotime('today + 2 days'));
$sched_end = date('c', strtotime('today + 2 days'));

$start_stop_dates = [
	'StartDateTime'=> $sched_start,
	'EndDateTime'=> $sched_end
];


// $mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );
// $data = $mb->GetClasses( $start_stop_dates );


$class_info = new getMINDBODYclasses( $mb_config, $start_stop_dates );
// $data = $class_info->pull_class_data( array( 'StartDateTime'=> $sched_start, 'EndDateTime'=> $sched_end ) );


if(!empty($data['GetClassesResult']['Classes']['Class'])) {
	$classes = $mb->makeNumericArray($data['GetClassesResult']['Classes']['Class']);
	$classes = sortClassesByDate($classes);
	echo "\n\n-------------------------------------------------\n\n";
	print_r($classes);

	foreach($classes as $classDate => $classes) {
		echo $classDate;
		// echo ' - ' . count($classes);
		echo "\n";

		foreach($classes as $class) {

			if( $class['IsCanceled'] == true && $class['HideCancel'] == true ) {
				// DO NOTHING, this class is hidden from view, AND canceled.
			} else {

				print_r($class['ClassDescription']['Name']);
				if($class['IsCanceled'] == true){
					echo " - CANCELLED";
				};
				if($class['HideCancel'] !== true){
					// echo " - NOT hide CANCELLED";
				};
				// echo "\n+++++++++++++++++++++++++\n";
				// print_r($class);
				// echo "\n\n\n+++++++++++++++++++++++++\n\n\n";
				echo "\n";

			}
		}
		echo "\n\n";
	}
} else {
	// if(!empty($data['GetClassesResult']['Message'])) {
	// 	echo $data['GetClassesResult']['Message'];
	// } else {
	// 	echo "Error getting classes<br />";
	// 	echo '<pre>'.print_r($data,1).'</pre>';
	// }
}

function sortClassesByDate($classes = array()) {
	$classesByDate = array();
	foreach($classes as $class) {
		$classDate = date("Y-m-d", strtotime($class['StartDateTime']));
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
