<?php

    session_start();

    function getRealIp() {
       if (!empty($_SERVER['HTTP_CLIENT_IP'])) {  //check ip from share internet
         $ip=$_SERVER['HTTP_CLIENT_IP'];
       } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {  //to check ip is pass from proxy
         $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
       } else {
         $ip=$_SERVER['REMOTE_ADDR'];
       }
       return $ip;
    }

    function writeLog($where) {

    	$ip = getRealIp(); // Get the IP from superglobal
    	$host = gethostbyaddr($ip);    // Try to locate the host of the attack
    	$date = date("d M Y");

    	// create a logging message with php heredoc syntax
    	$logging = <<<LOG
    		\n
    		<< Start of Message >>
    		There was a hacking attempt on your form. \n
    		Date of Attack: {$date}
    		IP-Adress: {$ip} \n
    		Host of Attacker: {$host}
    		Point of Attack: {$where}
    		<< End of Message >>
LOG;
// Awkward but LOG must be flush left

            // open log file
    		if($handle = fopen('hacklog.log', 'a')) {

    			fputs($handle, $logging);  // write the Data to file
    			fclose($handle);           // close the file

    		} else {  // if first method is not working, for example because of wrong file permissions, email the data

    			$to = 'ADMIN@gmail.com';
            	$subject = 'HACK ATTEMPT';
            	$header = 'From: ADMIN@gmail.com';
            	if (mail($to, $subject, $logging, $header)) {
            		echo "Sent notice to admin.";
            	}

    		}
    }


	// CHECK TO SEE IF THIS IS A MAIL POST
	if (isset($_POST['URL-main'])) {

		// Building a whitelist array with keys which will send through the form, no others would be accepted later on
		$whitelist = array('name','email','subject','comments');

		// Building an array with the $_POST-superglobal
		foreach ($_POST as $key=>$item) {

				// Check if the value $key (fieldname from $_POST) can be found in the whitelisting array, if not, die with a short message to the hacker
				if (!in_array($key, $whitelist)) {

					writeLog('Unknown form fields');
					die("Hack-Attempt detected. Please use only the fields in the form");

				}
		}

		// Lets check the URL whether it's a real URL or not. if not, stop the script

		if(!filter_var($_POST['URL-main'],FILTER_VALIDATE_URL)) {
					writeLog('URL Validation');
				die('Hack-Attempt detected. Please insert a valid URL');
		}

		// PREPARE THE BODY OF THE MESSAGE

		$message = '<html><body>';
		$message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
		$message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . strip_tags($_POST['name']) . "</td></tr>";
		$message .= "<tr style='background: #eee;'><td><strong>Email:</strong> </td><td>" . strip_tags($_POST['email']) . "</td></tr>";
		$message .= "<tr style='background: #eee;'><td><strong>Subject:</strong> </td><td>" . strip_tags($_POST['subject']) . "</td></tr>";
		$message .= "<tr style='background: #eee;'><td><strong>Comments:</strong> </td><td>" . strip_tags($_POST['comments']) . "</td></tr>";
		$message .= "</table>";
		$message .= "</body></html>";


		//  MAKE SURE THE "FROM" EMAIL ADDRESS DOESN'T HAVE ANY NASTY STUFF IN IT

		$pattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i";
		if (preg_match($pattern, trim(strip_tags($_POST['req-email'])))) {
			$cleanedFrom = trim(strip_tags($_POST['req-email']));
		} else {
			return "The email address you entered was invalid. Please try again!";
		}


		//   CHANGE THE BELOW VARIABLES TO YOUR NEEDS

		$to = 'frontdesk@frankflitton.com';

		$subject = "📬 " . strip_tags($_POST['subject']);

		$headers = "From: " . $cleanedFrom . "\r\n";
		$headers .= "Reply-To: ". strip_tags($_POST['req-email']) . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		if (mail($to, $subject, $message, $headers)) {
			echo 'Your message has been sent.';
		} else {
			echo 'There was a problem sending the email.';
		}

		// DON'T BOTHER CONTINUING TO THE HTML...
		die();

	} else {

   		if (!isset($_SESSION[$form.'_token'])) {

   		} else {
   			echo "Hack-Attempt detected. Got ya!.";
   			writeLog('Formtoken');
   	    }

   	}

?>
