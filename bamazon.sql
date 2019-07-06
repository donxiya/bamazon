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

Select * FROM products;
VALUES (001, "item1", "depart1", 1.11, 1),
	   (002, "item2", "depart2", 2.22, 2),
	   (003, "item3", "depart3", 3.33, 3),