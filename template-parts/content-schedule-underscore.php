<?php

// underscore templates: --------------------------------------------------------------------------------
?>
<script type="text/template" id="mb-day-template">
  <h1><%- info["dayOfWeek"] %> <%- info["fullMonth"] %> <%- info["day"] %></h1>
  <ul class="classes"></ul>
</script>

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


<script type="text/template" id="mb-trainer-appointment-template">
  <div class="classNFO">
    <span>
      <%= IsAvailable ? '<a href="' + signupURL + '" class="sign-in-button">Sign in now!</a>' : '' %>
      <%= IsCanceled ? Staff['Name'] : durationReadable + ' with '+Staff['Name'] %>

      <div class="workout-desc">
        <%= ClassDescription['ImageURL'] ? '<img src="' + ClassDescription['ImageURL'] + '" />' : '' %>
        <%= '<div class="desc">' + ClassDescription['Description'] + '</div>' %>
      </div>
    </span>
  <div>
</script>
