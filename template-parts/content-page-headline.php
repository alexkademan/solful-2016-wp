<?php
$alt_title = get_the_custom_if_exists('Alternate-Headline');
if(isset($alt_title) && $alt_title != ''){
	$page_title = $alt_title;
} else {
	$page_title = $post->post_title;
}

echo '<header class="entry-header"><h1>' . $page_title . '</h1></header>';
