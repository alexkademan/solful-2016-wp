<?php
/**
 * The sidebar containing the main widget area.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

switch ($post->post_name) {
	case 'home':
		// get_template_part( 'template-parts/content', 'facebook_list' );
		// get_template_part( 'template-parts/content', 'home-image-gallery' );
		break;


	case 'schedule' :

		echo '<aside id="secondary" class="widget-area" role="complementary">';
		get_template_part( 'template-parts/content', 'home-image-gallery' );
		echo '</aside>';
		break;

	case 'packages' :
		get_template_part('template-parts/content', 'facebook_list');
		break;

	case 'about' :
		get_template_part('template-parts/content', 'facebook_list');
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
