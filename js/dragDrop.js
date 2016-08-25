$(document).ready(function(){

$( ".drag" ).draggable({
	revert: true
	});
	
//the circle is droppable. Accepts draggable items
$( "#drop" ).droppable({

      drop: function(event,ui){
    		var draggable = ui.draggable;//gets element dragged on circle
    		var id = draggable.attr("id");
		  	getInfo(id);
			}
    });

// simply opens a new page based on the dragged item's id 
function getInfo(id) {
	
	switch (id) {
		case 'elefante':
			window.open('https://en.wikipedia.org/wiki/Elephant');
			break;
		case 'tartaruga':
			window.open('https://en.wikipedia.org/wiki/Turtle');
			break;
		case 'ironmaiden':
			window.open('https://en.wikipedia.org/wiki/Iron_Maiden');
			break;
		case 'tempio':
			window.open('https://en.wikipedia.org/wiki/Chinese_temple');
			break;
}
}

});

