# ReactJS Starter Kit

## ReactJS : définition
ReactJS est une bibliothèque JavaScript open-source développée par Facebook permettant de construire des interfaces utilisateur interactives et réactives basées sur des composants réutilisables.

### Histoire
Tout a commencé en 2011, quand Facebook faisait face à des défis majeurs pour gérer la complexité croissante de son interface utilisateur. Jordan Walke, ingénieur chez Facebook, cherchant une meilleure manière de construire des interfaces web dynamiques, développa le premier prototype de ReactJS, initialement baptisé « FaxJS ». Son idée innovante consistait à mélanger le HTML avec JavaScript pour créer une expérience utilisateur fluide et réactive grâce à un concept révolutionnaire : le DOM virtuel.

Après des tests internes concluants chez Facebook, ReactJS fut officiellement open-sourcé en mai 2013. Malgré un accueil initial mitigé en raison de son approche non conventionnelle, ReactJS gagna rapidement en popularité auprès de la communauté JavaScript grâce à sa performance et sa simplicité.

Les versions suivantes ont apporté des améliorations continues : les hooks en 2018 (version 16.8) ont révolutionné la gestion des états et des effets dans les composants fonctionnels. En 2020, la version 17 simplifia les mises à jour progressives des applications existantes. React 18, lancé en 2022, introduisit un nouveau moteur de rendu concurrent (Concurrent Rendering) optimisant la fluidité et l'interactivité des applications complexes.

La dernière mouture, React 19, lancée récemment, continue cette évolution en apportant des performances accrues, une meilleure gestion des événements et une intégration toujours plus fluide avec les outils modernes de développement front-end, assurant ainsi à ReactJS sa place centrale dans l'écosystème JavaScript.

### Comment le rendu fonctionne-t-il ?
React utilise un concept central appelé DOM virtuel pour gérer efficacement les mises à jour d’interfaces utilisateur. Voici une explication détaillée pour comprendre son fonctionnement complet :

#### DOM virtuel
Le DOM (Document Object Model) réel est une représentation en mémoire des éléments HTML d'une page web. Modifier ce DOM est généralement coûteux en performance. React introduit le DOM virtuel, une copie légère du DOM réel qui réside en mémoire et facilite les opérations rapides et peu coûteuses.

#### Processus de rendu et rerender

- **Premier rendu (initial render)** :
    1. React crée un DOM virtuel basé sur les composants et leur état initial.
    2. Ce DOM virtuel est converti en DOM réel et injecté dans la page web.

- **Mise à jour (rerender)** :
    1. Lorsqu’un état ou une prop d’un composant change, React crée un nouveau DOM virtuel.
    2. React compare le nouveau DOM virtuel avec l’ancien DOM virtuel (phase appelée réconciliation).
    3. React identifie les différences entre les deux versions (ce processus est nommé « diffing »).
    4. React met à jour seulement les éléments modifiés dans le DOM réel, minimisant ainsi les opérations coûteuses.

#### Optimiser les performances
Pour maîtriser au mieux les performances de ReactJS, il est important de comprendre certaines subtilités :

- **Keys** : Utiliser des clés (`key`) uniques sur les listes d’éléments permet à React de détecter précisément quels éléments ont changé, optimisant les performances lors des modifications.

- **Memoization** :
    - `React.memo` permet de mémoriser le rendu d’un composant et de l'éviter s'il n’y a aucun changement dans ses props.
    - `useMemo` et `useCallback` mémorisent des valeurs ou des fonctions pour éviter des recalculs inutiles.

- **Hooks et dépendances** : Maîtriser les dépendances des hooks comme `useEffect` et `useMemo` pour ne déclencher des mises à jour que lorsque c’est vraiment nécessaire.

Cette compréhension approfondie permet aux développeurs débutants d'écrire du code performant et de tirer pleinement parti de ReactJS.

### Notre Stack technique
Nous privilégions une stack moderne et robuste basée principalement sur :
- ReactJS avec TypeScript et ViteJS
- tailwindcss et Material-UI pour les styles
- InversyJS pour l'injection de dépendances
- RxJS pour la programmation réactive
- @axa-fr/react-oidc pour l'authentification
- axios-retrofit et Axios pour les appels API
- Jest, React Testing Library et jest-cucumber pour les tests
- Storybook pour documenter et tester visuellement les composants

#### Pourquoi TypeScript ?
TypeScript apporte un typage statique robuste, améliorant la qualité du code, réduisant les erreurs au runtime, et facilitant la maintenance et l’évolutivité du projet.

## Nos pratiques

### TDD (Test Driven Development)
Le Test Driven Development (TDD) est une pratique agile qui consiste à écrire des tests automatisés avant même d'écrire le code fonctionnel. L'objectif principal est de guider le développement par les tests pour améliorer la qualité et éviter les erreurs.

Le cycle du TDD est généralement résumé en trois étapes :

1. **Écrire un test qui échoue** (Rouge)
2. **Écrire le minimum de code pour faire passer ce test** (Vert)
3. **Refactoriser le code pour améliorer la lisibilité et la maintenabilité** (Refactor)

Imaginons que nous voulons créer une fonction qui additionne deux nombres.

**Étape 1 : Écrire un test qui échoue**

```typescript
test('doit additionner correctement deux nombres', () => {
  expect(additionner(2, 3)).toBe(5);
});
```

À ce stade, le test échoue car la fonction `additionner` n'existe pas encore.

**Étape 2 : Écrire le minimum de code pour faire passer le test**

```typescript
const additionner = (a: number, b: number): number => {
  return a + b;
};
```

Maintenant, le test passe.

**Étape 3 : Refactoriser**
Si nécessaire, améliorez la lisibilité et la maintenabilité du code (ici, l'exemple est déjà simple).

Ce cycle court et répétitif garantit que chaque morceau de code produit est testé, robuste, et correspond exactement aux exigences initiales.

### BDD (Behavior Driven Development)
Le Behavior Driven Development (BDD) est une pratique agile dérivée du TDD, centrée sur la communication claire et la collaboration entre développeurs, testeurs et équipes métier. Le BDD se concentre sur le comportement attendu d'une application, décrit en langage naturel.

Le cycle du BDD s'appuie sur trois phases principales :

1. **Définir clairement les comportements attendus** en utilisant un langage naturel compréhensible par tous (Gherkin).
2. **Écrire des scénarios exécutables basés sur ces comportements.**
3. **Implémenter le code nécessaire pour que ces scénarios passent.**

Imaginons une fonctionnalité de connexion utilisateur.

**Étape 1 : Définir les comportements attendus (Gherkin)**

```gherkin
Fonctionnalité: Connexion utilisateur
  Scénario: Connexion réussie avec des identifiants valides
    Étant donné que l'utilisateur est sur la page de connexion
    Quand l'utilisateur entre un email valide et un mot de passe valide
    Alors l'utilisateur est redirigé vers la page d'accueil
```

**Étape 2 : Écrire des scénarios exécutables** (avec un outil comme Cucumber ou Jest-Cucumber)

```typescript
import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('./connexionUtilisateur.feature');

defineFeature(feature, test => {
  test('Connexion réussie avec des identifiants valides', ({ given, when, then }) => {
    given('que l\'utilisateur est sur la page de connexion', () => {
      // initialiser la page de connexion
    });

    when('l\'utilisateur entre un email valide et un mot de passe valide', () => {
      // simuler la saisie valide
    });

    then('l\'utilisateur est redirigé vers la page d\'accueil', () => {
      // vérifier la redirection
    });
  });
});
```

**Étape 3 : Implémenter le code**
Écrire le code nécessaire pour que ces tests passent. Le développement est alors directement guidé par le comportement attendu par les utilisateurs.

Cette approche assure une meilleure compréhension partagée des objectifs et facilite une documentation vivante du comportement de l'application.

### Clean code, revue de code et culture du feedback

#### Clean Code
Le « Clean Code » consiste à écrire un code clair, lisible et maintenable. Il vise à faciliter la compréhension rapide par les autres développeurs ou par soi-même, des mois ou des années après l'écriture initiale.

Les principes de base du clean code incluent :
- Des noms explicites pour variables, fonctions, classes.
- Des fonctions courtes avec une seule responsabilité.
- Un formatage cohérent (indentation, espacements, etc.).
- Éviter les commentaires inutiles (préférer un code explicite).
- Refactoriser régulièrement pour simplifier et clarifier.


Voici un exemple avant/après :

**Avant (code peu lisible)**
```typescript
function calc(x: number, y: number): number {
  return x * y;
}
```

**Après (code propre)**
```typescript
function calculateTotalPrice(quantity: number, unitPrice: number): number {
  return quantity * unitPrice;
}
```

Le second exemple est beaucoup plus clair et explicite.

#### Revue de Code
La revue de code est une pratique collaborative où un ou plusieurs développeurs examinent le code écrit par leurs collègues afin d'améliorer la qualité, d'éviter les erreurs et de partager les connaissances.

Quelques bonnes pratiques pour une revue de code efficace :
- Vérifier la lisibilité et la simplicité du code.
- S'assurer que le code respecte les normes du projet.
- Vérifier la présence de tests.
- Proposer des améliorations de manière constructive.

Exemple de commentaire constructif :

> « Cette fonction est très bien, mais pourrait-on la diviser en deux fonctions plus petites pour améliorer la lisibilité ? »

#### Culture du Feedback
La culture du feedback consiste à encourager un échange régulier, constructif et bienveillant entre les membres d’une équipe pour favoriser l’amélioration continue des compétences et des pratiques.

- Donner du feedback spécifique, basé sur des observations concrètes.
- Privilégier une approche bienveillante et constructive.
- Recevoir le feedback avec ouverture et sans attitude défensive.

Exemple concret :

> « Ton dernier composant React était très bien structuré. Juste une petite suggestion : pourrais-tu utiliser `useMemo` pour améliorer légèrement les performances ? »

Ces pratiques combinées favorisent la création d’un environnement technique sain, productif et en constante amélioration.

### DDD (Domain Driven Design)

Le Domain Driven Design (DDD) est une approche de conception logicielle centrée sur le métier. Elle a pour but d'aligner le développement d'une application sur le vocabulaire, les concepts et les règles du domaine métier auquel elle appartient.

L'idée clé du DDD est de considérer l'application comme un modèle du domaine métier réel, facilitant ainsi la compréhension commune entre équipes métier et techniques. Voici quelques concepts importants :

- **Domaine** : l'activité métier spécifique traitée par l'application.
- **Modèle du domaine** : représentation abstraite du domaine avec des objets métiers, leurs relations et règles.
- **Ubiquitous language (langage omniprésent)** : langage partagé par tous (développeurs, métier, etc.) pour éviter les ambiguïtés.

Imaginons une application de gestion de commandes.

- **Domaine** : Gestion des commandes clients.
- **Modèle du domaine** :
    - Entités : `Commande`, `Produit`, `Client`
    - Valeurs : `AdresseLivraison`, `MontantTotal`
    - Règles métier : Une commande doit avoir au moins un produit, l'adresse de livraison est obligatoire.

**Exemple concret en TypeScript :**

```typescript
// Exemple simplifié d'une entité métier
class Commande {
  produits: Produit[];
  client: Client;
  adresseLivraison: Adresse;

  constructor(client: Client, adresseLivraison: Adresse) {
    this.produits = [];
    this.client = client;
    this.adresseLivraison = adresseLivraison;
  }

  ajouterProduit(produit: Produit) {
    this.produits.push(produit);
  }

  validerCommande(): boolean {
    return this.produits.length > 0 && this.adresseLivraison.estValide();
  }
}
```

Dans ce modèle, le vocabulaire utilisé (`Commande`, `Produit`, `Client`, `adresseLivraison`) correspond directement aux termes métier, assurant une meilleure compréhension et une communication fluide entre toutes les parties prenantes.

En suivant le DDD, les développeurs conçoivent des applications cohérentes, intuitives et alignées avec les objectifs métier.

#### Clean Architecture

La Clean Architecture est une approche d'organisation du code visant à améliorer la lisibilité, la maintenabilité, l'évolutivité et la testabilité de l'application. Elle sépare clairement les responsabilités des différentes parties du système en les regroupant par couches distinctes et indépendantes.

La Clean Architecture repose sur quatre principales couches et deux couches de mapping (ACL - Anti Corruption Layers) :

- **Core** : Contient la configuration générale, l'injection de dépendances et la gestion des outils externes.
- **Data** : Assure la liaison avec les sources externes (API, bases de données, etc.) via des objets de transfert de données (DTO) et des repositories.
- **Domain** : Inclut les entités (modèles métier) et les cas d’utilisation (use cases) qui encapsulent la logique métier.
- **Presentation** : Concerne l’interaction avec l’utilisateur (écrans, boutons, navigation, etc.).
- **ACL Interactors** : Couche de mapping reliant les use cases à l’interface utilisateur.
- **ACL Protocols** : Couche de mapping entre les DTO et les entités métier.

Ces couches respectent une règle stricte d'indépendance : les couches internes (domain) ne doivent dépendre d’aucune couche externe (data, présentation), tandis que les couches externes peuvent dépendre des couches internes.

Voici une structure typique d'un projet ReactJS suivant la Clean Architecture :

```
src/
├── core/
│   ├── config.ts
│   └── inversify.config.ts
├── data/
│   ├── dto/
│   │   └── UserDto.ts
│   ├── protocols/
│   │   └── UserProtocol.ts
│   └── repositories/
│       └── UserRepository.ts
├── domain/
│   ├── entities/
│   │   └── User.ts
│   └── useCases/
│       └── UserUseCase.ts
├── interactors/
│   └── UserInteractor.ts
└── presentation/
    ├── components/
    │   └── UserComponent.tsx
    └── pages/
        └── UserPage.tsx
```

- **Core**

```typescript
// inversify.config.ts
import 'reflect-metadata';
import { Container } from 'inversify';
import { IUserRepository } from '../data/repositories/UserRepository';
import { UserRepository } from '../data/repositories/UserRepository';
import { UserUseCase } from '../domain/useCases/UserUseCase';
import { UserInteractor } from '../interactors/UserInteractor';

const container = new Container();

container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<UserUseCase>(UserUseCase).toSelf();
container.bind<UserInteractor>(UserInteractor).toSelf();

export { container };
```

- **Domain**

```typescript
// UserUseCase.ts
import { injectable, inject } from 'inversify';
import { IUserRepository } from '../../data/repositories/UserRepository';
import { dtoToUser } from '../../data/protocols/UserProtocol';
import { Observable, from } from 'rxjs';
import { User } from '../entities/User';

@injectable()
export class UserUseCase {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

  getUser(userId: string): Observable<User> {
    return from(
      this.userRepository.fetchUser(userId).then(dto => dtoToUser(dto))
    );
  }
}
```

- **Présentation**

```tsx
// UserComponent.tsx
import React, { useEffect, useState } from 'react';
import { container } from '../../core/inversify.config';
import { UserInteractor } from '../../interactors/UserInteractor';

export const UserComponent: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState(null);
  const userInteractor = container.get(UserInteractor);

  useEffect(() => {
    const subscription = userInteractor.fetchUserForUI(userId).subscribe(setUser);
    return () => subscription.unsubscribe();
  }, [userId, userInteractor]);

  return user ? <div>{user.displayName} ({user.contact})</div> : <div>Chargement...</div>;
};
```

Cette implémentation met en avant l'utilisation d'InversifyJS pour une gestion claire et efficace des dépendances, ainsi que RxJS pour offrir une gestion réactive des données métier via Observables.

#### Principes SOLID

Les principes SOLID sont des principes fondamentaux en programmation orientée objet permettant d’écrire du code clair, maintenable et évolutif. Ils facilitent la compréhension, limitent les dépendances inutiles et améliorent la modularité.

SOLID est l'acronyme représentant cinq principes clés :

- **S (Single Responsibility Principle)** : Chaque classe doit avoir une seule responsabilité.
- **O (Open/Closed Principle)** : Les entités doivent être ouvertes à l'extension, mais fermées à la modification.
- **L (Liskov Substitution Principle)** : Les sous-classes doivent pouvoir remplacer leurs classes de base sans affecter l'intégrité du programme.
- **I (Interface Segregation Principle)** : Les interfaces doivent être spécifiques à chaque besoin, sans imposer des méthodes inutiles aux implémentations.
- **D (Dependency Inversion Principle)** : Les modules de haut niveau ne doivent pas dépendre de modules de bas niveau, mais des abstractions.

**Single Responsibility Principle (SRP)**

✅ Bon exemple :
```typescript
class UserValidator {
  validateEmail(email: string): boolean {
    // validation email
  }
}

class UserRepository {
  saveUser(user: User): void {
    // sauvegarde utilisateur
  }
}
```

❌ Mauvais exemple (mélange des responsabilités) :
```typescript
class UserManager {
  validateEmail(email: string): boolean {
    // validation email
  }

  saveUser(user: User): void {
    // sauvegarde utilisateur
  }
}
```

**Open/Closed Principle (OCP)**

✅ Bon exemple (extension par héritage ou composition) :
```typescript
interface PaymentMethod {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
  pay(amount: number): void {}
}

class PaypalPayment implements PaymentMethod {
  pay(amount: number): void {}
}
```

**Liskov Substitution Principle (LSP)**

✅ Bon exemple (sous-classe substituable) :
```typescript
class Rectangle {
  setWidth(w: number): void {}
  setHeight(h: number): void {}
}

class Square extends Rectangle {
  setWidth(w: number): void { this.setHeight(w); }
  setHeight(h: number): void { this.setWidth(h); }
}
```

**Interface Segregation Principle (ISP)**

✅ Bon exemple (interfaces spécifiques) :
```typescript
interface CanFly {
  fly(): void;
}

interface CanSwim {
  swim(): void;
}

class Bird implements CanFly {
  fly() {}
}

class Fish implements CanSwim {
  swim() {}
}
```

**Dependency Inversion Principle (DIP)**

✅ Bon exemple (utilisation d'abstractions) :
```typescript
interface IUserRepository {
  save(user: User): void;
}

class UserService {
  constructor(private repository: IUserRepository) {}
}
```

Cette mise en pratique permet aux jeunes développeurs de comprendre facilement comment appliquer concrètement chaque principe dans leurs développements.

#### Injection de dépendance

L’injection de dépendance est un concept qui permet de rendre les composants logiciels indépendants de leurs dépendances directes en injectant ces dernières plutôt qu’en les créant directement. Ce principe est étroitement lié au principe d’inversion des dépendances (DIP) du SOLID.

L'injection de dépendance se base sur l'idée suivante :
- Un composant ne devrait jamais créer directement les composants dont il dépend.
- Les dépendances doivent être fournies par l'extérieur (injection).
- Cela permet une meilleure modularité, flexibilité et facilite grandement les tests.

#### Mise en pratique avec InversifyJS

**Étape 1 : Définir les interfaces**

```typescript
export interface IUserRepository {
  save(user: User): void;
}
```

**Étape 2 : Implémenter les interfaces**

```typescript
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
  save(user: User): void {
    // sauvegarde utilisateur en base
  }
}
```

**Étape 3 : Injection dans les services**

```typescript
import { injectable, inject } from 'inversify';
import { IUserRepository } from './IUserRepository';

@injectable()
export class UserService {
  constructor(@inject('IUserRepository') private repository: IUserRepository) {}

  createUser(user: User): void {
    this.repository.save(user);
  }
}
```

**Étape 4 : Configuration avec InversifyJS**

```typescript
import { Container } from 'inversify';
import { IUserRepository } from './IUserRepository';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';

const container = new Container();
container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<UserService>(UserService).toSelf();

export { container };
```

**Étape 5 : Utiliser le conteneur d’injection**

```typescript
import { container } from './inversify.config';
import { UserService } from './UserService';

const userService = container.get(UserService);
userService.createUser(new User('1', 'John Doe', 'john@example.com'));
```

Cette pratique garantit un code découplé, facile à tester et évolutif, aligné avec les principes SOLID, notamment le principe d’inversion des dépendances.

## Gestion des sources

### Git: définition et bonnes pratiques
Git est un système de contrôle de version distribué. Nous appliquons des bonnes pratiques comme des commits atomiques, des messages explicites et l’utilisation raisonnée des branches.

#### Git flow

Git Flow est une méthodologie de gestion des branches Git conçue pour faciliter le développement logiciel collaboratif tout en maintenant une qualité et une stabilité élevées.

Le Git Flow repose sur deux branches principales :

- **master (ou main)** : représente l’état stable de l'application prête à être déployée en production.
- **develop** : représente l'état de développement courant, intégrant les fonctionnalités prêtes à être testées.

En plus de ces branches principales, Git Flow définit plusieurs types de branches secondaires :

- **feature/** : pour les nouvelles fonctionnalités.
- **bugfix/** : pour corriger des bugs rapidement.
- **release/** : pour préparer une version de livraison.
- **hotfix/** : pour les corrections urgentes directement liées à la production.

#### Mise en pratique

**Étape 1 : Création d’une branche feature**
```shell
git checkout develop
git checkout -b feature/login-page
```

**Étape 2 : Développement et commits réguliers**
```shell
git add .
git commit -m "Ajout de la page de connexion utilisateur"
```

**Étape 3 : Fusion de la feature sur develop après validation et revue de code**
```shell
git checkout develop
git merge --no-ff feature/login-page
git push origin develop
```

**Étape 4 : Préparation d'une version de release**
```shell
git checkout -b release/v1.0.0 develop
# mise à jour des versions et correctifs mineurs
git commit -am "Préparation release v1.0.0"
git checkout master
git merge release/v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0 stable"
git checkout develop
git merge release/v1.0.0
```

**Étape 5 : Correction rapide d'un problème en production (hotfix)**
```shell
git checkout master
git checkout -b hotfix/fix-login-bug
# correction du bug
git commit -am "Correction rapide du bug de login"
git checkout master
git merge hotfix/fix-login-bug
git tag -a v1.0.1 -m "Correction urgente du bug de login"
git checkout develop
git merge hotfix/fix-login-bug
```

Git Flow fournit une structure claire, facilite les revues de code, et aide à maintenir un projet bien organisé et professionnel.

#### Github flow

GitHub Flow est un modèle de gestion de branches très simple, conçu spécifiquement pour les équipes souhaitant livrer fréquemment, rapidement, tout en restant agiles et réactives. Contrairement au Git Flow, GitHub Flow se concentre sur la simplicité et l’efficacité, en limitant au maximum les branches utilisées et en favorisant des livraisons continues.

GitHub Flow repose sur les principes suivants :

- **Simplicité** : une seule branche principale (`main`) toujours prête à être livrée.
- **Livraison rapide et continue** : chaque fonctionnalité est développée sur une branche courte puis rapidement intégrée à la branche principale.
- **Collaboration** : utilisation systématique des Pull Requests (PR) pour favoriser la revue de code collaborative.
- **Déploiement continu** : idéal pour les équipes pratiquant le Continuous Integration/Continuous Deployment (CI/CD).

Voici comment appliquer concrètement GitHub Flow dans votre projet :

**Étape 1 : Créer une branche depuis `main`**  
Chaque nouvelle fonctionnalité, correction de bug ou amélioration doit démarrer depuis la branche principale (`main`).

```bash
git checkout main
git pull origin main
git checkout -b feature/nouvelle-fonctionnalite
```

**Étape 2 : Développer et pousser régulièrement ses modifications**  
Développez sur cette branche courte, et poussez régulièrement vers le dépôt distant.

```bash
git add .
git commit -m "Ajoute une nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite
```

**Étape 3 : Créer une Pull Request**  
Sur GitHub, créez une Pull Request dès que vous êtes prêt à demander une revue. Ajoutez une description claire et invitez d'autres membres de l'équipe à la revue.

- Demandez des revues de code
- Intégrez les retours et améliorez votre code

**Étape 4 : Revue et intégration**  
Une fois que votre code est approuvé par vos collègues, fusionnez la Pull Request dans la branche `main`. GitHub permet d’effectuer la fusion simplement depuis l’interface web :

- Option 1 : Merge classique
- Option 2 : Squash and merge (préférée pour garder l’historique clair)

**Étape 5 : Déploiement automatisé**  
Une fois fusionnée, la branche principale (`main`) peut déclencher automatiquement un déploiement via un pipeline CI/CD vers un environnement de production ou pré-production.

Imaginons que vous deviez ajouter une fonctionnalité permettant d'afficher un bouton de connexion :

1. **Créer une branche**
    ```bash
    git checkout main
    git pull origin main
    git checkout -b feature/login-button
    ```

2. **Développer votre fonctionnalité**
    ```typescript
    export const LoginButton = () => {
      return <button>Se connecter</button>;
    };
    ```

    ```bash
    git add .
    git commit -m "feat: ajoute un bouton de connexion"
    git push origin feature/login-button
    ```

3. **Créer une Pull Request**
    - Sur GitHub, ouvrez une Pull Request de `feature/login-button` vers `main`.
    - Demandez une revue à votre mentor ou collègues.

4. **Revue collaborative**
    - Intégrez les retours éventuels après discussion.

5. **Fusion et déploiement**
    - Fusionnez votre PR sur GitHub.
    - Votre pipeline CI/CD peut automatiquement déployer cette modification en production.

**Pourquoi adopter GitHub Flow ?**

- **Facilité d'apprentissage** : accessible même aux développeurs débutants.
- **Livraison continue** : favorise les déploiements réguliers et sécurisés.
- **Favorise la collaboration** : via les revues de code systématiques.

Ce modèle simple mais efficace vous permettra de progresser rapidement tout en assurant une bonne qualité de code et de collaboration.

#### Trunk based development
Le Trunk Based Development (TBD) est une méthode de gestion des sources où tous les développeurs travaillent sur une branche unique appelée « trunk » ou branche principale. Ils y fusionnent fréquemment leurs modifications, idéalement plusieurs fois par jour. Cette pratique favorise l'intégration continue, réduit les conflits et simplifie les déploiements rapides en production.

Imagine une équipe de développement qui, au lieu d'utiliser plusieurs branches différentes pendant plusieurs jours ou semaines, intègre chaque changement directement dans une seule branche principale commune. Chaque développeur vérifie régulièrement que son travail ne casse pas celui des autres grâce à des tests automatisés exécutés à chaque intégration.

1. **Récupération des derniers changements :**
```bash
git pull origin main
```

2. **Création d'une modification locale :**
```bash
git checkout -b quick-feature
```

3. **Développement et tests locaux :**
```bash
git add .
git commit -m "Ajout rapide d'une fonctionnalité"
```

4. **Intégration fréquente (plusieurs fois par jour) :**
```bash
git checkout main
git pull origin main
git merge quick-feature
git push origin main
```

Ce workflow simplifié montre clairement comment chaque développeur contribue directement à la branche principale, permettant une intégration fluide et rapide.

#### Feature Flipping

Le feature flipping (ou feature toggling) est une technique qui permet d'activer ou désactiver des fonctionnalités d'une application sans nécessiter un redéploiement complet. Cette pratique est utile pour gérer progressivement les nouvelles fonctionnalités, tester en production avec un groupe restreint d'utilisateurs ou gérer des retours rapides.

Imaginons une application où une nouvelle fonctionnalité doit être mise à disposition uniquement à certains utilisateurs ou progressivement à toute la base utilisateur. Plutôt que de déployer plusieurs versions distinctes, la fonctionnalité est déployée dans le code source mais désactivée par défaut grâce à un interrupteur (toggle). L'interrupteur peut ensuite être activé à distance depuis une interface de gestion sans interruption de service.

**Exemple** :

```tsx
// FeatureToggleContext.tsx
import React, { createContext, useContext } from 'react';

type FeatureFlags = {
  newFeatureEnabled: boolean;
};

const featureFlags: FeatureFlags = {
  newFeatureEnabled: false, // Ce flag peut être activé à distance
};

const FeatureToggleContext = createContext<FeatureFlags>(featureFlags);

export const useFeatureToggle = () => useContext(FeatureToggleContext);

export const FeatureToggleProvider: React.FC = ({ children }) => (
  <FeatureToggleContext.Provider value={featureFlags}>
    {children}
  </FeatureToggleContext.Provider>
);

// Utilisation dans un composant
import { useFeatureToggle } from './FeatureToggleContext';

const MyComponent = () => {
  const { newFeatureEnabled } = useFeatureToggle();

  return (
    <div>
      {newFeatureEnabled ? <NewFeature /> : <OldFeature />}
    </div>
  );
};
```

Cette implémentation simple montre comment basculer rapidement entre deux versions d'une fonctionnalité sans redéploiement complet.
