# ♟ Checkmate — Gestion de tournois d'échecs

<p align="center">
  <img src="https://skillicons.dev/icons?i=angular,ts,html,css" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Signals-Zoneless-DD0031?style=flat-square&logo=angular&logoColor=white" />
</p>

<br/>

Application web de gestion de tournois d'échecs développée avec **Angular 21**. Elle permet de créer et gérer des tournois, s'inscrire, suivre les matchs en direct et consulter les classements.

---

## 📸 Aperçu

### Tournois
<table>
  <tr>
    <td align="center"><b>Carrousel en cours</b></td>
    <td align="center"><b>Tournois à venir</b></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/1.png" width="400"/></td>
    <td><img src="./docs/screenshots/2.png" width="400"/></td>
  </tr>
</table>

### Dashboard
<table>
  <tr>
    <td align="center"><b>Tournois en cours</b></td>
    <td align="center"><b>Dernières parties</b></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/3.png" width="400"/></td>
    <td><img src="./docs/screenshots/4.png" width="400"/></td>
  </tr>
</table>

### Tournoi & Profil
<table>
  <tr>
    <td align="center"><b>Joueurs inscrits</b></td>
    <td align="center"><b>Profil</b></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/5.png" width="400"/></td>
    <td><img src="./docs/screenshots/6.png" width="400"/></td>
  </tr>
</table>

### Authentification
<table>
  <tr>
    <td align="center"><b>Connexion</b></td>
    <td align="center"><b>Inscription</b></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/7.png" width="400"/></td>
    <td><img src="./docs/screenshots/8.png" width="400"/></td>
  </tr>
</table>

### Administration
<table>
  <tr>
    <td align="center"><b>Gestion des membres</b></td>
    <td align="center"><b>Création d'un tournoi</b></td>
  </tr>
  <tr>
    <td><img src="./docs/screenshots/9.png" width="400"/></td>
    <td><img src="./docs/screenshots/10.png" width="400"/></td>
  </tr>
</table>

---

## Fonctionnalités

### Joueurs
- Inscription et connexion (authentification JWT)
- Profil personnalisé (username, email, ELO, genre, date de naissance)
- Tableau de bord : tournois en cours, inscriptions, historique des parties
- Inscription / désinscription aux tournois
- Consultation des résultats et classements

### Tournois
- Liste avec trois statuts : **À venir**, **En cours**, **Terminés**
- Carrousel automatique pour les tournois en direct
- Filtres : Tous / Disponibles / Inscrits
- Support des tournois féminins et restriction par plage ELO

### Administration
- Gestion des membres (création, suppression, liste)
- Création et gestion des tournois (démarrage, rondes, suppression)
- Saisie des résultats de matchs (victoire blancs / noirs / nul)
- Accès restreint par rôle Admin

---

## Stack technique

| Technologie | Version |
|---|---|
| Angular | 21 |
| TypeScript | 5.9 |

- Composants **standalone** (sans NgModule)
- **Signals** pour la gestion d'état réactive (app zoneless)
- **Reactive Forms** avec validateurs personnalisés
- Guards de navigation (`isConnected`, `isNotConnected`, `admin`)
- Intercepteurs HTTP (injection du token JWT, gestion des erreurs)
- Routing **lazy-loadé** par feature

---

## Prérequis

- [Node.js](https://nodejs.org/) ≥ 18
- [Angular CLI](https://angular.io/cli) ≥ 17
- API backend disponible sur `http://localhost:8080` — [Checkmate API](https://github.com/Aeyis/Checkmate-api-Labo)

---

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Aeyis/Checkmate-labo-angular.git
cd Checkmate-labo-angular/checkmate-angular

# Installer les dépendances
npm install

# Lancer en développement
ng serve
```

L'application sera disponible sur [http://localhost:4200](http://localhost:4200).

---

## Structure du projet

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # isConnected, isNotConnected, admin
│   │   ├── interceptors/    # Injection JWT, gestion erreurs HTTP
│   │   ├── models/          # Interfaces TypeScript
│   │   ├── pipes/           # TournamentStatus
│   │   ├── services/        # Auth, Tournament, Member, Match
│   │   └── validators/      # StrongPassword
│   ├── features/
│   │   ├── auth/            # Login, Register
│   │   ├── dashboard/       # Tableau de bord utilisateur
│   │   ├── tournament/      # Liste et détail des tournois
│   │   ├── profile/         # Profil et modification
│   │   ├── admin/           # Gestion membres et tournois
│   │   └── errors/          # Pages 403 et 404
│   └── shared/
│       ├── components/      # FormCard, Loading, MessageDisplay...
│       ├── directives/      # SpotlightDirective
│       └── layout/          # NavBar
└── environments/            # Configuration API par environnement
```

---

## Rôles utilisateurs

| Rôle | Accès |
|---|---|
| Visiteur | Liste des tournois (lecture seule) |
| Membre | Inscription aux tournois, profil, dashboard |
| Admin | Gestion complète des tournois et membres |

---

## Auteur

Développé par **Rafael** dans le cadre d'un laboratoire Angular chez [TechniFutur](https://www.technifutur.be/).

[![GitHub](https://img.shields.io/badge/GitHub-Aeyis-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Aeyis)
[![Email](https://img.shields.io/badge/Email-raf045@hotmail.com-0078D4?style=flat-square&logo=microsoftoutlook&logoColor=white)](mailto:raf045@hotmail.com)
