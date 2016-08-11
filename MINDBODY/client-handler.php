<?php

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );


// print_r('client-handler');
print_r($_GET);
