<?php

/* ------------------------------------------------------
 the following line adds support for "featured image"
 within pages instead of only within "posts"
------------------------------------------------------ */
add_theme_support( 'post-thumbnails', array( 'post', 'page' ) );



/* ------------------------------------------------------
This is my custom function that uses WP's get_post_custom()
but returns nothing if the data isn't there.
I'm using it to return custom fields from the db without erroring out the page.
------------------------------------------------------ */
function get_the_custom_if_exists($field) {

  $field_value = get_post_custom();

  if(isset($field_value[$field])) {
  	return $field_value[$field][0];
  } else {
    return false;
  }
}

/* ------------------------------------------------------
When posting to the site WP hard codes the height and
width of the images you are placing in there... this removes that
unfortunately it also removes the captions.
------------------------------------------------------ */
add_filter( 'post_thumbnail_html', 'remove_width_attribute', 10 );
add_filter( 'image_send_to_editor', 'remove_width_attribute', 10 );

function remove_width_attribute( $html ) {
   $html = preg_replace( '/(width|height)=\"\d*\"\s/', "", $html );
   return $html;
}
