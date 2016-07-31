<?php
/**
 * Template part for displaying MINDBODY schedule.
 *
 */

echo '<ul id="mb_schedule" class="mb_schedule">';
echo 	'<i class="fa fa-refresh fa-spin fa-2x"></i>';
echo  '<a class="hid url" href="' . get_bloginfo('template_url') . '/MINDBODY/">link</a>' ;
// echo  '<a class="hid url">link</a>' ;
echo '</ul>';


echo '<script type="text/template" id="mb-day-template">';
echo   '<h1><%- info["dayOfWeek"] %> <%- info["fullMonth"] %> <%- info["day"] %></h1>';
echo   '<ul></ul>';
echo '</script>';

echo '<script type="text/template" id="mb-appointment-template">';
echo   '<h2><%- ClassDescription["Name"] %></h2>';
echo '</script>';
