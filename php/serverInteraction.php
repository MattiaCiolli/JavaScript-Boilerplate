<?php
// load helper class
require_once ('itemslist.class.php');

// create itemsList object
$myItemsList = new ItemsList();

// read parameters
$action = $_GET['action'];
$content = $_GET['content'];

//just to simulate the server delay
sleep(1);

header('Expires: Fri, 25 Dec 1980 00:00:00 GMT'); // time in the past
header('Last-Modified: ' . gmdate( 'D, d M Y H:i:s') . 'GMT');
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
header("Content-type: application/json");  // myme-type standard !

// execute the client request and return the updated items list
echo $myItemsList->Process($content, $action);
?>
