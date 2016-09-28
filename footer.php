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
if($post->post_title == 'Contact Us'){ echo '<div id="map_canvas" class="map_canvas"></div>'; }
echo '</div>'; // #page


echo '<footer id="colophon" class="site-footer" role="contentinfo">';
echo 	'<div class="site-info">';
// Mailchimp For Wordpress:
if( function_exists( 'mc4wp_show_form' ) ) { mc4wp_show_form(); }

echo 		'&copy; ' . date('Y') . ' ' . get_bloginfo('title');
echo 	'</div>';

echo 	'<a href="http://clients.mindbodyonline.com/ws.asp?studioid=44288&amp;stype=-7" class="MINDBODY-LINK">';
echo 		'<img src="' . get_bloginfo('template_url') . '/images/powered_by_mindbody-white.png" />';
echo 	'</a>';
echo '</footer>'; // #colophon
wp_footer();

echo '<script type="text/javascript" src="' . get_bloginfo('template_url') . '/js/bundle.js"></script>';

if($post->post_title == 'Contact Us'){ get_template_part( 'template-parts/content', 'location-map' ); }
if($post->post_title == 'About'){
	// echo '<script type="text/javascript" src="' . get_bloginfo('template_url') . '/js/instafeed.min.js"></script>';
}

get_template_part( 'template-parts/content', 'login-underscore' ); // templates for login button within masthead.
echo '<div id="popOverMB" class="popOverMB"></div>';
get_template_part('googleAnalytics');
echo '</body>';
echo '</html>';
