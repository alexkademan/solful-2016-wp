<?php

require_once __DIR__ . '/navigation-object.php';

global $this_site;

$sitevars = new get_main_navigation();
$this_site['navigation'] = $sitevars->get_pages_info();

// 13 == the id of the "category" page
$this_site['sub_navigation'] = $sitevars->get_pages_info(13);
