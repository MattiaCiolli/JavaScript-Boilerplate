<?php
	require ('itemslist.class.php');

	$myItemsList = new ItemsList();

	//just to simulate the server delay
	sleep(1);

    header("Content-type: application/json");  // myme-type standard !
	print $myItemsList->BuildItemsList();
?> 
