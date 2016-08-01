<?php
/**
 * Template part for displaying MINDBODY schedule.
 *
 */

echo '<ul id="mb_schedule" class="mb_schedule">';
echo 	'<span class="loader"><i class="fa fa-refresh fa-spin fa-2x"></i></span>';
echo  '<a class="hid url" href="' . get_bloginfo('template_url') . '/MINDBODY/">link</a>' ;
echo '</ul>';

// underscore templates:
echo '<script type="text/template" id="mb-day-template">';
echo   '<h1><%- info["dayOfWeek"] %> <%- info["fullMonth"] %> <%- info["day"] %></h1>';
echo   '<ul></ul>';
echo '</script>';
?>
<script type="text/template" id="mb-appointment-template">
  <h2><%- ClassDescription["Name"] %></h2>
  <span>
    <%- classStart["hourCivilian"] %>:<%- classStart["minutes"] %> -
    <%- classEnd["hourCivilian"] %>:<%- classEnd["minutes"] %>,
    <%- durationReadable %>
  </span>
</script>
