<?php
// trainer page view
echo '<script type="text/template" id="mb-trainer-template">';
echo   '<h1><%= Name %></h1>';
echo   '<div class="trainer">';

echo    '<div class="leftTrainer">';
echo     '<div class="bio showLess" style="height: <%- bioExcerptHeight %>px">';
echo         '<%= ImageURL ? "<img src=\"" + ImageURL + "\" />" : "" %>';
echo         '<%= Bio ? "<div class=\"desc\">" + Bio + "</div>" : "" %>';
echo     '</div>';
echo     '<%= Bio ? "<a class=\"readMore\"></a>" : "" %>';
echo    '</div>';

echo     '<aside class="workouts">';
echo       '<% if (workoutCount > 0) { %>';
echo         '<%- workoutCount %> upcoming workout<% if (workoutCount > 1){ %>s<% } %> with <%- FirstName %>:';
echo         '<ul class="workouts"></ul>';
echo       '<% } %>';
echo     '</aside>';
echo   '</div>';
echo '</script>';
