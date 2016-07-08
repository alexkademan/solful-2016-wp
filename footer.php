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

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			&copy; <?php echo date('Y') . ' ' . get_bloginfo('title'); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>
<script type='text/javascript' src='<?php echo get_bloginfo('template_url') ?>/js/bundle.js'></script>
</body>
</html>
