<?php

$trainerArgs = get_pages([
  'post_type' => 'page',
  'post_status' => 'publish'
]);

$trainers = [];

if($post->post_name == 'trainers'){
  // this is the page of ALL trainers:
  $wp_trainers = get_page_children( get_the_ID(), $trainerArgs );

  // pull the list of pages that are children of "trainers" page.
  // we will cross reference the data that comes out of MINDBODY
  // to determine if the trainers loaded into MINDBODY should display or not.
  // If they don't have a WP named after them, they're not going to appear here.
  foreach($wp_trainers as $key => $trainer) {
    $trainers[$trainer->post_title] = $trainer->menu_order;
  }
  asort($trainers);
} elseif($post->post_parent == 13) {
  // this is one of the children of "trainers",
  // therefore this page is a "trainer"
  $trainers[$post->post_title] = $post->menu_order;
}



// echo json_encode($trainers);


echo '<main id="main" class="full-width main-content" role="main"><article class="mb_trainers">';
get_template_part('template-parts/content', 'page-headline');
echo '<ul id="mb_app" class="mb_data mb_trainers">';
echo 	'<span class="loader"><i class="fa fa-refresh fa-spin fa-2x"></i></span>';
echo  '<span class="hid slug">' . $post->post_name . '</span>' ;
echo  '<span class="hid wpCat">trainers</span>' ;
echo  '<span class="hid wpTrainers">' . json_encode($trainers) . '</span>' ;
echo '</ul>';
echo '</article></main>';
