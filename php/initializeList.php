<?php
	require ('itemslist.class.php');

	$myItemsList = new ItemsList();

	// RIMUOVERE SLEEP(): è qui solo per simulare ritardo di rete
	// in caso di collegamento su localhost
	sleep(1);

    header("Content-type: application/json");  // myme-type standard !
	print $myItemsList->BuildItemsList();
?> 
