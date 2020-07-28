create database todoDB;

use todoDB;

CREATE TABLE users (
  id INT NOT NULL auto_increment,
  agent_id VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  constraint PK_ID primary key(id),
  constraint UNI_KEY unique key(agent_id)
);

CREATE TABLE todoList (
  id INT NOT NULL auto_increment,
  title VARCHAR(30) NOT NULL,
  description TEXT,
  agent_id VARCHAR(16) NOT NULL,
  due_date timestamp NOT NULL DEFAULT current_timestamp,
  constraint PK_NOTES primary key(id),
  CONSTRAINT FK_NOTES_USER FOREIGN KEY(agent_id) REFERENCES users(agent_id)
);

CREATE TABLE todoListUser (
  id INT NOT NULL auto_increment,
  title VARCHAR(30) NOT NULL,
  description TEXT,
  category varchar(30) NOT NULL,
  agent_id VARCHAR(16) NOT NULL,
  due_date date NOT NULL,
  constraint PK_NOTES_USER primary key(id),
  CONSTRAINT FK_NOTES_USERS FOREIGN KEY(agent_id) REFERENCES users(agent_id)
);
ALTER table todoList
modify column due_date date NOT NULL;

select * from users;
select * from todoListUser;
SELECT * FROM todoListUser where agent_id = 'romitv7' order by due_date DESC,id ASC