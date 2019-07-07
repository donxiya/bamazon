var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	password: "Ac!00899297",
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
		var displayTable = new Table({
			head: ["ID", "Name", "Department", "Price", "Quantity"],
			colWidths: [20, 20, 20, 20, 20]
		});
		for (i = 0; i < res.length; i++) {
			displayTable.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}
		console.log(displayTable.toString());
		managerAction();
	});
};
function viewLow() {
	connection.query('SELECT * FROM Products', function (err, res) {
		if (err) { console.log(err) };
		var displayTable = new Table({
			head: ["ID", "Name", "Department", "Price", "Quantity"],
			colWidths: [20, 20, 20, 20, 20]
		});
		for (i = 0; i < res.length; i++) {
			if (res[i].stock_quantity <= 5) {
				displayTable.push(
					[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
			}
		}
		console.log(displayTable.toString());
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
		connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' + quantity + ' WHERE item_id =' + ID);
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
		var id = answers.ID;
		var name = answers.Name;
		var department = answers.Department;
		var price = answers.Price;
		var quantity = answers.Quantity;
		console.log(id, name, department, price, quantity);
		newItemUpdate(id, name, department, price, quantity);
	});
};

function newItemUpdate(id, name, department, price, quantity) {
	connection.query("INSERT INTO products SET ?",{
		item_id:id,
		product_name:name,
		department_name:department,
		price:price,
		stock_quantity:quantity,
	  });

	view();
};


managerAction();