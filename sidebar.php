<?php
/**
 * The sidebar containing the main widget area.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

// if ( ! is_active_sidebar( 'sidebar-1' ) ) {
// 	return;
// }


switch ($post->post_name) {
	case 'home':
		// Facebook plugin for front page:
		get_template_part( 'template-parts/content', 'facebook_list' );
		break;
	case 'trainers':
		// gets nuthin'
		break;

	default:

		if($post->post_parent != 13){ // not a page for a trainer.
			echo '<aside id="secondary" class="widget-area flower" role="complementary">';
			echo 	'<span class="flower">';
			echo 		'<img src="' . get_bloginfo('template_url') . '/images/spacer_1x1.gif">';
			echo 	'</span>';
			echo '</aside>';
		}
		break;
}
