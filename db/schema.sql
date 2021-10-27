DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;
 
DROP DATABASE IF EXISTS department;
CREATE TABLE department (
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30)
);

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL NOT NULL,
    department_id INT,
        FOREIGN KEY (department_id) REFERENCES department(dept_id) ON DELETE CASCADE
);

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
    manager_id INT DEFAULT NULL,
        FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
);




