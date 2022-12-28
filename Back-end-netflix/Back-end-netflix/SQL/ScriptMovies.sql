DROP TABLE MOVIES;

CREATE TABLE MOVIES
(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	TITLE VARCHAR(50) NOT NULL,
	DESCRIPTION VARCHAR(500) NOT NULL,
	DIRECTOR VARCHAR(50) NOT NULL,
	CATEGORY VARCHAR(50) NOT NULL,
	IMAGEURL VARCHAR(200) NOT NULL,
	VIDEOURL VARCHAR(200) NOT NULL,
)

INSERT INTO [dbo].[MOVIES] ([TITLE], [DESCRIPTION], [DIRECTOR], [CATEGORY], [IMAGEURL], [VIDEOURL])
VALUES
(N'The Dark Knight', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'James Cameron', N'Action', N'images/img_films/TDK.jpg', N'videos/TDK.mp4'),
(N'Bastille Day', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Tim Burton', N'Action', N'images/img_films/bastilleDay.jpg', N'videos/videoTest.mp4'),
(N'Black and Blue', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Steven Spielberg', N'Suspens', N'images/img_films/Blackandblue.jpg', N'videos/TDK.mp4'),
(N'Blood father', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'James Cameron', N'Suspens', N'images/img_films/bloodfather.jpg', N'videos/videoTest.mp4'),
(N'Bight', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Tim Burton', N'Horreur', N'images/img_films/bright.jpg', N'videos/TDK.mp4'),
(N'Extraction', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'James Cameron', N'Horreur', N'images/img_films/Extraction.jpg', N'videos/videoTest.mp4'),
(N'G.I. Joe', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Tim Burton', N'Action', N'images/img_films/GiJOE.jpg', N'videos/TDK.mp4'),
(N'G.I. Joe Retaliation', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Tim Burton', N'Suspens', N'images/img_films/gijoeRetaliation.jpg', N'videos/videoTest.mp4'),
(N'Jeux d"espion', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'James Cameron', N'Action', N'images/img_films/jeuxdespion.jpg', N'videos/TDK.mp4'),
(N'Sputnik', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Steven Spielberg', N'Horreur', N'images/img_films/Sputnik.jpg', N'videos/videoTest.mp4'),
(N'Takers', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Steven Spielberg', N'Horreur', N'images/img_films/Takers.jpg', N'videos/TDK.mp4')
