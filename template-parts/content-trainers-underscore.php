<?php
/**
 * Template part for displaying MINDBODY schedule.
 *
 */
?>

<script type="text/template" id="mb-trainer-template">
  <h1><%= Name %></h1>
  <div class="trainer">

    <div class="bio">
      <%= ImageURL ? '<img src="' + ImageURL + '" />' : '' %>
      <%= Bio ? '<div class="desc">' + Bio + '</div>' : '' %>
    </div>

    <aside class="workouts">
      <% if (workoutCount > 0) { %>
        <%- workoutCount %> Upcoming Workouts With <%- FirstName %>:
        <ul class="workouts"></ul>

      <% } else { %>

      <% } %>
    </aside>
  </div>
</script>
