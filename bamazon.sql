DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT(3) NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)

VALUES (001, "item1", "depart1", 1.11, 1),
	   (002, "item2", "depart2", 2.22, 2),
	   (003, "item3", "depart3", 3.33, 3),
	   (004, "item4", "depart1", 1.11, 1),
	   (005, "item5", "depart2", 2.22, 2),
	   (006, "item6", "depart3", 3.33, 3),
	   (007, "item7", "depart1", 1.11, 1),
	   (008, "item8", "depart2", 2.22, 2),
	   (009, "item9", "depart3", 3.33, 3),
	   (010, "item10", "depart1", 1.11, 1),
	   (011, "item11", "depart2", 2.22, 2),
	   (012, "item12", "depart3", 3.33, 3);

Select * FROM products;