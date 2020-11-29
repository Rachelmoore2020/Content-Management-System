const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'employeesInfo_DB',
});
connection.connect((err) => {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Roles',
        'View all Departments',
        'Add Employee',
        'Add A Department',
        'Add A Role',
        'Update Employee Role',
        'exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmp();
          break;
        case 'View All Roles':
          viewRole();
          break;
        case 'View all Departments':
          viewDept();
          break;
        case 'Add Employee':
          addEmp();
          break;
        case 'Add A Department':
          addDept();
          break;
          case 'Add A Role':
          addRole();
          break;
          case 'Update Employee Role':
          updateEmpRole();
          break;
        case 'exit':
          connection.end();
          break;
      }
    });
};
const askNext = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do next?',
      choices: [
        'View All Employees',
        'View All Roles',
        'View all Departments',
        'Add Employee',
        'Add A Department',
        'Add A Role',
        'Update Employee Role',
        'exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmp();
          break;
        case 'View All Roles':
          viewEmpByDept();
          break;
        case 'View all Departments':
          viewEmpByDept();
          break;
        case 'Add Employee':
          addEmp();
          break;
        case 'Add A Department':
          addDept();
          break;
          case 'Add A Role':
          addRole();
          break;
          case 'Update Employee Role':
          updateEmpRole();
          break;
        case 'exit':
          connection.end();
          break;
      }
    });
};

// View employees, roles and depts
// -----------------------------------------------// and

const viewAllEmp = () => {
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    console.log("All of the employees are: ", res);
    
  });
  askNext();    
}   

const viewRole = () => {
  connection.query("SELECT title FROM empRole", (err, res) => {
    if (err) throw err;
    console.log("All of the roles are: ", res);
    
  });
  askNext();    
}   
const viewDept = () => {
  connection.query("SELECT deptName FROM department", (err, res) => {
    if (err) throw err;
    console.log("All of the departments are: ", res);
    
  });
  askNext();    
}  

// Add employees, roles and depts
// -----------------------------------------------//
const addEmp = () => {
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    console.log("All of the employees are: ", res);
    
  });
  askNext();    
}   

const addRole = () => {
  connection.query("SELECT title FROM empRole", (err, res) => {
    if (err) throw err;
    console.log("All of the roles are: ", res);
    
  });
  askNext();    
}   
const addDept = () => {
  connection.query("SELECT deptName FROM department", (err, res) => {
    if (err) throw err;
    console.log("All of the departments are: ", res);
    
  });
  askNext();    
} 

// Add another employee
// const moreEmp = () => {
//   inquirer.prompt([
   
//     {
//       type: 'list',
//       name: 'moreEmployees',
//       message: 'Do you want to add another employee',
//       choices: ["yes", "no"]
//     }
//       ])
//     .then(answers => {
//       if(answers.moreEmployees === "yes") {