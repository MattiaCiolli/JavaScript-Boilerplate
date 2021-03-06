$(function() {

	//list loading at the beginning
	$.ajax({
		url: "php/initializeList.php",
		success:  function(jsonData) {
			$("#loading").hide();
			showItems(jsonData);
		},
		
		error: function (request, status, error) {
			$('#errorModal').modal('show');
		},

		dataType: "json"
	});		


//pass id to delete element
$(document).on('click', '.confirm-delete', function() {

	var id = $(this).attr('data-id'); 
	$('#delModal').data('id',id);

})

//pass id to edit element
$(document).on('click', '.editbtn', function() {

	var id = $(this).attr('data-id'); 
	$('#editModal').data('id',id);
	$("#loadingedit").show();
	getItem( id, "getItem");

})


//confirm deletion modal
$(document).on('click','#btnDel', function() {

	var deletedId = $('#delModal').data('id');
	$('[data-id='+deletedId+']').remove();
	syncToServer( deletedId, "delItem");
	$('#delModal').modal('hide');

});

}); 

//handles ajax calls to the server
function syncToServer( value, op ) {
	$.ajax({
		url: "php/serverInteraction.php",
		data: { content: value, action: op },
		success:  function(jsonData) {
			$('.up').remove();
			showItems(jsonData);	
		},
		
		error: function (request, status, error) {
			$('#errorModal').modal('show');
		},

		dataType: "json"
	});
}

//shows Items loaded from server and calculates the total price
function showItems(jsonData) {

	var listItem;
	var totalPrice=0;

	for ( var ob in jsonData ) {
		totalPrice=totalPrice+(jsonData[ob].price*jsonData[ob].quantity);
	}

	var showprices='<div class="alert alert-success up" role="alert"><h3><b>Total price: '+totalPrice.toFixed(2)+'€</b></h3></div>';
	$(showprices).appendTo('#a');

	for ( var ob in jsonData ) {
		listItem = '<div data-id="' + jsonData[ob].id + '" id="' + jsonData[ob].id + '" class=\"col-xs-12 col-sm-6 col-md-4 up\"><h2>' + jsonData[ob].itemname + '</h2><p class=\"text-danger\">'+jsonData[ob].description+'</p><p></br><h4>Quantity: <b>'+jsonData[ob].quantity+'</b></h4><p></br><h4>Unit price: <b>'+jsonData[ob].price+'€</b></h4></br><h4>Total price: <b>'+(jsonData[ob].price*jsonData[ob].quantity).toFixed(2)+'€</b></h4></br></p></p><a data-id="' + jsonData[ob].id + '" href=\"#\" class=\"btn btn-default editbtn\" data-toggle=\"modal\" data-target=\"#editModal\">Edit <span class="glyphicon glyphicon-edit"></span></a><a data-id="' + jsonData[ob].id + '" href=\"#\" class=\"btn btn-primary btn-danger confirm-delete\" data-toggle=\"modal\" data-target=\"#delModal\">Remove <span class="glyphicon glyphicon-trash"></span></a></div>';
		$(listItem).appendTo('#a');
	};
};	

//gets an item by its id. Called when editing an item
function getItem ( value, op ){
	$.ajax({
		url: "php/serverInteraction.php",
		data: { content: value, action: op },
		success:  function(jsonData) {

			$("#loadingedit").hide();

			for ( var ob in jsonData ) {
				$("#edititem").val(jsonData[ob].itemname);
				$("#eddescr").val(jsonData[ob].description);
				$("#edpr").val(jsonData[ob].price);
				$("#edqty").val(jsonData[ob].quantity);

			};

		},
		
		error: function (request, status, error) {
			$('#syncerrorModal').modal('show');
		},

		dataType: "json"
	});
};

//function to capitalize the first letter of a string. 
//added to prototype in order to use it like: 'string'.capitalizeFirstLetter()
String.prototype.capitalizeFirstLetter = function() {

	return this.charAt(0).toUpperCase() + this.slice(1);

}	
