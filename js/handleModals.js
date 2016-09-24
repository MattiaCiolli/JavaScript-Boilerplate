//append modals to the document, after the opening body tag

	$.get("errorModal.html", function (data) {
		$("body").prepend(data);
	});
	$.get("confirmModals.html", function (data) {
		$("body").prepend(data);
	});

 	//if after 3 seconds the items are still not loaded, show a modal
 	setInterval(function(){ if($("#loading").is(":visible")){$('#errorModal').modal('show');} }, 3000);


//button to reload the page
$(document).on('click', '#reload', function () {
	window.location.reload(true);
});
