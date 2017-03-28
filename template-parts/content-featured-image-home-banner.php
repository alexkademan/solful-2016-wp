<?php

// nfo about the page's featured image:
$the_spacer_image = get_bloginfo('template_url');
$the_spacer_image .= '/images/spacer-featured-image.gif';

$the_bg_style = 'background-image:url(\'' .
		get_the_post_thumbnail_url() . '\')';

// get the alt title custom field:
$alt_title = get_the_custom_if_exists('Alternate-Headline');
if(isset($alt_title) && $alt_title != ''){
	$page_title = $alt_title;
} else {
	$page_title = $post->post_title;
}



echo '<div class="feat-img-home" style="' . $the_bg_style . '">';
echo 	'<div class="feat-img">';
echo 	  '<hgroup>';

echo 		$page_title;

echo 	  '</hgroup>';
echo 	'</div>';
echo '</div>';

// get_template_part('template-parts/content', 'page-headline');
