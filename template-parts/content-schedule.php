<?php

echo '<main id="main" class="site-main" role="main">';
echo '<ul id="mb_app" class="mb_data mb_' . $post->post_name . '">';
echo 	'<span class="loader"><i class="fa fa-refresh fa-spin fa-2x"></i></span>';
// echo  '<a class="hid url-MINDBODY" href="' . get_bloginfo('template_url') . '/MINDBODY/">link</a>' ;
echo  '<span class="hid slug">' . $post->post_name . '</span>' ;
echo '</ul>';
echo '</main>';
