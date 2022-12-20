DROP TABLE USERS;

CREATE TABLE USERS
(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	LASTNAME VARCHAR(50) NOT NULL,
	FIRSTNAME VARCHAR(50) NOT NULL,
	EMAIL VARCHAR(50) NOT NULL,
	PASSWORD VARCHAR(50) NOT NULL,
	ADMIN INT NOT NULL,
	BANNED INT NOT NULL,
	TOKEN VARCHAR(250) NOT NULL,
)

INSERT INTO [dbo].[USERS] ([LASTNAME], [FIRSTNAME], [EMAIL], [PASSWORD], [ADMIN], [BANNED], [TOKEN])
VALUES
(N'Admin', N'admin', N'admin', N'admin', N'1', N'0', N''),
(N'User', N'user', N'user', N'user', N'0', N'0', N''),
(N'Sparrow', N'Jack', N'user3', N'mdp3', N'0', N'0', N''),
(N'Mister', N'Bean', N'user4', N'mdp4', N'0', N'0', N''),
(N'Dark', N'Jeanne', N'user5', N'mdp5', N'0', N'0', N''),
(N'Banned', N'User', N'banned', N'banned', N'0', N'1', N''),
(N'Poppins', N'Mary', N'user7', N'mdp7', N'0', N'0', N''),
(N'Le Gaulois', N'Asterix', N'user8', N'mdp8', N'0', N'0', N''),
(N'Docteur', N'House', N'user9', N'mdp9', N'0', N'0', N''),
(N'Bazooka', N'Fatal', N'user10', N'mdp10', N'0', N'0', N'')
--(N'', N'', N'', N'', N'', N'', N'')
