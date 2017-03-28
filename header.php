<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

// NEW ++++++++++++++++++++++++++++++++++++++++++++++++++++++
// this thing will set up an array in $GLOBAL['this_site']
// so that you can see the data from any template file.
require get_template_directory() . '/custom-objects/custom-objects.php';

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
<script type='text/javascript' src='<?php echo get_bloginfo('template_url') ?>/js/modernizr-custom.js'></script>
<link rel="icon" type="image/png" href="<?php echo get_bloginfo('template_url') ?>/favicon.png">
<link rel="icon" type="image/svg" href="<?php echo get_bloginfo('template_url') ?>/favicon.svg">
</head>

<body <?php body_class(); ?>>
	<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', '_s' ); ?></a>
	<header id="site_header" class="site_header">
	    <span id="mh-stripe" class=stripe>
	      <span class="toggle_menu">
	        <div class="line line-1"></div>
	  			<div class="line line-2"></div>
	  			<div class="line line-3"></div>
	        <a class="toggle"></a>
	      </span>
	      <a class="site-title" href="<?php echo get_bloginfo('wpurl') ?>">
					<h1><?php echo get_bloginfo('title') ?></h1>
					<span class="big-logo"></span>
					<span class="sunflower"><span><span class="spinner"></span></span></span>
				</a>
				<div id="mastheadLogin" class="mastheadLogin">
					<a href="<?php echo get_bloginfo('template_url') . '/MINDBODY/' ?>" id="mb-login-mbFeedURL" class="hid"></a>
				</div>
	    </span>
			<?php get_template_part( 'template-parts/content', 'main-nav' ); ?>
	</header>
	<div id="page" class="site">
<?php
if(
	isset($post->post_title)
	&& $post->post_name == "home"
){
	get_template_part('template-parts/content', 'sign-up-now-banner');
}

if (has_post_thumbnail()) {

	if ($post->post_name == 'home') {
		get_template_part('template-parts/content', 'featured-image-home-banner');
	} else {
		get_template_part('template-parts/content', 'featured-image-banner');
	}

}

?>
	<span class="main-bg">
		<div class="content">
