# BUỔI 2
CREATE DATABASE node44;
use node44;

CREATE TABLE users(
	user_id INT,
	full_name VARCHAR(50),
	email VARCHAR(50),
	pass_word VARCHAR(255)
)

INSERT INTO users (user_id, full_name, email, pass_word, age) VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123', 28),
(2, 'Jane Smith', 'janesmith@example.com', 'password123', 34),
(3, 'Michael Johnson', 'michaelj@example.com', 'password123', 40),
(4, 'Emily Davis', 'emilyd@example.com', 'password123', 25),
(5, 'Chris Brown', 'chrisb@example.com', 'password123', 31),
(6, 'Sarah Wilson', 'sarahw@example.com', 'password123', 27),
(7, 'David Miller', 'davidm@example.com', 'password123', 45),
(8, 'Jessica Taylor', 'jessicat@example.com', 'password123', 22),
(9, 'Daniel Anderson', 'daniela@example.com', 'password123', 33),
(10, 'Laura Thomas', 'laurat@example.com', 'password123', 29),
(11, 'Paul Moore', 'paulm@example.com', 'password123', 36),
(12, 'Anna Jackson', 'annaj@example.com', 'password123', 24),
(13, 'Mark Lee', 'markl@example.com', 'password123', 38),
(14, 'Sophia Harris', 'sophiah@example.com', 'password123', 26),
(15, 'Peter Clark', 'peterc@example.com', 'password123', 32),
(16, 'Olivia Lewis', 'olivial@example.com', 'password123', 30),
(17, 'James Walker', 'jamesw@example.com', 'password123', 42),
(18, 'Linda Young', 'linday@example.com', 'password123', 37),
(19, 'Robert Hall', 'roberth@example.com', 'password123', 50),
(20, 'Susan Allen', 'susana@example.com', 'password123', 28);

# Query
SELECT * FROM users
SELECT full_name FROM users
SELECT full_name as 'Họ tên' FROM users

SELECT * FROM users
WHERE age <= 30 AND age >= 25

SELECT * FROM users
WHERE age BETWEEN 25 and 30

SELECT * FROM users
WHERE (full_name LIKE '%John%') and (age BETWEEN 25 and 30)

SELECT * FROM users
ORDER BY age DESC
LIMIT 5

SELECT * FROM users
ORDER BY age ASC

# Add, Update, Delete
# ADD
# thêm column age
ALTER TABLE users
ADD COLUMN age INT

# đổi kiểu dữ liệu cho column full_name
ALTER TABLE users
MODIFY COLUMN full_name VARCHAR(255)

# thêm constraint (ràng buộc) cho column
ALTER TABLE users
MODIFY COLUMN full_name VARCHAR(255) NOT NULL,
MODIFY COLUMN email VARCHAR(255) NOT NULL,
MODIFY COLUMN pass_word VARCHAR(255) NOT NULL

# thêm khoá chính (primay key) cho column user_id
ALTER TABLE users
MODIFY COLUMN user_id INT PRIMARY KEY AUTO_INCREMENT

# UPDATE
UPDATE users
SET full_name = 'John Doe'
WHERE user_id = 1

SELECT * FROM users
WHERE user_id = 1

# DELETE
# hard delete
DELETE FROM users
WHERE user_id = 2

# soft delete
ALTER TABLE users
ADD COLUMN is_deleted INT NOT NULL DEFAULT 1

# 1 số câu query nâng cao
# tìm người có tuổi lớn nhất
# c1:
SELECT * FROM users
WHERE age = (
	SELECT age FROM users
	ORDER BY age DESC
	LIMIT 1
)

# c2:
SELECT * FROM users
WHERE age = (
	SELECT MAX(age) FROM users
)


# ------------------------------------------------------------------------------------------
# BUỔI 3
# - relationship giữa các table
#    - các table phải có các mối quan hệ với nhau, nó không được đứng một mình
#    - có 3 loại quan hệ
#        - 1-1
#        - 1-n
#        - n-n: kết hợp của 2 mqh 1-n

#để 2 table có quan hệ với nhau => khoá ngoại

# ví dụ inner join
-- Create the table
CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    video_name VARCHAR(50),
    descriptions VARCHAR(255)
);

-- Insert 20 sample rows into the table
INSERT INTO videos (video_name, descriptions) VALUES
('Introduction to C#', 'A beginner-level introduction to C# programming'),
('What is the params keyword?', 'Explanation and use cases of the params keyword in C#'),
('Understanding Arrays in C#', 'An in-depth look at arrays and how to use them in C#'),
('Classes and Objects', 'Exploring object-oriented programming in C# with practical examples'),
('Methods in C#', 'Introduction to methods, parameters, and return types in C#'),
('Inheritance in C#', 'Understanding inheritance and its use in OOP in C#'),
('Polymorphism in C#', 'Learn how polymorphism works in C# with practical examples'),
('Exception Handling in C#', 'How to handle errors using try, catch, and finally blocks'),
('File Handling in C#', 'Working with files in C# for reading and writing data'),
('Asynchronous Programming in C#', 'An introduction to async and await for asynchronous code'),
('Introduction to LINQ', 'Exploring LINQ and its powerful features for querying collections'),
('Delegates and Events', 'Understanding how to work with delegates and events in C#'),
('Lambda Expressions', 'Introduction to lambda expressions and their usage in C#'),
('What if: Variables Change Types?', 'A fun exploration of dynamic variables and type changes in C#'),
('Switch Case Feature in C#', 'Understanding the switch statement in C# and its practical uses'),
('Working with Databases in C#', 'How to connect and interact with databases using C#'),
('Entity Framework Basics', 'Learn how to use Entity Framework for database management in C#'),
('Debugging C# Code', 'Tips and techniques for debugging your C# code effectively'),
('Creating a Simple Web API', 'How to build a simple Web API using C# and ASP.NET Core'),
('Game Development in C#', 'Introduction to basic game development concepts in C#');

SELECT * FROM videos

# tạo table trung gian user_like
create table user_like(
	id INT PRIMARY KEY AUTO_INCREMENT,
	
	user_id INT,
	FOREIGN KEY(user_id) REFERENCES users(user_id),
	
	video_id INT,
	FOREIGN KEY(video_id) REFERENCES videos(video_id)
)

select * from users

# lưu ý: user_id và video_id phải có trong table users và videos
INSERT INTO user_like (user_id, video_id) VALUES
(1, 1),
(3, 3),
(1, 4),
(3, 6),
(1, 7),
(3, 9),
(1, 10),
(3, 12),
(1, 13),
(3, 15),
(1, 16),
(3, 18),
(1, 19);

# inner join: lấy những data có quan hệ với nhau
# SELECT * FROM users as u
SELECT u.full_name, u.user_id, u.email, v.video_name FROM users as u
INNER JOIN user_like as ul on u.user_id = ul.user_id
INNER JOIN videos as v ON v.video_id = ul.video_id

# left join: tất cả các record của table bên trái và phần giao nhau của table trái và table phải
SELECT u.full_name, u.user_id, ul.user_id FROM users as u
LEFT JOIN user_like as ul on u.user_id = ul.user_id

# right join: ngược lại với left join
# tất cả các record của table bên phải và phần giao nhau của table trái và table phải
SELECT u.full_name, u.user_id, ul.user_id FROM users as u
RIGHT JOIN user_like as ul on u.user_id = ul.user_id

# FULL JOIN (full outer join): lấy tất cả các record của table trái và table phải
# MYSQL, mariadb không hỗ trợ full join
# postgres, sql server, oracle, IBM DB có hỗ trợ full join

# nếu muốn thì sử dụng LEFT JOIN, RIGHT JOIN, UNION
SELECT u.full_name, u.user_id, ul.user_id FROM users as u
LEFT JOIN user_like as ul on u.user_id = ul.user_id
UNION
SELECT u.full_name, u.user_id, ul.user_id FROM users as u
RIGHT JOIN user_like as ul on u.user_id = ul.user_id



# SELF JOIN
CREATE TABLE employees(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(50),
	line_manager_id INT
)

-- Insert 20 sample rows into the employees table
INSERT INTO employees (user_name, line_manager_id) VALUES
('John Doe', NULL),         -- Top-level manager, no line manager
('Jane Smith', 1),
('Mike Johnson', 1),
('Emily Davis', 1),
('Chris Brown', 2),
('Anna Wilson', 2),
('James Clark', 3),
('Laura Miller', 3),
('Robert Lewis', 4),
('Jennifer Lee', 4),
('David Walker', 5),
('Emma Hall', 5),
('Daniel Young', 6),
('Sophia Harris', 6),
('Matthew King', 7),
('Olivia Wright', 7),
('Joseph Allen', 8),
('Mia Scott', 8),
('William Green', 9),
('Ava Adams', 9);

SELECT e1.user_name, e2.user_name as line_manager_name from employees e1
LEFT JOIN employees e2 ON e1.line_manager_id = e2.user_id