<?php
// login underscore templates
?>

<script type="text/template" id="mb-login-stranger">
  <a class="logIn">Sign in</a>
</script>
<script type="text/template" id="mb-login-user">
  <a class="account"><%- client['FirstName'] %></div>
  <a class="logOut">log out</div>
  <br /><span class="countdown"></span>
</script>

<script type="text/template" id="mb-login-form">
  <div class="non-mobile-shader">

  </div>
</script>

<script type="text/template" id="mb-log-in-fields">
  <div class="login">
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
    <span class="loading hid"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></span>
  </div>
</script>



<script type="text/template" id="mb-sign-in-fields">
  <div class="login">
    <h3>Join <%- ClassDescription.Name %></h3>
    <p>
      <%- classStart.fullDate %><br />
      <%- classStart.hourCivilian %>:<%- classStart.minutes %> -
      <%- classEnd.hourCivilian %>:<%- classEnd.minutes %> <%- classEnd.am_pm %>,
      <%- durationReadable %>
    </p>
    <a href="" class="schedButton signin-button">Confirm</a>
    <a href="" class="schedButton cancel-button">Cancel</a>
    <span class="loading hid"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></span>
  </div>
</script>


<script type="text/template" id="mb-login-form-error">
  <%= loginERRmessage ? '<p>' + loginERRmessage + '</p>' : '' %>
</script>
