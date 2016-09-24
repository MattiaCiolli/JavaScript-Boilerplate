CREATE TABLE ItemsToBuy (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  ordernum INT UNSIGNED NOT NULL default '0',
  itemname VARCHAR(100) NOT NULL default '',
  price FLOAT(6,2) NOT NULL default '0',
  description VARCHAR(100) NOT NULL default '',
  quantity INT UNSIGNED NOT NULL default '0',
  PRIMARY KEY (id)
);
