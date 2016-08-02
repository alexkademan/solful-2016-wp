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
echo   '<ul class="classes"></ul>';
echo '</script>';
?>
<script type="text/template" id="mb-appointment-template">
  <hgroup class="toggle<%- IsAvailable ? ' available' : ' unavailable' %><%- IsCanceled ? ' canceled' : '' %>">
    <h2><%- ClassDescription["Name"] %></h2>
    <h3>
      <%- classStart["hourCivilian"] + ':' + classStart["minutes"] + ' - ' %>
      <%- classEnd["hourCivilian"] + ':' + classEnd["minutes"] + ' ' + classEnd["am_pm"] %>
      <%- IsCanceled ? Staff['Name'] : '' %>
    </h3>
  </hgroup>
</script>

<script type="text/template" id="mb-appointment-nfo">
  <div class="classNFO">
    <span>
      <%= IsAvailable ? '<a href="' + signupURL + '" class="sign-in-button">Sign in now!</a>' : '' %>
      <%= IsCanceled ? '' : "" + durationReadable + "" %>
      <%= IsCanceled ? Staff['Name'] : '<div class="trainerName">With: '+Staff['Name'] + '</div>' %><br />

      <div class="trainerNFO">
        <div class="workout-desc bio">
          <%= Staff['ImageURL'] ? '<img src="' + Staff['ImageURL'] + '" />' : '' %>
          <%= '<div class="desc">' + Staff['Bio'] + '</div>' %>
        </div>
      </div>

      <div class="workout-desc">
        <%= ClassDescription['ImageURL'] ? '<img src="' + ClassDescription['ImageURL'] + '" />' : '' %>
        <%= '<div class="desc">' + ClassDescription['Description'] + '</div>' %>
      </div>
    </span>
  <div>
</script>
