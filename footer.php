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


echo 	'</div>'; // #content
echo '</span>'; // .main-bg
echo '</div>'; // #page
if($post->post_title == 'Contact Us'){
	echo '<div id="map_canvas" class="map_canvas"></div>';
}
?>
	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<?php
				// echo 'hello???';
				if( function_exists( 'mc4wp_show_form' ) ) {
				  mc4wp_show_form();
				}
			?>
			&copy; <?php echo date('Y') . ' ' . get_bloginfo('title'); ?>
		</div>
		<a href="http://clients.mindbodyonline.com/ws.asp?studioid=44288&amp;stype=-7" class="MINDBODY-LINK"><img src="<?php echo get_bloginfo('template_url') ?>/images/powered_by_mindbody-white.png" /></a>
	</footer><!-- #colophon -->

<?php wp_footer(); ?>
<script type="text/javascript" src="<?php echo get_bloginfo('template_url') ?>/js/bundle.js"></script>
<?php
if($post->post_title == 'Contact Us'){ // bring in the js for the map part...
	get_template_part( 'template-parts/content', 'location-map' );
}
// if($post->post_title == 'About') {
// echo	'<script type="text/javascript" src="' . get_bloginfo('template_url') .'/js/instafeed.min.js"></script>';
// }

get_template_part( 'template-parts/content', 'login-underscore' ); // templates for login button within masthead.
echo '<div id="popOverMB" class="popOverMB"></div>';
?>
</body>
</html>
