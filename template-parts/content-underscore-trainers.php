<?php
/**
 * Template part for displaying MINDBODY schedule.
 *
 */
?>

<script type="text/template" id="mb-trainer-template">
  <h1><%= Name %></h1>
  <div class="workout-desc bio">
    <!-- <%= Bio ? '<div class="desc">' + Bio + '</div>' : '' %> -->
    <%= ImageURL ? '<img src="' + ImageURL + '" />' : '' %>

    <aside class="workouts">
      <% if (workoutCount > 0) { %>
        <%- workoutCount %> Upcoming Workouts With <%- FirstName %>:
        <ul class="workouts"></ul>

      <% } else { %>

      <% } %>
    </aside>
  </div>
</script>

<script type="text/template" id="mb-trainer-available-workout">
</script>
