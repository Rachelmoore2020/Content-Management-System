const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");
const fs = require('fs');


console.log(figlet.textSync('Employee Tracker', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true
}));


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employeesInfo_DB",
});
connection.connect((err) => {
  if (err) throw err;
  start();
});

// -----------------Beginning Prompt-------------------
const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add A Department",
        "Add A Role",
        "Update Employee Role",
        "Delete an Employee",
        "Delete a Department",
        "Delete a Role",
        "exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmp();
          break;
        case "View All Roles":
          viewRole();
          break;
        case "View All Departments":
          viewDept();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Add A Department":
          addDept();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;
        case "Delete an Employee":
          delEmp();
          break;
        case "Delete a Department":
          delDept();
          break;
        case "Delete a Role":
          delRole();
          break;
        case "exit":
          console.log("Thank you for using Employee Tracker!")
          figlet("Employee Tracker", (err, result) => {
            console.log(err || result);
            return new Promise((resolve, reject) => {
              setTimeout(function () {
                resolve();
              }, 300);
            });
          });
          connection.end();
          break;
          
      }
    });
};

// --------------------Next Prompt-----------------------
const askNext = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do next?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add A Department",
        "Add A Role",
        "Update Employee Role",
        "Delete an Employee",
        "Delete a Department",
        "Delete a Role",
        "exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmp();
          break;
        case "View All Roles":
          viewRole();
          break;
        case "View All Departments":
          viewDept();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Add A Department":
          addDept();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;
        case "Delete an Employee":
          delEmp();
          break;
        case "Delete a Department":
          delDept();
          break;
        case "Delete a Role":
          delRole();
          break;
        case "exit":
          console.log("Thank you for using Employee Tracker!")
          figlet("Employee Tracker", (err, result) => {
            console.log(err || result);
            return new Promise((resolve, reject) => {
              setTimeout(function () {
                resolve();
              }, 300);
            });
          });
          connection.end();
          break;
          
      }
    });
};

// View employees, roles and depts
// -----------------------------------------------// and

const viewAllEmp = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table("All of the employees are: ", res);
    askNext();
  });
};
const viewRole = () => {
  connection.query("SELECT title FROM empRole", (err, res) => {
    if (err) throw err;
    console.table("All of the roles are: ", res);
    askNext();
  });
};
const viewDept = () => {
  connection.query("SELECT deptName FROM department", (err, res) => {
    if (err) throw err;
    console.table("All of the departments are: ", res);
    askNext();
  });
};

// Add employees, roles and depts
// -----------------------------------------------//
const addEmp = () => {
  //read the employees first
  connection.query("SELECT * FROM empRole", async (err, res) => {
      if (err) throw err;

      const answers = await inquirer.prompt([
          {
              type: "input",
              name: "first",
              message: "What is the Employee's first name?"
          },
          {
              type: "input",
              name: "last",
              message: "What is the Employee's last name?"
          },
          {
              type: "list",
              name: "role",
              message: "What is the Employee's role?",
              choices: () => {
                  let choiceArray = [];
                  for (let i = 0; i < res.length; i++) {
                      choiceArray.push(res[i].id);
                  }
                  return choiceArray;
              }
          },
          {
              type: "list",
              name: "manager",
              message: "What is the manager's ID?",
              choices: [
                  0, 1, 2, 3, 4, 5
              ]
          }
      ]);
      connection.query("INSERT INTO employee SET ?", {
          first_name: answers.first,
          last_name: answers.last,
          role_id: answers.role,
          mgr_id: answers.manager
      }, (err) => {
          if (err) throw err;
          console.log("Employee was added!");
          moreEmp();
      });
  })
};
const addRole = () => {
  
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "input",
        name: "dept_id",
        message: "What is the department id?",
      },
    ])
    .then(function (answers) {
      connection.query("SELECT id FROM empRole",
      (err, res) => {
        if (err) throw err;
        let numOfIds = res.length + 1
        
        connection.query(
        "INSERT INTO empRole SET ?",
        {
          id: numOfIds,
          title: answers.title,
          salary: answers.salary,
          dept_id: answers.dept_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Role was added!");

          connection.query(
            "SELECT id, title, salary, dept_id FROM empRole",
            (err, res) => {
              if (err) throw err;
              console.table("All of the roles are: ", res);
              moreRole();
            }
          );
        }
      );
    });
  })

};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the new department name?",
      },
    ]).then(answers => {
      // Here you can process your user answer(s)
      connection.query("SELECT id FROM department",
      (err, res) => {
        if (err) throw err;
        let numOfIds = res.length + 1
          
        connection.query(
        "INSERT INTO department SET ?",
        {
          id: numOfIds,
          deptName: answers.deptName,
        },
        function (err) {
          if (err) throw err;
          console.log("New department was added!");

          connection.query(
            "SELECT id, deptName FROM department",
            (err, res) => {
              if (err) throw err;
              console.table("All of the departments are: ", res);
              moreDept();
            }
          );
        }
      );
    });
    
  })


}


// Add another employee
const moreEmp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "moreEmployees",
        message: "Do you want to add another employee",
        choices: ["yes", "no"],
      },
    ])
    .then((answers) => {
      if (answers.moreEmployees === "yes") {
        addEmp();
      } else {
        askNext();
      }
    });
};
// Add another role
const moreRole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "moreRole",
        message: "Do you want to add another role",
        choices: ["yes", "no"],
      },
    ])
    .then((answers) => {
      if (answers.moreRole === "yes") {
        addRole();
      } else {
        askNext();
      }
    });
};
// Add another department
const moreDept = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "moreRole",
        message: "Do you want to add another department?",
        choices: ["yes", "no"],
      },
    ])
    .then((answers) => {
      if (answers.moreRole === "yes") {
        addDept();
      } else {
        askNext();
      }
    });
};

//  ------------Update Employee Role----------------
const updateEmpRole = () => {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.table(results);

    // once you have the roles, prompt the user for which they'd like to update
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message:
            "Enter the id of the employee who's role you would like to update",
        },
      ])
      .then((answer) => {
        // get the chosen person
        var chosenPerson = answer.name;
        console.log(chosenPerson);

        connection.query("SELECT * FROM empRole", async (err, res) => {
          if (err) throw err;
        // get the new role number
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the Employee's new role id?",
              choices: () => {
                  let choiceArray = [];
                  for (let i = 0; i < res.length; i++) {
                      choiceArray.push(res[i].id);
                  }
                  return choiceArray;
              }
          },
          ])

          .then((answer) => {
            let roleNum = answer.role;
            console.log(roleNum);
            connection.query('UPDATE employee SET ? WHERE ?',
            [
              {
                role_id: roleNum
              },
              {
                id: chosenPerson
              }
            ])
            console.log("Employee role was updated!")
              connection.query("SELECT * FROM employee", (err, res) => {
                if (err) throw err;
                console.table("All of the employees are: ", res);
                askNext();
              });
      });
  });
})
}
)}

//  ----------- Delete -------------  //

const delEmp = () => {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message:
            "Enter the id of the employee who's role you would like to delete",
        },
      ])
      .then((answer) => {
        // get the chosen person
        var chosenPerson = answer.name;
        console.log(chosenPerson);
        connection.query('DELETE FROM employee WHERE ?',
            [
              {
                id: chosenPerson
              }
            ])
            
            console.log("Employee was deleted!")
            connection.query("ALTER TABLE employee DROP id", (err, res) => {
              if (err) throw err;
            });
            connection.query("ALTER TABLE employee AUTO_INCREMENT = 1", (err, res) => {
              if (err) throw err;
            });
            connection.query("ALTER TABLE employee ADD id int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST", (err, res) => {
              if (err) throw err;
            });
              connection.query("SELECT * FROM employee", (err, res) => {
                if (err) throw err;
                console.table("All of the employees are: ", res);
                askNext();
              });
      });
    }
  )}
const delRole = () => {
    connection.query("SELECT * FROM empRole", (err, results) => {
      if (err) throw err;
      console.table(results);
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message:
              "Enter the id of the role you would like to delete",
          },
        ])
        .then((answer) => {
          // get the chosen person
          var chosenPerson = answer.name;
          console.log(chosenPerson);
          connection.query('DELETE FROM empRole WHERE ?',
              [
                {
                  id: chosenPerson
                }
              ])
              
              console.log("Role was deleted!")
             
                connection.query("SELECT * FROM empRole", (err, res) => {
                  if (err) throw err;
                  console.table("All of the roles are: ", res);
                  askNext();
                });
        });
      }
  )}
const delDept = () => {
      connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        console.table(results);
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message:
                "Enter the id of the department you would like to delete",
            },
          ])
          .then((answer) => {
            // get the chosen person
            var chosenPerson = answer.name;
            console.log(chosenPerson);
            connection.query('DELETE FROM department WHERE ?',
                [
                  {
                    id: chosenPerson
                  }
                ])
                
                console.log("department was deleted!")
               
                  connection.query("SELECT * FROM department", (err, res) => {
                    if (err) throw err;
                    console.table("All of the departments are: ", res);
                    askNext();
                  });
          });
        }
  )}
      