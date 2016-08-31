function Item (ordernum, itemname, description, price, quantity) {
    this.ordernum = ordernum;
	this.itemname = itemname;
    this.description = description;
	this.price = price;
	this.quantity = quantity;
}
 
Item.prototype.getInfo = function(item) {
	for (var v in item) { document.write(v + ": " + item[v]); } 
};


$(document).ready(function(){
		createList();
		$('#sort').sortable({
			update: function(event, ui) {
				
				//aggiustare id perche non funziona con numeri
				var orderID = $(this).sortable('serialize');//creates an array of the item's ids after the sort
				updateOrder(orderID, "reorderList");
			}
		});
	});


function createList() {
	$.ajax({
		url: "php/initializeList.php",
		success:  function(jsonData) {

			$("#loading").hide();

			var listItem=JSON.parse(jsonData);
			
			for ( var ob in listItem ) {
				var appendOb = '<div data-id="' + jsonData[ob].id + '" id="' + jsonData[ob].id + '" class=\"col-lg-4 up sort\"><h2>' + jsonData[ob].itemname + '</h2></div>';
				$(listItem).appendTo('#a');
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

/*
var grocery_list = {
  "Banana": { category: "produce", price: 5.99 },
  "Chocolate": { category: "candy", price: 2.75 },
  "Wheat Bread": { category: "grains and breads", price: 2.99 }
}

var wrapper = $('#wrapper'), container;
for (var key in grocery_list){
    container = $('<div id="grocery_item" class="container"></div>');
    wrapper.append(container);
    container.append('<div class="item">' + key +'</div>');
    container.append('<div class="category">' + grocery_list[key].category +'</div>');
    container.append('<div class="price">' + grocery_list[key].price +'</div>');
}
*/