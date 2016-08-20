$(document).ready(function(){
//rule to prevent negative or 0 quantities
jQuery.validator.addMethod("greaterthan", function(value, element, param) {
  return this.optional(element) || value > param;
}, "Insert a real quantity");

// valida il campo di input e, se i dati sono corretti, invia dato al server e ricrea lista item
	// dipende dal plugin jquery.validate.min.js - vedi http://docs.jquery.com/Plugins/Validation
	$("#homeform").validate({
		rules: {
			item: {
				required: true,
				minlength: 3,
				maxlength: 20
			},

			descr: {
				required: true,
				minlength: 3,
				maxlength: 50
			},

			pr: {
				required: true,
				maxlength: 10,
				number: true
			},

			qty: {
				required: true,
				maxlength: 10,
				number: true,
				greaterthan: 0
			}
		},
		messages: {
			item: {
				required: "Please enter an item",
				minlength: "At least 3 chars",
				maxlength: "At most 20 chars"
			},

			descr: {
				required: "Please enter a description",
				minlength: "At least 3 chars",
				maxlength: "At most 50 chars"
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

			var value = [$("#item").val().capitalizeFirstLetter(), $("#descr").val(), $("#pr").val(), $("#qty").val()];
			syncToServer( value, "addNewItem");
			$("#item").val("");
			$("#descr").val("");
			$("#pr").val("");
			$("#qty").val("");
		},
		highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }							   
	});


// valida il campo di input e, se i dati sono corretti, invia dato al server e ricrea lista item
	// dipende dal plugin jquery.validate.min.js - vedi http://docs.jquery.com/Plugins/Validation
	$("#editform").validate({
		rules: {
			edititem: {
				required: true,
				minlength: 3,
				maxlength: 20
			},

			eddescr: {
				required: true,
				minlength: 3,
				maxlength: 50
			},

			edpr: {
				required: true,
				maxlength: 10,
				number: true
			},

			edqty: {
				required: true,
				maxlength: 10,
				number: true,
				greaterthan: 0
			}
		},
		messages: {
			edititem: {
				required: "Please enter an item",
				minlength: "At least 3 chars",
				maxlength: "At most 20 chars"
			},

			eddescr: {
				required: "Please enter a description",
				minlength: "At least 3 chars",
				maxlength: "At most 50 chars"
			},

			edpr: {
				required: "Please enter a price",
				maxlength: "Please enter a real price",
				number: "Please insert a number"
			},

			edqty: {
				required: "Please enter a quantity",
				maxlength: "Please enter a real quantity",
				number: "Please insert a number"
			}
		},
		submitHandler: function() {

			var value = [$('#editModal').data('id'), $("#edititem").val().capitalizeFirstLetter(), $("#eddescr").val(), $("#edpr").val(), $("#edqty").val()];
			syncToServer( value, "updateList");
			$('#editModal').modal('hide');

		},
		highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    							   
	});

	});