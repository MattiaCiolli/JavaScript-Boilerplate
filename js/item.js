function Item (itemname, description, price, quantity) {
	this.itemname = itemname;
    this.description = description;
	this.price = price;
	this.quantity = quantity;
}
 
Item.prototype.getInfo = function() {
	for (var v in this) { alert(v + ": " + this[v]);} 
};


$(document).ready(function(){
		createList();
		$( ".sort" ).sortable(
	    {
			cursor: 'crosshair',
			update: function(event, ui) {

				//serialize id
				var orderID = [];
				$(".sort .col-lg-4").each(
					function() {
						var id = $(this).attr("id");
						orderID.push(id);
					}
				);			
				
				updateOrder( orderID, "reorderList");
			}				  
		}
	);
		$( "#sortable" ).disableSelection();//prevents text selection on sortable elements
	});


function createList() {
	$.ajax({
		url: "php/initializeList.php",
		success:  function(jsonData) {

			$('.up').remove();
			listItem=[];

			for ( var ob in jsonData ) {

				var item= new Item();
				item=jsonData[ob];
				listItem.push(item);
			}

			$("#loading").hide();
			
			for ( var ob in listItem ) {
				var appendOb = '<div data-id="' + listItem[ob].id + '" id="' + listItem[ob].id + '" class=\"col-lg-4 up\"><h2>' + listItem[ob].itemname + '</h2></div>';
				$(appendOb).appendTo('#a');
			}

		},
		
		error: function (request, status, error) {
        alert(status);},
		
		dataType: "json"
	});
}	

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
