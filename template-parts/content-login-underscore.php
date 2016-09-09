<?php
// login underscore templates

// basic template for the shader to be populated with the form for login, class sign up and class cancel:
echo '<script type="text/template" id="mb-login-form"><div class="non-mobile-shader">';
echo  '<div class="login">';
echo    '<span class="fields"></span>';
echo    '<i class="fa fa-times fa-lg closeForm" aria-hidden="true"></i>';
echo    '<span class="loading hid"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></span>';
echo  '</div>'; // login
echo '</div></script>';


// basic template for the shader to be populated with the form for login, class sign up and class cancel:
echo '<script type="text/template" id="mb-pop-over">';
echo  '<div class="content">';
echo    '<span class="main"></span>';
echo    '<i class="fa fa-times fa-lg closeForm" aria-hidden="true"></i>';
echo    '<span class="loading hid"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></span>';
echo  '</div>'; // content
echo '</script>';

// error messages for pop-over forms:
echo '<script type="text/template" id="mb-login-form-error">';
echo  '<%= loginERRmessage ? "<p>" + loginERRmessage + "</p>" : "" %>';
echo '</script>';

// this is the masthead login template:
echo '<script type="text/template" id="mb-login-stranger">';
echo   '<a class="logIn">Sign in</a>';
echo '</script>';
echo '<script type="text/template" id="mb-login-user">';
echo   '<a class="mbAccount"><span><i class="fa fa-user" aria-hidden="true"></i></span></a>';
echo '</script>';

// Sign In pop-over:
echo '<script type="text/template" id="mb-log-in-fields">';
echo   '<h3>Already a member? Sign in here:</h3>';
echo   '<span class="error"></span>';
echo   '<form>';
echo     '<label for="mb-username">Username:</label>';
echo     '<input type="text" name="username" id="mb-username"<%= cachedUserName ? " value=\"" + cachedUserName + "\"" : "" %> />';
echo     '<label for="mb-password">Password:</label>';
echo     '<input type="password" name="password" id="mb-password" class="mb-password" autocomplete="off" />';
echo     '<input type="submit" value="Sign in" class="mb-login-button" />';
echo   '</form>';
echo   '<div class="new-user">';
echo     '<a href="<%- urlMBloginForm %>">';
echo       '<h3><%- formMessage %></h3>';
echo       '<img src="<%- mbFeedURL %>../images/MINDBODY-company-logo.png" />';
echo     '</a>';
echo   '</div>';
echo '</script>';

// sign in to class pop over content
echo '<script type="text/template" id="mb-sign-in-fields">';
echo   '<h3><%- dialogMessage %></h3>';
echo   '<p>';
echo     '<%- classStart.fullDate %><br />';
echo     '<%- classStart.hourCivilian %>:<%- classStart.minutes %> -';
echo     '<%- classEnd.hourCivilian %>:<%- classEnd.minutes %> <%- classEnd.am_pm %>,';
echo     '<%- durationReadable %>';
echo   '</p>';
echo   '<span class="error"></span>';
echo   '<a class="schedButton <%- buttonClass %>"><%- buttonConfirm %></a>';
echo   '<a class="schedButton cancel-button"><%- buttonEscape %></a>';
echo '</script>';

// client info pop-over. Displays info about MINDBODY account
echo '<script type="text/template" id="mb-client-account-info">';
echo   '<h1><%- client["FirstName"] %> <%- client["LastName"] %></h1>';
echo   '<p><a class="schedButton logOut"><i class="fa fa-user-times" aria-hidden="true"></i>Sign Out</a></p>';
echo   '<p>';
echo     '<%- client["Email"] %><br />';
echo     '<%- client["AddressLine1"] %><br />';
echo    '<%- client["City"] + " " + client["State"] + ", " + client["PostalCode"] %>';
echo   '</p>';
echo   '<p><a href="<%- urlMINDBODY %>" target="_blank">Manage my account with MINDBODY</a></p>';
// echo   '<p>Automatic log out: <span class="countdown"><%- clientCountDownR %></span></p>';
echo '</script>';
