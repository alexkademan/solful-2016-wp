<?php


function check_table($table_name) {

  $check_table = "
  CREATE TABLE IF NOT EXISTS " . $table_name . " (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    schedule LONGTEXT,
    schedule_time INT(10),
    trainers LONGTEXT,
    trainers_time INT(10)
  )";


  return $check_table;
}

function get_information($info_name, $table_name) {
  $get_info = "
  SELECT " . $info_name . ", " . $info_name . "_time
  FROM " . $table_name . "
  WHERE id=1;
  ";

  return $get_info;
}
