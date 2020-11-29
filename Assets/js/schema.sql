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
  salary DECIMAL(10, 4) NULL,
  dept_id INTEGER(10) NOT NULL
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER(10) NOT NULL,
  mgr_id INTEGER(10) NULL
  PRIMARY KEY (id)
);
SELECT * FROM employeesInfo_DB;
