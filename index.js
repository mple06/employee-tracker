//requires these dependencies
const inquirer = require('inquirer');
const mysql = require("mysql2");
const cTable = require("console.table");

const PORT = 3000;

//create connection to database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
},
    console.log("Connected to the Employee Database")
);

//starts the prompt for the user to select from
const start = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option",
            name: "choice",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Quit",
            ],
        },
    ])
        .then(data => {
            console.log(data);
            if (data.choice === "View all departments") {
                viewDepartments();
            } else if (data.choice === "View all roles") {
                viewRoles();
            } else if (data.choice === "View all employees") {
                viewEmployees();
            } else if (data.choice === "View all employees") {
                viewEmployees();
            } else if (data.choice === "Add a department") {
                addDepartment();
            } else if (data.choice === "Add a role") {
                addRole();
            } else if (data.choice === "Add an employee") {
                addEmployee();
            } else if (data.choice === "Update an employee role") {
                updateRole();
            } else {
                console.log("Have a nice day")
                process.exit();
            }
        })

}

//view info in departments
const viewDepartments = () => {
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) {
            throw err
            console.log(err)
        } else {
            console.table(data);
            start();
        }
    })
}

//view info in roles
const viewRoles = () => {
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) {
            throw err
            console.log(err)
        } else {
            console.table(data);
            start();
        }
    })
}
//view info in employees
const viewEmployees = () => {
    db.query(`SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.role_id`, (err, data) => {
        if (err) {
            throw err
            console.log(err)
        } else {
            console.table(data);
            start();
        }
    })
}

//add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "deptname"
        },
    ]).then(ans => {
        const query = `INSERT INTO department (name) VALUES (?);`;
        db.query(query, ans.deptname, (err, data) => {
            if (err) {
                throw err
                console.log(err)
            } else {
                console.table("Department added");
                start();
            };
        })
    })
}

//add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the new role?",
            name: "title"
        },
        {
            type: "number",
            message: "What is the salary?",
            name: "salary"
        },
        {
            type: "number",
            message: "Which department does this role belong to?",
            name: "dept"
        },
    ]).then(ans => {
        const query = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
        db.query(query, [ans.title, ans.salary, ans.dept], (err, data) => {
            if (err) {
                throw err
                console.log(err)
            } else {
                console.table("Role added");
                start();
            };
        })
    })
}

//add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the new employee's first name?",
            name: "employeeFirstName"
        },
        {
            type: "input",
            message: "What is the new employee's last name?",
            name: "employeeLastName"
        },
        {
            type: "number",
            message: "What is the employee's role?",
            name: "employeeRole"
        },
        {
            type: "number",
            message: "Who is the employee's manager?",
            name: "employeeManager"
        },
    ]).then(ans => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
        db.query(query, [ans.employeeFirstName, ans.employeeLastName, ans.employeeRole, ans.employeeManager], (err, data) => {
            if (err) {
                throw err
                console.log(err)
            } else {
                console.table("Employee added");
                start();
            };
        })
    })

}
//update an employee
const updateRole = () => {
    inquirer.prompt([
        {
            type: "number",
            message: "What is the employee ID?",
            name: "employeeId"
        },
        {
            type: "number",
            message: "What is the new role ID?",
            name: "newId"
        },
    ]).then(ans => {
        const employeeNumber = ans.employeeId;
        const newNumber = ans.newId;
        const query = `UPDATE employee SET role_id=${newNumber} WHERE employee_id=${employeeNumber};`;
        db.query(query, (err, data) => {
            if (err) {
                throw err
                console.log(err)
            } else {
                console.table("Employee role updated");
                start();
            };
        })
    })
}


//starts the function
start();