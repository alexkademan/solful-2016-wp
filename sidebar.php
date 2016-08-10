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
	?>
</aside><!-- #secondary -->
