<?php
/**
 * $Id: LuminanceAuthenticator.php 10 2007-05-27 10:55:12Z spocke $
 *
 * @package LuminanceAuthenticator
 * @author Moxiecode
 * @copyright Copyright � 2007, Moxiecode Systems AB, All rights reserved.
 */

/**
 * This class handles MCImageManager LuminanceAuthenticator stuff.
 *
 * @package LuminanceAuthenticator
 */
class Moxiecode_LuminanceAuthenticator extends Moxiecode_ManagerPlugin {
	/**#@+
	 * @access public
	 */

	/**
	 * ..
	 */
	function Moxiecode_LuminanceAuthenticator() {
	}

	/**
	 * ..
	 */
	function onAuthenticate(&$man) {
		$config =& $man->getConfig();

		// Support both old and new format
		$pathKey = isset($config['SessionAuthenticator.path_key']) ? $config['SessionAuthenticator.path_key'] : $config["authenticator.session.path_key"];
		$rootPathKey = isset($config['SessionAuthenticator.rootpath_key']) ? $config['SessionAuthenticator.rootpath_key'] : $config["authenticator.session.rootpath_key"];

		// Switch path
		if (isset($_SESSION[$pathKey]))
			$config['filesystem.path'] = $_SESSION[$pathKey];

		// Switch root
		if (isset($_SESSION[$rootPathKey]))
			$config['filesystem.rootpath'] = $_SESSION[$rootPathKey];		
		
		return lum_call('Users', 'isSignedIn');
	}
}

// Add plugin to MCManager
$man->registerPlugin("LuminanceAuthenticator", new Moxiecode_LuminanceAuthenticator());
?>