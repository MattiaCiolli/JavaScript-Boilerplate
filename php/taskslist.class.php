<?php
// load error handler and database configuration
// require_once ('error_handler.php');
require_once ('config.php');

// This class builds a tasks list and 
// performs add/delete/reorder actions on it
class TasksList
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
  
  // Builds the tasks list
  public function BuildTasksList()
  {
    // initialize output
    $return_arr = array();
    // build query
    $result = $this->mMysqli->query('SELECT * FROM ObjectsToBuy ORDER BY ordernum ASC');
    // build task list as an associative array
    while ($row = $result->fetch_assoc()) 
    { 
    $myList[ 'id' ] = $row['id'];
	  $myList[ 'objectname' ] = $row['objectname'];
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
      // Reorder task list
      case 'updateList':
		
        $id = trim($this->mMysqli->real_escape_string($content[0]));
		    $obj = trim($this->mMysqli->real_escape_string($content[1]));
        $des = trim($this->mMysqli->real_escape_string($content[2]));
        $pr = trim($this->mMysqli->real_escape_string($content[3]));
        $qty = trim($this->mMysqli->real_escape_string($content[4]));
          
          // update item
          $result = $this->mMysqli->query('UPDATE ObjectsToBuy SET objectname="' . $obj . '", description="' . $des . '", price="' . $pr . '", quantity="' . $qty .'" WHERE id="' . $id . '"');
        $updatedList = $this->BuildTasksList();
        return $updatedList;
        break;
     
      // Add a new task
      case 'addNewTask':
        // escape input data
        $obj = trim($this->mMysqli->real_escape_string($content[0]));
        $des = trim($this->mMysqli->real_escape_string($content[1]));
        $pr = trim($this->mMysqli->real_escape_string($content[2]));
        $qty = trim($this->mMysqli->real_escape_string($content[3]));
        // continue only if task name is not null
        if ($obj)
        {
          // obtain the highest order_no
          $result = $this->mMysqli->query('SELECT (MAX(ordernum) + 1) ' . 
                                          'AS ordernum FROM ObjectsToBuy');
          $row = $result->fetch_assoc();
          // if the table is empty, order_no will be null
          $order = $row['ordernum'];          
          if (!$order) $order = 1;
          // insert the new task as the bottom of the list
          $result = $this->mMysqli->query
                          ('INSERT INTO ObjectsToBuy (ordernum, objectname, description, price, quantity ) ' . 
                           'VALUES ("' . $order . '", "' . $obj . '", "' . $des . '", "' . $pr . '", "' . $qty . '")');
          // return the updated tasks list
          $updatedList = $this->BuildTasksList();
          return $updatedList;
        }
        break;
      
      // Delete task
      case 'delTask':
        // escape input data
        $content = trim($this->mMysqli->real_escape_string($content));
        // delete the task
        $result = $this->mMysqli->query('DELETE FROM ObjectsToBuy WHERE id="' . 
                                        $content . '"');
        $updatedList = $this->BuildTasksList();
        return $updatedList;
        break;
    

    // get an object by id
      case 'getObj':
        // escape input data
        $content = trim($this->mMysqli->real_escape_string($content));
        // delete the task
        $result = $this->mMysqli->query('SELECT * FROM ObjectsToBuy WHERE id="' . 
                                        $content . '"');
      $return_arr = array();
      while ($row = $result->fetch_assoc()) 
    { 
    $myList[ 'id' ] = $row['id'];
    $myList[ 'objectname' ] = $row['objectname'];
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
