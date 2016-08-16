

// punta al task eventualmente dragged per la cancellazione
// settato da $("#droppable" ).droppable()
var draggedTask;

// funzione parametrica che gestisce tutte le chiamate ajax al server
function syncToServer( value, op ) {
	$.ajax({
		url: "php/drag-and-drop.php",
		data: { content: value, action: op },
		success:  function(jsonData) {
					$('.up').remove();
					var listItem;
					for ( var ob in jsonData ) {
						listItem = '<div data-id="' + jsonData[ob].id + '" id="' + jsonData[ob].id + '" class=\"col-lg-4 up\"><h2>' + jsonData[ob].objectname + '</h2><p class=\"text-danger\">'+jsonData[ob].description+'</p><p></br><h4>Quantity:</h4><div class="input-group"><span class="input-group-btn"><button type="button" class="btn btn-default" data-value="decrease" data-target="#i'+jsonData[ob].id+'" data-toggle="spinner"><span class="glyphicon glyphicon-minus"></span></button></span><input type="text" data-ride="spinner" id="i'+jsonData[ob].id+'" class="form-control input-number" value="'+jsonData[ob].quantity+'"><span class="input-group-btn"><button type="button" class="btn btn-default" data-value="increase" data-target="#i'+jsonData[ob].id+'" data-toggle="spinner"><span class="glyphicon glyphicon-plus"></span></button></span></div><p></br><h4>Total price: <b>'+jsonData[ob].price+'</b></h4></br></p></p><a data-id="' + jsonData[ob].id + '" href=\"#\" class=\"btn btn-lg btn-success confirm-delete\" data-toggle=\"modal\" data-target=\"#basicModal\">Remove all</a></div>';
						$(listItem).appendTo('#a');
					};
				},
		dataType: "json"
	});
}			

// codice da avviare al caricamento del DOM ...
$(function() {


	// caricamento della lista a tempo 0
	$.ajax({
		url: "php/initializeList.php",
		success:  function(jsonData) {

					$("#loading").hide();

					var listItem;
					for ( var ob in jsonData ) {
						listItem = '<div data-id="' + jsonData[ob].id + '" id="' + jsonData[ob].id + '" class=\"col-lg-4 up\"><h2>' + jsonData[ob].objectname + '</h2><p class=\"text-danger\">'+jsonData[ob].description+'</p><p></br><h4>Quantity:</h4><div class="input-group"><span class="input-group-btn"><button type="button" class="btn btn-default" data-value="decrease" data-target="#i'+jsonData[ob].id+'" data-toggle="spinner"><span class="glyphicon glyphicon-minus"></span></button></span><input type="text" data-ride="spinner" id="i'+jsonData[ob].id+'" class="form-control input-number" value="'+jsonData[ob].quantity+'"><span class="input-group-btn"><button type="button" class="btn btn-default" data-value="increase" data-target="#i'+jsonData[ob].id+'" data-toggle="spinner"><span class="glyphicon glyphicon-plus"></span></button></span></div><p></br><h4>Total price: <b>'+jsonData[ob].price+'</b></h4></br></p></p><a data-id="' + jsonData[ob].id + '" href=\"#\" class=\"btn btn-lg btn-success confirm-delete\" data-toggle=\"modal\" data-target=\"#basicModal\">Remove all</a></div>';
						$(listItem).appendTo('#a');
					}

				},
		dataType: "json"
	});

	// valida il campo di input e, se i dati sono corretti, invia dato al server e ricrea lista task
	// dipende dal plugin jquery.validate.min.js - vedi http://docs.jquery.com/Plugins/Validation
	$("form").validate({
		rules: {
			obj: {
				required: true,
				minlength: 3,
				maxlength: 20
			},

			descr: {
				required: true,
				minlength: 3,
				maxlength: 20
			},

			pr: {
				required: true,
				maxlength: 10,
				number: true
			},

			qty: {
				required: true,
				maxlength: 10,
				number: true
			}
		},
		messages: {
			obj: {
				required: "Please enter an object",
				minlength: "At least 3 chars",
				maxlength: "At most 20 chars"
			},

			descr: {
				required: "Please enter a description",
				minlength: "At least 3 chars",
				maxlength: "At most 20 chars"
			},

			pr: {
				required: "Please enter a price",
				maxlength: "Please enter a real price",
				number: "Please insert a number"
			},

			qty: {
				required: "Please enter a quantity",
				maxlength: "Please enter a real quantity",
				number: "Please insert a number"
			}
		},
		submitHandler: function() {

			var value = [$("#obj").val(), $("#descr").val(), $("#pr").val(), $("#qty").val()];
			syncToServer( value, "addNewTask");
			$("#obj").val("");
			$("#descr").val("");
			$("#pr").val("");
			$("#qty").val("");
		}							   
	});

	/*// permette il sort dei task nella lista e invia la lista riordinata al server
	$( "#sortable" ).sortable(
	    {
			cursor: 'crosshair',
			update: function(event, ui) {

				// ------------- start list id serialization
				var serialized = [];
				$("#sortable li").each(
					function() {
						var id = $(this).attr("id");
						serialized.push(id);
					}
				);
				// ------------- end list id serialization				
				
				syncToServer( serialized, "updateList");
			}				  
		}
	);*/

	// .disableSelection() is a core utility. It's useful for making text elements, or elements that contain
	// text, not text-selectable. For example, if you have a draggable element, you may not want text selection
	// to occur when the user goes to drag the element.
	$( "#sortable" ).disableSelection();


//passa id per cancellare elemento
$(document).on('click', '.confirm-delete', function() {

    var id = $(this).attr('data-id'); 
	$('#basicModal').data('id',id);
    })

//conferma cancellazione tramite modal
$('#btnDel').click(function() {
    
  	var deletedId = $('#basicModal').data('id');alert(deletedId);
  	$('[data-id='+deletedId+']').remove();
  	syncToServer( deletedId, "delTask");
  	$('#basicModal').modal('hide');
});



}); 
