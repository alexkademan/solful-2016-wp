<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

?>

	</div><!-- #content -->
</span><!-- .main-bg -->
<?php
if($post->post_title == 'Contact Us'){
	echo '<div id="map_canvas" class="map_canvas"></div>';
}
?>
	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			&copy; <?php echo date('Y') . ' ' . get_bloginfo('title'); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>
<script type='text/javascript' src='<?php echo get_bloginfo('template_url') ?>/js/bundle.js'></script>
<?php
if($post->post_title == 'Contact Us'){ // bring in the js for the map part...
	get_template_part( 'template-parts/content', 'location-map' );
}
?>
</body>
</html>
