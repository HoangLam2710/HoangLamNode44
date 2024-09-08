CREATE DATABASE node44_user;
use node44_user;

CREATE TABLE video(
	video_id INT PRIMARY KEY AUTO_INCREMENT,
	video_name VARCHAR(255),
	description VARCHAR(255)
)

INSERT INTO video (video_name, description) VALUES
('Video 1', 'This is a description for Video 1'),
('Video 2', 'This is a description for Video 2'),
('Video 3', 'This is a description for Video 3'),
('Video 4', 'This is a description for Video 4'),
('Video 5', 'This is a description for Video 5'),
('Video 6', 'This is a description for Video 6'),
('Video 7', 'This is a description for Video 7'),
('Video 8', 'This is a description for Video 8'),
('Video 9', 'This is a description for Video 9'),
('Video 10', 'This is a description for Video 10'),
('Video 11', 'This is a description for Video 11'),
('Video 12', 'This is a description for Video 12'),
('Video 13', 'This is a description for Video 13'),
('Video 14', 'This is a description for Video 14'),
('Video 15', 'This is a description for Video 15'),
('Video 16', 'This is a description for Video 16'),
('Video 17', 'This is a description for Video 17'),
('Video 18', 'This is a description for Video 18'),
('Video 19', 'This is a description for Video 19'),
('Video 20', 'This is a description for Video 20');

-- tạo USER
CREATE USER 'lam'@'%' IDENTITIED BY 'password';

-- cấp quyền
GRANT SELECT ON node44.* TO 'lam'@'%';
-- COMMIT
flush PRIVILEGES;

GRANT INSERT ON node44.* TO 'lam'@'%';
flush PRIVILEGES;

-- remove quyền insert
REVOKE INSERT ON node44.* FROM 'lam'@'%';
flush PRIVILEGES;


-- kiểm tra user có những quyền nào
SHOW GRANTS FOR 'lam'@'%';

-- xoá USER
DROP USER 'lam'@'%';
flush PRIVILEGES;

-- kill session cho user đó
-- show những session
SHOW PROCESSLIST;
-- kill + id of user
KILL 51

-- cấp quyền cho user
-- ALL PRIVILEGES: Cấp tất cả các quyền.
-- SELECT: Quyền xem dữ liệu (truy vấn bảng).
-- INSERT: Quyền thêm dữ liệu mới vào bảng.
-- UPDATE: Quyền cập nhật dữ liệu hiện có.
-- DELETE: Quyền xóa dữ liệu trong bảng.
-- CREATE: Quyền tạo bảng hoặc cơ sở dữ liệu mới.
-- ALTER: Quyền sửa đổi cấu trúc bảng (ví dụ: thêm/sửa/xóa cột).
-- DROP: Quyền xóa bảng hoặc cơ sở dữ liệu.
-- INDEX: Quyền tạo và xóa chỉ mục (index).
-- GRANT OPTION: Quyền cấp quyền cho người khác.
-- RELOAD: Quyền tải lại các bảng quyền và bộ nhớ đệm (flush privileges).
-- SHUTDOWN: Quyền tắt máy chủ MySQL.



# --------------------------------------------------------------------------------------------------
# PROCEDURE

# VÍ DỤ
DELIMITER //
CREATE PROCEDURE select_video()
BEGIN
	SELECT * from node44_user.video;
END //
DELIMITER

CALL select_video()


# DEMO
create table users(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(50),
	email VARCHAR(255),
	age INT,
	gender INT
);

INSERT INTO users (full_name, email, age, gender) VALUES
('Raven Matthews', 'sarahprince@meyer.net', 49, 1),
('William Pennington', 'john08@reeves-morrison.com', 22, 0),
('Laura Mooney', 'craigeverett@gmail.com', 48, 0),
('Katherine Smith', 'ccollins@gmail.com', 46, 0),
('Marcus Davis', 'andrew86@jackson.com', 21, 0),
('Danielle Phillips', 'brian51@green.com', 53, 0),
('Crystal Maldonado', 'melanie77@yahoo.com', 35, 1),
('Kristin Wilson', 'jsmith@lee.com', 26, 0),
('Angela Brown', 'sbryant@hotmail.com', 44, 0),
('Sean Fisher', 'christina66@yahoo.com', 38, 0),
('Tracy Rivera', 'joneswendy@johnson.com', 56, 1),
('Deborah Thompson', 'andreasmall@yahoo.com', 50, 1),
('Shannon Williams', 'wparker@yahoo.com', 32, 1),
('Justin Mcclain', 'heidiwashington@perez.com', 60, 1),
('Erika Jimenez', 'sanchezrachel@hotmail.com', 27, 0),
('Denise Pierce', 'kmcconnell@gmail.com', 45, 1),
('Veronica Simmons', 'murphychristina@vaughn.com', 53, 1),
('Shawn Tyler', 'christine91@west.com', 34, 1),
('Ryan Martinez', 'davidyoung@robinson.com', 23, 0),
('Jessica Nelson', 'kelly26@yahoo.com', 31, 1);

CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    video_name VARCHAR(50),
    descriptions VARCHAR(255)
);

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

create table user_like(
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY(user_id) REFERENCES users(user_id),
	video_id INT,
	FOREIGN KEY(video_id) REFERENCES videos(video_id)
);

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


DELIMITER //
CREATE PROCEDURE select_users()
BEGIN
	SELECT * from node44_user.users;
END //
DELIMITER
CALL select_users();


DELIMITER //
CREATE PROCEDURE remove_user(IN id INT, OUT message VARCHAR(255))
BEGIN
	IF id <> 1 then
		DELETE FROM user_like WHERE user_id = id;
		DELETE FROM users WHERE user_id = id;
	ELSE
		SET message = 'user id 1 da xoa';
	END IF;
END //
DELIMITER
CALL remove_user(1, @message);
SELECT @message;
-- DROP PROCEDURE remove_user;

