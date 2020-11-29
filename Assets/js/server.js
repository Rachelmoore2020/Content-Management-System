const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
        'View All Departments',
        'Add an Employee',
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
        case 'Exit':
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
    askNext();
  }); 
}   

const viewRole = () => {
  connection.query("SELECT title FROM empRole", (err, res) => {
    if (err) throw err;
    console.log("All of the roles are: ", res);
    askNext();  
  });   
}   
const viewDept = () => {
  connection.query("SELECT deptName FROM department", (err, res) => {
    if (err) throw err;
    console.log("All of the departments are: ", res);
    askNext(); 
  }) 
}  

// Add employees, roles and depts
// -----------------------------------------------//


const addEmp = () => {
  inquirer.prompt([
    
    {
      type: 'input',
      name: 'firstname',
      message: 'What is the employees first name?'
    },
    {
      type: 'input',
      name: 'lastname',
      message: 'What is the employees last name?'
    },
    {
      type: 'input',
      name: 'roleid',
      message: 'What is the employees role id?'
    },
    {
      type: 'input',
      name: 'mgrid',
      message: 'What is the employees manager id?'
    }

  ]) .then(function(answers) {
console.log(answers);
  connection.query("INSERT INTO employee SET ?", {
    first_name: answers.firstname,
    last_name: answers.lastname,
    role_id: answers.roleid, 
    mgr_id: answers.mgrid
  }, 
  function(err) {
    if (err) throw err;
    console.log("Employee was added!", );

    connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
      if (err) throw err;
      console.log("All of the employees are: ", res);
      moreEmp();
    });
     
});
  })
}

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the id?'
    },
    {
      type: 'input',
      name: 'title',
      message: 'What is the employees role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the employees salary?'
    },
    {
      type: 'input',
      name: 'dept_id',
      message: 'What is the employees department id?'
    }

  ]) .then(function(answers) {
console.log(answers);
  connection.query("INSERT INTO empRole SET ?", {
    id: answers.id,
    title: answers.title,
    salary: answers.salary, 
    dept_id: answers.dept_id
  }, 
  function(err) {
    if (err) throw err;
    console.log("Role was added!");

    connection.query("SELECT id, title, salary, dept_id FROM empRole", (err, res) => {
      if (err) throw err;
      console.log("All of the roles are: ", res);
      askNext();
    }); 
});
  })
}

const addDept = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the id?'
    },
    {
      type: 'input',
      name: 'deptName',
      message: 'What is the department name?'
    }

  ]) .then(function(answers) {
console.log(answers);
  connection.query("INSERT INTO department SET ?", {
    id: answers.id,
    deptName: answers.deptName
  }, 
  function(err) {
    if (err) throw err;
    console.log("Department was added!");

    connection.query("SELECT id, deptName FROM department", (err, res) => {
      if (err) throw err;
      console.log("All of the departments are: ", res);
      askNext();
    }); 
});
  })
}


// Add another employee
const moreEmp = () => {
  inquirer.prompt([
   
    {
      type: 'list',
      name: 'moreEmployees',
      message: 'Do you want to add another employee',
      choices: ["yes", "no"]
    }
      ])
    .then(answers => {
      if(answers.moreEmployees === "yes") {
      addEmp()
    } else {
      askNext()
    }

  })
 };
