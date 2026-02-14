# StorageApp

Application de stockage de fichiers avec :
- un front-end React/Vite (`front-end`)
- un back-end Node.js/Express (`back-end`)

## Prerequis

- Node.js 20+ recommande
- npm (installe avec Node.js)

## Installation depuis GitHub

```bash
git clone https://github.com/thibault-de-boutray/StorageApp.git
cd StorageApp
```

Installe les dependances des 2 parties :

```bash
cd back-end
npm install
cd ..\front-end
npm install
```

## Lancer l'application en local

Ouvre 2 terminaux a la racine du projet.

### Terminal 1 - Back-end (port 8787)

```bash
cd back-end
node app.js
```

Le serveur API demarre sur `http://localhost:8787`.

> Option developpement avec reload auto :
>
> ```bash
> cd back-end
> npm install -D nodemon
> npm run dev
> ```

### Terminal 2 - Front-end (port 5173)

```bash
cd front-end
npm run dev
```

Ouvre ensuite `http://localhost:5173`.

Le front-end est deja configure pour proxy les requetes `/api` vers le back-end (`http://localhost:8787`).

## Build production (front-end)

```bash
cd front-end
npm run build
npm run preview
```

## Scripts utiles

### Front-end (`front-end/package.json`)

- `npm run dev` : serveur de dev Vite
- `npm run build` : build production
- `npm run preview` : previsualiser le build
- `npm run lint` : lint

### Back-end (`back-end/package.json`)

- `node app.js` : demarrer le serveur
- `npm run dev` : demarrage avec nodemon (si installe)

## Tech Stack

- Front-end : React, Vite, Tailwind CSS
- Back-end : Node.js, Express, Multer

## License

Projet sans licence definie pour le moment.