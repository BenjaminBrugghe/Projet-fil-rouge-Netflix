# Clone Netflix

# Description :

### Ceci est le projet fil rouge réalisé lors de ma formation '.Net Fullstack' chez M2i Formation. Il s'agit d'un mini-clone de Netflix qui regroupe les langages et outils suivants :

- Html
- CSS (Sass)
- JavaScript(.jsx)
- ReactJs
- NodeJS

### Le back-end est un serveur Express en Typescript, avec une persistance de données en Json.

#

### Il permet à l'utilisateurs de :

- S'enregistrer sur le site.
- Se connecter pour accéder au contenu (avec authentification par Json web token)
- Consulter des vidéos triées par catégories (films, series, ...) et par genre.
- Lire des vidéos.
- Accéder à son profil afin de modifier ses informations.

### Il permet aussi aux administrateurs de :

- Gérer les vidéos (ajout, modification, suppression).
- Suspendre ou rétablir le compte d'un utilisateur.

#

# Lancer le projet :

## Back-end :

### Depuis le dossier "Express-server" :

- Créer un fichier '.env' et y renseigner les informations nécessaires (voir '.env.example')
- Installer les dépendances :

```
npm install
```

- Démarrer le serveur :

```
npm run start
```

#

## Front-end :

- Depuis le dossier "front-end-netflix"
- Installer les dépendances :

```
npm install
```

- Démarrer le projet

```
npm start
```
