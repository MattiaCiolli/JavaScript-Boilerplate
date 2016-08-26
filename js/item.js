function Item (itemname, description, price, quantity) {
    this.itemname = itemname;
    this.description = description;
	this.price = price;
	this.quantity = quantity;
}
 
Item.prototype.getInfo = function(item) {
	var s;
	for (var v in item) { document.write(v + ": " + item[v]); } 
};