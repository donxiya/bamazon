var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("cli-table");
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Ac!00899297",
    database: "bamazon"
})

function supAction() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Action on department: ",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function (answers) {
        switch (answers.action) {
            case "View Product Sales by Department":
                view();
                break;
            case "Create New Department":
                newDep();
                break;
        }
    });
};

//view product sales by department
function view() {
    //prints the items for sale and their details
    connection.query('SELECT * FROM Departments', function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["ID", "Name", "Over Head Cost", "Sales", "Profit"],
            colWidths: [20, 20, 20, 20, 20]
        });
        for (i = 0; i < res.length; i++) {
            var profit = res[i].total_sales - res[i].over_head_costs;
            displayTable.push(
                [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].total_sales, profit]
            );
        }
        console.log(displayTable.toString());
        supAction();
    })
}

//create a new department
function newDep() {
    console.log('>>>>>>Creating New Department<<<<<<');
    //prompts to add deptName and numbers. if no value is then by default = 0
    inquirer.prompt([
        {
            type: "input",
            name: "ID",
            message: "ID: "
        }, {
            type: "input",
            name: "Name",
            message: "Department Name: "
        }, {
            type: "input",
            name: "Cost",
            message: "Over Head Cost: ",
        }, {
            type: "input",
            name: "Sales",
            message: "Product Sales: ",
        }
    ]).then(function (answers) {
        connection.query('INSERT INTO Departments SET ?', {
            department_id: answers.ID,
            department_name: answers.Name,
            over_head_costs: answers.Cost,
            total_sales: answers.Sales
        }, function (err, res) {
            if (err) throw err;
            console.log('Added department.');
        })
        supAction();
    });
}

supAction();