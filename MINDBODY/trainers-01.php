<?php

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
require_once __DIR__ . '/classes/mb-get-trainers.php';

$trainer_data = new get_MINDBODY_stuff( $mb_config );
$data = $trainer_data->mb_get_trainers();

print_r( json_encode($data['GetStaffResult']['StaffMembers']['Staff']) );
// print_r( json_encode($data) );
