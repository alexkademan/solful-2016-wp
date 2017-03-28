<?php

// nfo about the page's featured image:
$the_spacer_image = get_bloginfo('template_url');
$the_spacer_image .= '/images/spacer-featured-image.gif';

$the_spacer_style = 'background-image:url(\'' .
		get_the_post_thumbnail_url() . '\')';

echo '<div class="feat-img-banner" style="' . $the_spacer_style . '">';
echo 	'<div class="feat-img">';
echo 	  '<img src="' . $the_spacer_image . '" alt="">';
echo 	'</div>';
echo '</div>';
