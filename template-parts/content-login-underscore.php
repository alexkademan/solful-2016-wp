<?php
// login underscore templates
?>

<script type="text/template" id="mb-login-stranger">
  <a class="logIn">Sign in</a>
</script>
<script type="text/template" id="mb-login-user">
  <a class="account"><%- client['FirstName'] %></div>
  <a class="logOut">log out</div>
</script>

<script type="text/template" id="mb-login-form">
  <div class="non-mobile-shader">
    <div class="login">
      <h3>Already a member? Sign in here:</h3>
      <form>
        <label for="mb-username">Username:</label>
        <input type="text" name="username" id="mb-username">

        <label for="mb-password">Password:</label>
        <input type="text" name="password" id="mb-password" class="mb-password">

        <input type="submit" value="Sign in" class="mb-login-button">
      </form>
    </div>
  </div>
</script>
