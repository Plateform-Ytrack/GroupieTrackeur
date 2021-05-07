# Projet_Groupie_Tracker

### Groupe : [Nathan SCHNEIDER](https://github.com/NatSch45) / [Florian DAGNAS](https://github.com/Flodagnas) / [Malo LOYER VIAUD](https://github.com/Amol44) / [Louis BROCHARD](https://github.com/LBROCHARD)

- ## **Le projet en quelques phrases :**

Il faut construire une page web afin d’organiser tous les concerts de plusierus groupes. Cette information peut être trouvée sur un site web.  
Pour extraire les informations de l’API, nous utilisons le language Go puis nous créons un pont vers le JS pour manipuler les données.
L’extraction des données depuis un serveur distant prend du temps, et loadData est exécuté lorsque le navigateur reçoit les données des héros, et le serveur peut prendre un certain temps.  
Les informations doivent être affichées sur plusieurs pages.  
Il doit être possible de voir des informations sur certains groupes et artistes comme leur(s) nom(s), image, en quelle année ils ont commencé leur activité, la date de leur premier album et les membres.
Il doit être aussi possible de voir leurs derniers lieux et dates de concerts et / ou à venir.
Les API artists et relation devront être utilisé.



Les langages utilisé son :

<span>
  <img src="https://undo.io/media/uploads/files/Golang.png" width="100" height="100" name="Golang">
  <img src="https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png" width="100" height="100" name="Java Script">
  <img src="https://cdn2.iconfinder.com/data/icons/social-icon-3/512/social_style_3_html5-512.png" width="100" height="100" name="HTML5">
  <img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_960_720.png" width="100" height="100" name="CSS3">
</span>

- ## **Comment utiliser le site :**

Pour lancez le projet, il vous faut taper "go run server.go" dans le terminal de votre VSCode
Notre site internet permet de voir des groupes de musique selon une base de données complète. Cette base de données est organisée par ordre alphabétique selon le nom des différents groupe. Notre site permet également de trouver différentes informations sur les groupes en questions présent sur notre site. Lorsque vous passez votre curseur sur un groupe, vous trouverez ces informations le concernant :  leur(s) nom(s), une image du groupe, en quelle année ils ont commencé leur activité, la date de leur premier album et les membres.  
Le site contient également une barre de recherche qui permet de trouver plus facilement un groupe en particulier et les caractéristiques le concernant.
Ainsi, grâce à ce site vous pouvez trouver des renseignements sur n’importe quel groupe et trouver des informations sur eux rapidement et facilement.

- ## **Comment le code est t-il organisé :**
- ### **Côté home :**

```
    Dossier scirpt --> home.js / navbar.js
    Dossier static --> home.css / navbar.css
    Dossier templates --> home.html
```
- ### **Côté artists :**

```
    Dossier scirpt --> display.js / navbar.js / search.js
    Dossier static --> artists.css / navbar.css / cards.css
    Dossier templates --> artists.html
```
- ### **Côté dates :**

```
    Dossier scirpt -->
    Dossier static --> navbar.css
    Dossier templates --> dates.html
```
- ### **Côté locations :**

```
    Dossier scirpt --> display.js / navbar.js / map.js / geocoding.js
    Dossier static --> locations.css / navbar.css
    Dossier templates --> locations.html
```

- ## **L'organisation du groupe :**

```
    Nathan SCHNEIDER
    - Pagination
    - Back-end
    - Assemblage du code
    - Script JS
    - Search-Bar
    - Template(HTML)
    - CSS
    - Géolocalisation (API Map)
    - Power Point
```

```
    Florian DAGNAS
    - Script JS
    - Template(HTML)
    - CSS
    - Assemblage du code
    - Back-end
    - Géolocalisation (API Map)
    - Readme
    - Power Point
```

```
    Malo LOYER VIAUD
    - Script JS
    - Template(HTML)
    - CSS
    - Assemblage du code
    - Back-end
    - Power Point
    - Search-Bar
    - Input calendrier pour les dates
```

```
    Louis BROCHARD
    - Script JS
    - Template(HTML)
    - CSS
    - Assemblage du code
    - Back-end
    - Trie du Back-end
    - Search-Bar
    - Power Point
```
