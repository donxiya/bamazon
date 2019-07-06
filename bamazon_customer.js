//setup
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
//err
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});

//display function
var display = function () {
    //query the table
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["ID", "Name", "Department", "Price", "Quantity"],
            colWidths: [20, 20, 20, 20, 20]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        purchase();
    });

}

function purchase(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Enter ID of the item.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"Quantity?",
		filter:Number
	},

 ]).then(function(answers){
 	var quantity = answers.Quantity;
 	var ID = answers.ID;
 	purchaseOrder(ID, quantity);
 });
};

function purchaseOrder(ID, quantity){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(quantity <= res[0].stock_quantity){
			var cost = res[0].price * quantity;
			console.log("Success");
			console.log("Total cost: " +cost);
			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + "WHERE item_id = " + ID);
		} else{
			console.log("Insufficient quantity.");
		};
		displayProducts();
	});
};

display(); 