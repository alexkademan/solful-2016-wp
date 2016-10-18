<?php


/* Get all sticky posts */
$sticky = get_option( 'sticky_posts' );

/* Sort the stickies with the newest ones at the top */
rsort( $sticky );

if(is_array($sticky)) {
  $sticky_post =  get_post($sticky[0]);

  // echo "HERE------------";
  $sticky_link = get_post_custom($sticky_post->ID)["Sticky-Home-Post-Link"][0];

  if( isset($sticky_link) ){
    $has_link = true;
    echo '<a href="' . $sticky_link . '" target="_blank">';
  };
  echo '<div class="home-sticky">';

  echo $sticky_post->post_content;
  if($has_link == true) {
    echo "</a>";
  }
  echo '</div>';
}

// wp_reset_postdata();
