<?php

if( has_post_thumbnail() ){

	$the_spacer_image = get_bloginfo('template_url') . '/images/spacer-featured-image.gif';
	// $feat_content = get_the_custom_if_exists('Featured-image-overlay-text');
	// if( $feat_content != ''){
	// 	echo 'its unset.';
	// };

	echo '<div class="feat-img-banner" style="background-image:url(\'' . get_the_post_thumbnail_url() . '\')">';
	// echo '<div class="feat-img-banner">';
	echo 	'<div class="image-gradient-dynamic">';
	echo 	  '<img src="' . $the_spacer_image . '" alt="">';
	// echo 	  '<div class="overlay"></div>';
	echo 	  '<div class="copy">';

	// if( isset($feat_content) && $feat_content != ''){ echo $feat_content; }

	echo 	  '</div>';
	echo 	'</div>';
	echo '</div>';

	// echo '<div class="feat-img-banner">';
	// echo 	'<div class="image-gradient-dynamic">';
	// echo 	  '<img src="' . get_the_post_thumbnail_url() . '" alt="">';
	// echo 	  '<div class="overlay"></div>';
	// echo 	  '<div class="copy">';
	// echo 	    '<p>Dynamic height container</p>';
	// echo 	    '<p>Dynamic height container</p>';
	// echo 	  '</div>';
	// echo 	'</div>';
	// echo '</div>';

}
