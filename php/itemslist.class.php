<?php
// load error handler and database configuration
// require_once ('error_handler.php');
require_once ('config.php');

// This class builds a items list and 
// performs add/delete/reorder actions on it
class ItemsList
{
  // stored database connection
  private $mMysqli;
  
  // constructor opens database connection
  function __construct() 
  {   
    // connect to the database
    $this->mMysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
  }

  // destructor closes database connection  
  public function __destruct() 
  {
    $this->mMysqli->close();
  }
  
  // Builds the items list
  public function BuildItemsList()
  {
    // initialize output
    $return_arr = array();
    // build query
    $result = $this->mMysqli->query('SELECT * FROM ItemsToBuy ORDER BY ordernum ASC');
    // build item list as an associative array
    while ($row = $result->fetch_assoc()) 
    { 
    $myList[ 'id' ] = $row['id'];
	$myList[ 'itemname' ] = $row['itemname'];
    $myList[ 'description' ] = $row['description'];
    $myList[ 'price' ] = $row['price'];
    $myList[ 'quantity' ] = $row['quantity'];
    array_push($return_arr,$myList);
    }
    // return the array as json 
    return json_encode($return_arr);
  }

  // Handles the server-side data processing
  public function Process($content, $action)
  {
    // perform action requested by client
    switch($action)
    {
      // Reorder item list
      case 'updateList':
		
        $id = trim($this->mMysqli->real_escape_string($content[0]));
		$itm = trim($this->mMysqli->real_escape_string($content[1]));
        $des = trim($this->mMysqli->real_escape_string($content[2]));
        $pr = trim($this->mMysqli->real_escape_string($content[3]));
        $qty = trim($this->mMysqli->real_escape_string($content[4]));
          
        // update item
        $result = $this->mMysqli->query('UPDATE ItemsToBuy SET itemname="' . $itm . '", description="' . $des . '", price="' . $pr . '", quantity="' . $qty .'" WHERE id="' . $id . '"');
        $updatedList = $this->BuilditemsList();
        return $updatedList;
        break;
     
      // Add a new item
      case 'addNewItem':
        // escape input data
        $itm = trim($this->mMysqli->real_escape_string($content[0]));
        $des = trim($this->mMysqli->real_escape_string($content[1]));
        $pr = trim($this->mMysqli->real_escape_string($content[2]));
        $qty = trim($this->mMysqli->real_escape_string($content[3]));
        // continue only if item name is not null
        if ($itm)
        {
          // obtain the highest order_no
          $result = $this->mMysqli->query('SELECT (MAX(ordernum) + 1) ' . 
                                          'AS ordernum FROM ItemsToBuy');
          $row = $result->fetch_assoc();
          // if the table is empty, order_no will be null
          $order = $row['ordernum'];          
          if (!$order) $order = 1;
          // insert the new item as the bottom of the list
          $result = $this->mMysqli->query
                          ('INSERT INTO ItemsToBuy (ordernum, itemname, description, price, quantity ) ' . 
                           'VALUES ("' . $order . '", "' . $itm . '", "' . $des . '", "' . $pr . '", "' . $qty . '")');
          // return the updated items list
          $updatedList = $this->BuilditemsList();
          return $updatedList;
        }
        break;
      
      // Delete item
      case 'delItem':
        // escape input data
        $content = trim($this->mMysqli->real_escape_string($content));
        // delete the item
        $result = $this->mMysqli->query('DELETE FROM ItemsToBuy WHERE id="' . 
                                        $content . '"');
        $updatedList = $this->BuilditemsList();
        return $updatedList;
        break;
    

    // get an item by id
      case 'getItem':
        // escape input data
        $content = trim($this->mMysqli->real_escape_string($content));
        // delete the item
        $result = $this->mMysqli->query('SELECT * FROM ItemsToBuy WHERE id="' . 
                                        $content . '"');
      $return_arr = array();
      while ($row = $result->fetch_assoc()) 
    { 
    $myList[ 'id' ] = $row['id'];
    $myList[ 'itemname' ] = $row['itemname'];
    $myList[ 'description' ] = $row['description'];
    $myList[ 'price' ] = $row['price'];
    $myList[ 'quantity' ] = $row['quantity'];
    array_push($return_arr,$myList);
    }
    // return the array as json 
    return json_encode($return_arr);
      
        break;
    }
  }
}
?>
