<?php
/**
 * The sidebar containing the main widget area.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<aside id="secondary" class="widget-area" role="complementary">
	<?php

	// Facebook plugin for front page:
	if(
		isset($post->post_title)
		&& $post->post_title == "Solful Fitness"
	){
		get_template_part( 'template-parts/content', 'facebook_list' );
	}

	// dynamic_sidebar( 'sidebar-1' );
	// list of upcoming events for the home page:
	if($post->post_name == 'home'){

		echo "<h1>Upcoming Events</h1>";
		get_template_part( 'template-parts/content', 'homepage_list' );
		echo '<h3><a href="' . get_bloginfo('url') . '/calendar">View Full Calendar</a>';
	}
	?>
</aside><!-- #secondary -->
