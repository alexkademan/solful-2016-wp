<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */


echo '<main id="main" class="site-main" role="main">';

if($post->post_name == 'home'){
	get_template_part( 'template-parts/content', 'home-blog-sticky-post' );
}


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

if($post->post_name == 'packages') {
	get_template_part( 'template-parts/content', 'page-packages' );
}



echo 	'</div>'; // entry-content
echo '</main>'; // #main -->
