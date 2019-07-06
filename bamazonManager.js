var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id" + connection.threadId);
});



function managerAction() {
	inquirer.prompt([{
		name: "action",
		type: "list",
		message: "Action on inventory: ",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}]).then(function (answers) {
		switch (answers.action) {
			case "View Products for Sale":
				view();
				break;
			case "View Low Inventory":
				viewLow();
				break;
			case "Add to Inventory":
				restock();
				break;
			case "Add New Product":
				addNew();
				break;
		}
	});
};

function view() {
	connection.query('SELECT * FROM Products', function (err, res) {
		if (err) { console.log(err) };
		var theDisplayTable = new Table({
			head: ["ID", "Name", "Department", "Price", "Quantity"],
			colWidths: [20, 20, 20, 20, 20]
		});
		for (i = 0; i < res.length; i++) {
			theDisplayTable.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}
		console.log(theDisplayTable.toString());
		view();
	});
};
function viewLow() {
	connection.query('SELECT * FROM Products', function (err, res) {
		if (err) { console.log(err) };
		var theDisplayTable = new Table({
			head: ["ID", "Name", "Department", "Price", "Quantity"],
			colWidths: [20, 20, 20, 20, 20]
		});
		for (i = 0; i < res.length; i++) {
			if (res[i].stock_quantity <= 5) {
				theDisplayTable.push(
					[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
			}
		}
		console.log(theDisplayTable.toString());
		view();
	});
};

function restock() {
	inquirer.prompt([
		{
			name: "ID",
			type: "input",
			message: "Item ID to restock: "
		},
		{
			name: "Quantity",
			type: "input",
			message: "Restock quantity:"
		},
	]).then(function (answers) {
		var ID = answers.ID;
		var quantity = answers.Quantity;
		restockUpdate(ID, quantity);
	});
};

function restockUpdate(ID, quantity) {
	connection.query('SELECT * FROM Products WHERE item_id = ' + ID, function (err, res) {
		if (err) { console.log(err) };
		connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' + quantity + 'WHERE item_id =' + item_id);
		view();
	});
}

function addNew() {
	inquirer.prompt([
		{
			name: "ID",
			type: "input",
			message: "ID: "
		},
		{
			name: "Name",
			type: "input",
			message: "Name:"
		},
		{
			name: "Department",
			type: "input",
			message: "Department:"
		},
		{
			name: "Price",
			type: "input",
			message: "Price:"
		},
		{
			name: "Quantity",
			type: "input",
			message: "Quantity:"
		},

	]).then(function (answers) {
		var id = answers.Id;
		var name = answers.Name;
		var department = answers.department;
		var price = answers.Price;
		var quantity = answers.Quantity;
		newItemUpdate(id, name, department, price, quantity);
	});
};

function newItemUpdate(name, category, price, quantity) {
	connection.query('INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES("' + id + '","' + name + '","' + category + '",' + price + ',' + quantity + ')');
	view();
};

view();