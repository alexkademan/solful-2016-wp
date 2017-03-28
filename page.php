<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

get_header();
$classes = implode(' ', get_post_class());
echo '<div id="primary" class="content-area">';
echo 	'<article id="post-' . get_the_ID() . '" class="' . $classes .  '">';

		// MINDBODY pages:
		if($post->post_name == 'schedule') {
			get_template_part('template-parts/content', 'schedule');
			// MINDBODY underscore templates:
			get_template_part('template-parts/content', 'schedule-underscore');
			get_template_part('template-parts/content', 'trainers-underscore');

		} else if($post->post_name == 'trainers' || $post->post_parent == 13) {
			get_template_part('template-parts/content', 'trainers');
			// MINDBODY underscore templates:
			get_template_part('template-parts/content', 'schedule-underscore');
			get_template_part('template-parts/content', 'trainers-underscore');

		} else {
			// regular ol' page. (non MINDBODY stuff here)
			while ( have_posts() ) : the_post();
				get_template_part('template-parts/content', 'page');
			endwhile; // End of the loop.
		}

echo 	'</article>'; // #post-##
echo '</div>'; // #primary
get_sidebar();
get_footer();
