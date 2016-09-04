//item object
function Item (id, itemname, description, price, quantity) {
	this.id = id;
	this.itemname = itemname;
	this.description = description;
	this.price = price;
	this.quantity = quantity;
}

Item.prototype.getInfo = function() {
	
	return 'ID: ' + this.id + ', item name: ' + this.itemname + ', Description: ' + this.description + ', Price: ' + this.price + ' Quantity: ' + this.quantity + '';
	
};


$(document).ready(function(){
	createList();
		$( ".sort" ).sortable(//allows items to be sortable
		{
			cursor: 'crosshair',
			update: function(event, ui) {//new order based on the position of the ids

				//serialize ids 
				var orderID = [];
				$(".sort .col-md-4").each(
					function() {
						var id = $(this).attr("id");
						orderID.push(id);//array with ids in new order
					}
					);			
				
				updateOrder( orderID, "reorderList");
			}				  
		}
		);
		$( "#sortable" ).disableSelection();//prevents text selection on sortable elements
	});


//populates the page with items from the server
function createList() {
	$.ajax({
		url: "php/initializeList.php",
		success:  function(jsonData) {

			$('.up').remove();
			listItem=[];//kept global just to work with it via console

			for ( var ob in jsonData ) {

				var item= new Item(jsonData[ob].id, jsonData[ob].itemname, jsonData[ob].description, jsonData[ob].price, jsonData[ob].quantity);
				listItem.push(item);
			}

			$("#loading").hide();
			
			for ( var ob in listItem ) {
				var appendOb = '<div id="' + listItem[ob].id + '" class=\"col-xs-6 col-sm-6 col-md-4 up\"><h2>' + listItem[ob].itemname + '</h2></div>';
				$(appendOb).appendTo('#a');
			}

		},
		
		error: function (request, status, error) {
			alert(status);},
			
			dataType: "json"
		});
}	


//sends the new order to the server
function updateOrder ( value, op ){
	$.ajax({
		url: "php/serverInteraction.php",
		data: { content: value, action: op },
		success: createList(),
		
		error: function (request, status, error) {
			alert(request.responseText);},

			dataType: "json"
		});
}		
