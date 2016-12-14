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
// echo     '<h4></h4>';
// echo     '<h5></h5>';
echo   '</hgroup>';
echo   '<div class="signUp">';
echo   '</div>';
echo '</script>';

// info about an individual class.
echo '<script type="text/template" id="mb-appointment-nfo">';
echo   '<div class="classNFO">';
echo     '<span>';
echo       '<%= IsCanceled ? "" : durationReadable %>';
echo       '<%= IsCanceled ? Staff["Name"] : "<div class=\"trainerName\">With: " + Staff["Name"] + "</div>" %>';
echo       '<div class="trainerNFO">';
echo         '<div class="workout-desc bio">';
echo           '<%= Staff["ImageURL"] ? "<img src=\"" + Staff["ImageURL"] + "\" />" : "" %>';
echo           '<div class="desc"><%= Staff["Bio"] %></div>';
echo         '</div>';
echo       '</div>';
echo       '<div class="workout-desc">';
echo         '<%= ClassDescription["ImageURL"] ? "<img src=\"" + ClassDescription["ImageURL"] + "\" />" : "" %>';
echo         '<%= "<div class=\"desc\">" + ClassDescription["Description"] + "</div>" %>';
echo       '</div>';
echo     '</span>';
echo   '<div>';
echo '</script>';


echo '<script type="text/template" id="mb-trainer-appointment-template">';
echo   '<div class="classNFO">';
echo     '<span>';
echo       '<%= IsCanceled ? Staff["Name"] : durationReadable + " with "+ Staff["Name"] %>';

echo       '<div class="workout-desc">';
echo         '<%= ClassDescription["ImageURL"] ? "<img src=\"" + ClassDescription["ImageURL"] + "\" />" : "" %>';
echo         '<%= "<div class=\"desc\">" + ClassDescription["Description"] + "</div>" %>';
echo       '</div>';
echo     '</span>';
echo   '<div>';
echo '</script>';

// the link to the full schedule that follows the one week sched on sched page:
echo '<script type="text/template" id="mb-full-calendar-link">';
echo  "Can't find the class that you're looking for? <br />Visit Solful Fitness on MINDBODY for our complete calendar";
echo '</script>';
