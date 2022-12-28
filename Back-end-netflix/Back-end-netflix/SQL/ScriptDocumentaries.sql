DROP TABLE DOCUMENTARIES;

CREATE TABLE DOCUMENTARIES
(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	TITLE VARCHAR(50) NOT NULL,
	DESCRIPTION VARCHAR(500) NOT NULL,
	DIRECTOR VARCHAR(50) NOT NULL,
	CATEGORY VARCHAR(50) NOT NULL,
	IMAGEURL VARCHAR(200) NOT NULL,
	VIDEOURL VARCHAR(200) NOT NULL,
)

INSERT INTO [dbo].[DOCUMENTARIES] ([TITLE], [DESCRIPTION], [DIRECTOR], [CATEGORY], [IMAGEURL], [VIDEOURL])
VALUES
(N'Barons de la drogue', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'James Cameron', N'Action', N'images/img_document/barons-de-la-drogue.jpg', N'videos/TDK.mp4'),
(N'Dans le cerveau de Bill Gates', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Tim Burton', N'Action', N'images/img_document/danslecerveau.jpg', N'videos/videoTest.mp4'),
(N'Expedition happiness', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Steven Spielberg', N'Suspens', N'images/img_document/expidition.jpg', N'videos/TDK.mp4'),
(N'Derrière nos écrans de fumée', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'James Cameron', N'Suspens', N'images/img_document/fumeee.jpg', N'videos/videoTest.mp4'),
(N'High Score', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Tim Burton', N'Horreur', N'images/img_document/high_score_l_age_d_or_du_gaming.jpg', N'videos/TDK.mp4'),
(N'Gaga: Five foot two', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'James Cameron', N'Horreur', N'images/img_document/ladyG.jpg', N'videos/videoTest.mp4'),
(N'Mercury 13', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Tim Burton', N'Action', N'images/img_document/mercury.jpg', N'videos/TDK.mp4'),
(N'The Toys that made us', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Tim Burton', N'Suspens', N'images/img_document/Thetoys.jpg', N'videos/videoTest.mp4'),
(N'Tony Robbins', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Steven Spielberg', N'Horreur', N'images/img_document/Tonyrobb.jpg', N'videos/videoTest.mp4'),
(N'Who killed Malcolm X ?', N'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel corporis, excepturi facere deserunt reprehenderit', N'Steven Spielberg', N'Horreur', N'images/img_document/whokilled.jpg', N'videos/TDK.mp4')
