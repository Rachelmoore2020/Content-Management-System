DROP DATABASE IF EXISTS employeesInfo_DB;
CREATE database employeesInfo_DB;

USE employeesInfo_DB;

CREATE TABLE department (
  id INT NOT NULL,
  deptName VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE empRole (
  id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10) NULL,
  dept_id INTEGER(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER(10) NOT NULL,
  mgr_id INTEGER(10) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employeesInfo_DB.empRole;
SELECT * FROM employeesInfo_DB.employee;
SELECT * FROM employeesInfo_DB.department;


INSERT INTO department (id, deptName)
VALUES (1, 'sales');

INSERT INTO empRole (id, title, salary, dept_id)
VALUES (1, 'salesperson', 67000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, mgr_id)
VALUES (1, "Ralph", "Lauren", 3, 4);