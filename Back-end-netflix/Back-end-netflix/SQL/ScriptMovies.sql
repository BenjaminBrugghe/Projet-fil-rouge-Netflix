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
(N'The Dark Knight', N'Dans ce nouveau volet, Batman augmente les mises dans sa guerre contre le crime.', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'videos/TDK.mp4'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl'),
(N'Titre', N'Description', N'Directeur', N'Categorie', N'images/lcdp.jpg', N'VideoUrl')