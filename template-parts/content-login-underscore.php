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

// error messages for pop-over forms:
echo '<script type="text/template" id="mb-login-form-error">';
echo  '<%= loginERRmessage ? "<p>" + loginERRmessage + "</p>" : "" %>';
echo '</script>';

// this is the masthead login template: ?>
<script type="text/template" id="mb-login-stranger">
  <a class="logIn">Sign in</a>
</script>
<script type="text/template" id="mb-login-user">
  <a class="mbAccount">
    <span>
      <i class="fa fa-user" aria-hidden="true"></i>
    </span>
    <!-- <%- client["FirstName"] %> -->
  </a>
  <br />
  <a class="logOut">Sign out</a>
  <br />
  <span class="countdown"></span>
</script>



<script type="text/template" id="mb-log-in-fields">
  <h3>Already a member? Sign in here:</h3>
  <span class="error"></span>
  <form>
    <label for="mb-username">Username:</label>
    <input type="text" name="username" id="mb-username"<%= cachedUserName ? ' value="' + cachedUserName + '"' : '' %> />

    <label for="mb-password">Password:</label>
    <input type="password" name="password" id="mb-password" class="mb-password" autocomplete="off" />

    <input type="submit" value="Sign in" class="mb-login-button" />
  </form>
  <div class="new-user">
    <a href="<%- urlMBloginForm %>">
      <h3><%- formMessage %></h3>
      <img src="<%- mbFeedURL %>../images/MINDBODY-company-logo.png" />
    </a>
  </div>
</script>

<script type="text/template" id="mb-sign-in-fields">
  <h3><%- dialogMessage %></h3>
  <p>
    <%- classStart.fullDate %><br />
    <%- classStart.hourCivilian %>:<%- classStart.minutes %> -
    <%- classEnd.hourCivilian %>:<%- classEnd.minutes %> <%- classEnd.am_pm %>,
    <%- durationReadable %>
  </p>
  <span class="error"></span>
  <a class="schedButton <%- buttonClass %>"><%- buttonConfirm %></a>
  <a class="schedButton cancel-button"><%- buttonEscape %></a>
</script>
