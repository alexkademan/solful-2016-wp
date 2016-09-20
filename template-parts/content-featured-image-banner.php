<?php

if( has_post_thumbnail() ){


	// $feat_image_here = wp_get_attachment_metadata( get_post_thumbnail_id() );
	// if(isset($feat_image_here)) {
	// 	echo '<span class="hid">';
	// 	$feat_img_bg = process_featured_image( $feat_image_here, get_the_post_thumbnail_url() );
	// 	print_r($feat_img_bg);
	// 	echo '</span>';
	// }


	// process_featured_image( wp_get_attachment_metadata( get_post_thumbnail_id() ) );
	$the_spacer_image = get_bloginfo('template_url') . '/images/spacer-featured-image.gif';

	echo '<div class="feat-img-banner" style="background-image:url(\'' . get_the_post_thumbnail_url() . '\')">';
	// echo '<div class="feat-img-banner">';
	echo 	'<div class="feat-img">';
	echo 	  '<img src="' . $the_spacer_image . '" alt="">';
	// echo 	  '<div class="overlay"></div>';
	echo 	  '<div class="copy">';

	echo 	  '</div>';
	echo 	'</div>';
	echo '</div>';


}
