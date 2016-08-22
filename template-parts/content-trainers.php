<?php

$trainerArgs = get_pages([
  'post_type' => 'page',
  'post_status' => 'publish'
]);

$wp_trainers = get_page_children( get_the_ID(), $trainerArgs );
$trainers = [];
// pull the list of pages that are children of "trainers" page.
// we will cross reference the data that comes out of MINDBODY
// to determine if the trainers loaded into MINDBODY should display or not.
// If they don't have a WP named after them, they're not going to appear here.
foreach($wp_trainers as $key => $trainer) {
  $trainers[$trainer->post_title] = $trainer->menu_order;
}
asort($trainers);
// echo '<span'
// echo json_encode($trainers);


echo '<main id="main" class="full-width" role="main"><article class="mb_trainers">';
echo '<ul id="mb_app" class="mb_data mb_' . $post->post_name . '">';
echo 	'<span class="loader"><i class="fa fa-refresh fa-spin fa-2x"></i></span>';
echo  '<span class="hid slug">' . $post->post_name . '</span>' ;
echo  '<span class="hid wpTrainers">' . json_encode($trainers) . '</span>' ;
echo '</ul>';
echo '</article></main>';
