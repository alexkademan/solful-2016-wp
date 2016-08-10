<?php
session_start();

require_once __DIR__ . '/mb-config.php';
require_once __DIR__ . '/mindbody-php-api/src/MB_API.php';
$mb = new \DevinCrossman\Mindbody\MB_API( $mb_config );

if(!empty($_POST)) {
	$validateLogin = $mb->ValidateLogin(array(
		'Username' => $_POST['username'],
		'Password' => $_POST['password']
	));

	// print_r($_SESSION['ValidateLoginResult']['GUID']);
	// print_r($validateLogin['ValidateLoginResult']['GUID']);


	if(!empty($validateLogin['ValidateLoginResult']['GUID'])) {
		if(isset($_SESSION['MINDBODY']['login'])){
			unset($_SESSION['MINDBODY']['login']);
		}
		$_SESSION['MINDBODY']['login']['GUID'] = $validateLogin['ValidateLoginResult']['GUID'];
		$_SESSION['MINDBODY']['login']['client'] = $validateLogin['ValidateLoginResult']['Client'];
		displayWelcome();
	} else {
		if(!empty($validateLogin['ValidateLoginResult']['Message'])) {
			echo $validateLogin['ValidateLoginResult']['Message'];
		} else {
			echo "Invalid Login<br />";
		}
		displayLoginForm();
	}

} else if(empty($_SESSION['MINDBODY']['login']['GUID'])) {
	displayLoginForm();

} else {
	displayWelcome();
}

function displayLoginForm() {
	echo <<<EOD
<form method="POST">
	<input type="text" name="username" placeholder="username" />
	<input type="password" name="password" placeholder="password" />
	<button type="submit">Log in</button> <a href="signup.php">Sign up</a>
</form>
EOD;
}

function displayWelcome() {
	echo "Welcome ".$_SESSION['MINDBODY']['login']['client']['FirstName'].' '.$_SESSION['MINDBODY']['login']['client']['LastName'];
	echo "<br />";
	echo "<a href='logout-01.php'>Log out</a>";

	// print_r($_SESSION['MINDBODY']['login']);

}
