<?php

// sign in button template:
echo '<script type="text/template" id="mb-appointment-signIn">';
echo  '<a href="<%- signupURL %>" class="schedButton <%- buttonClass %>"><%- buttonName %></a>';
echo '</script>';

// Day worth of workouts
echo '<script type="text/template" id="mb-day-template">';
echo   '<h1><%- info["dayOfWeek"] %> <%- info["fullMonth"] %> <%- info["day"] %></h1>';
echo   '<ul class="classes"></ul>';
echo '</script>';

// individual workout:
echo '<script type="text/template" id="mb-appointment-template">';
echo   '<hgroup class="toggle">';
echo     '<h2><%- ClassDescription["Name"] %></h2>';
echo     '<h3>';
echo       '<%- classStart["hourCivilian"] + ":" + classStart["minutes"] + " - " %>';
echo       '<%- classEnd["hourCivilian"] + ":" + classEnd["minutes"] + " " + classEnd["am_pm"] %>';
echo       '<%- IsCanceled ? Staff["Name"] : "" %>';
echo       '<span class="countdown"></span>';
echo     '</h3>';
echo   '</hgroup>';
echo   '<div class="signUp">';
echo   '</div>';
echo '</script>';

?>

<script type="text/template" id="mb-appointment-nfo">
  <div class="classNFO">
    <span>
      <%= IsCanceled ? "" : durationReadable %>
      <%= IsCanceled ? Staff["Name"] : "<div class=\"trainerName\">With: " + Staff["Name"] + "</div>" %><br />

      <div class="trainerNFO">
        <div class="workout-desc bio">
          <%= Staff["ImageURL"] ? "<img src=\"" + Staff['ImageURL'] + '" />' : '' %>
          <div class="desc"><%= Staff["Bio"] %></div>
        </div>
      </div>

      <div class="workout-desc">
        <%= ClassDescription['ImageURL'] ? '<img src="' + ClassDescription['ImageURL'] + '" />' : '' %>
        <%= '<div class="desc">' + ClassDescription['Description'] + '</div>' %>
      </div>
    </span>
  <div>
</script>


<script type="text/template" id="mb-trainer-appointment-template">
  <div class="classNFO">
    <span>
      <%= IsCanceled ? Staff['Name'] : durationReadable + ' with '+Staff['Name'] %>

      <div class="workout-desc">
        <%= ClassDescription['ImageURL'] ? '<img src="' + ClassDescription['ImageURL'] + '" />' : '' %>
        <%= '<div class="desc">' + ClassDescription['Description'] + '</div>' %>
      </div>
    </span>
  <div>
</script>
