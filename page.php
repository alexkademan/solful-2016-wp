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
// print_r($post->post_title);
// if(
// 	isset($post->post_title)
// 	&& $post->post_title == "Solful Fitness"
// ){
// 	$has_sidebar = true;
//
// } else {
// 	$has_sidebar = false;
// };

get_header();

?>

	<div id="primary" class="content-area">
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<?php
		// regular ol' page heading
		get_template_part('template-parts/content', 'page-headline');

		// MINDBODY pages:
		if($post->post_name == 'schedule') {
			get_template_part( 'template-parts/content', 'schedule' );
			// MINDBODY underscore templates:
			get_template_part( 'template-parts/content', 'schedule-underscore' );
			get_template_part( 'template-parts/content', 'trainers-underscore' );

		} else if($post->post_name == 'trainers') {
			get_template_part( 'template-parts/content', 'trainers' );
			// MINDBODY underscore templates:
			get_template_part( 'template-parts/content', 'schedule-underscore' );
			get_template_part( 'template-parts/content', 'trainers-underscore' );

		} else {
			// regular ol' page. (non MINDBODY stuff here)
			while ( have_posts() ) : the_post();
				get_template_part( 'template-parts/content', 'page' );
			endwhile; // End of the loop.
		}
?>
		</article><!-- #post-## -->
	</div><!-- #primary -->

<?php
get_sidebar();


get_footer();
