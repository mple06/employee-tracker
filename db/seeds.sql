INSERT INTO department (name)
VALUES ("Men Shoes"),
       ("Men Outerwear"),
       ("Men Tops"),
       ("Men Bottoms"),
       ("Men Underwear");


INSERT INTO role (title, salary, department_id)
VALUES ("Buyer", "100000", "1"),
       ("Assistant Buyer", "80000", "2"),
       ("Buy Planner", "100000", "3"),
       ("Assistant Buy Planner", "70000", "4"),
       ("Merchandise Analyst", "60000", "5");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Green", "1", "1"),
       ("Monica", "Geller", "2", "2"),
       ("Phoebe", "Buffay", "3", "3"),
       ("Ross", "Geller", "4", "4");