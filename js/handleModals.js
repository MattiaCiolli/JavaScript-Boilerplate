//append modals to the document
$(document).ready(function(){ 
	$.get("errorModal.html", function (data) {
		$("#eModal").append(data);
	});
	$.get("confirmModals.html", function (data) {
		$("#eModal").append(data);
	});
 	//if after 3 seconds the items are still not loaded, show a modal
 	setInterval(function(){ if($("#loading").is(":visible")){$('#errorModal').modal('show');} }, 3000);
 });

//reload the page
$(document).on('click', '#reload', function () {
	window.location.reload(true);
});