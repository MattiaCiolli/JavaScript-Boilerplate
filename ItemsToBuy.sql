CREATE TABLE ItemsToBuy (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  ordernum INT UNSIGNED NOT NULL AUTO_INCREMENT,
  itemname VARCHAR(100) NOT NULL default '',
  price INT UNSIGNED NOT NULL default '0',
  description VARCHAR(100) NOT NULL default '',
  quantity INT UNSIGNED NOT NULL default '0',
  PRIMARY KEY (id)
);
