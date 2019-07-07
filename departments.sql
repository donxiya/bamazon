DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products(
	department_id INT(3) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (department_id)
);

Select * FROM products;
VALUES  (001, "depart1", 1.00),
        (002, "depart2", 2.00),
        (003, "depart3", 3.00),