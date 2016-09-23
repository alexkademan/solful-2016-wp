<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */


// if($post->post_name == 'schedule' || $post->post_name == 'trainers'){
// 	get_template_part( 'template-parts/content', 'underscore-schedule' );
// 	get_template_part( 'template-parts/content', 'underscore-trainers' );
// } else {


echo '<main id="main" class="site-main" role="main">';
get_template_part('template-parts/content', 'page-headline');
echo	'<div class="entry-content">';

the_content();

if($post->post_name == 'home'){
	get_template_part( 'template-parts/content', 'home-blog-feed' );
}

wp_link_pages( array(
	'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
	'after'  => '</div>',
) );

echo 	'</div>'; // entry-content

// echo 	'<footer class="entry-footer">';

			// edit_post_link(
			// 	sprintf(
			// 		/* translators: %s: Name of current post */
			// 		esc_html__( 'Edit %s', '_s' ),
			// 		the_title( '<span class="screen-reader-text">"', '"</span>', false )
			// 	),
			// 	'<span class="edit-link">',
			// 	'</span>'
			// );

// echo 	'</footer>'; // .entry-footer
echo '</main>'; // #main
