<?php

// $the_spacer_image = get_bloginfo('template_url');
// $the_spacer_image .= '/images/spacer-featured-home-image.gif';

$home_post = get_post(134);
$home_post_image = wp_get_attachment_image_src(
    get_post_thumbnail_id( 134 ), 'original'
);

// print_r($home_post->post_content);

echo '<div class="content home-post-1">';
echo  '<div class="site-main site-main-centered">';
echo    $home_post->post_content;
echo  '</div>';
echo '</div>';

// print_r($home_post);
if (isset($home_post_image[0])) {
    $the_spacer_style = 'background-image:url(\'' . $home_post_image[0] . '\')';

    echo '<div class="feat-img-banner">';
    echo 	'<div class="feat-img">';
    echo 	  '<img src="' . $home_post_image[0] . '" alt="">';
    echo 	'</div>';
    echo '</div>';

};
