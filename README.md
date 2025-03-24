# ReactJS Starter Kit

## ReactJS : définition
ReactJS est une bibliothèque JavaScript open-source développée par Facebook permettant de construire des interfaces utilisateur interactives et réactives basées sur des composants réutilisables.

### Histoire
Initialement publié en 2013 par Facebook, ReactJS a révolutionné le développement front-end grâce à son approche par composants, son modèle de rendu efficace et sa simplicité d’utilisation.

### Comment le rendu fonctionne-t-il ?
React utilise un DOM virtuel pour améliorer les performances. Lorsqu'un état change, React compare le DOM virtuel avec le DOM réel et applique uniquement les modifications nécessaires, réduisant ainsi les opérations coûteuses sur le DOM.

### Notre Stack technique
Nous privilégions une stack moderne et robuste basée principalement sur :
- ReactJS avec TypeScript
- Redux ou React Query pour la gestion des états
- Jest et React Testing Library pour les tests
- Storybook pour documenter et tester visuellement les composants

#### Pourquoi TypeScript ?
TypeScript apporte un typage statique robuste, améliorant la qualité du code, réduisant les erreurs au runtime, et facilitant la maintenance et l’évolutivité du projet.

## Nos pratiques

### TDD (Test Driven Development)
Nous pratiquons le développement piloté par les tests : chaque fonctionnalité est d'abord définie par un test automatisé avant d'être implémentée, assurant ainsi un haut niveau de qualité et de sécurité.

### BDD (Behavior Driven Development)
Le développement piloté par le comportement (BDD) complète le TDD en décrivant les fonctionnalités en langage naturel (Gherkin), permettant une meilleure communication entre équipes techniques et métier.

### Clean code, revue de code et culture du feedback
Nous suivons les principes du clean code pour garantir lisibilité et maintenabilité du projet. Les revues de code systématiques et une culture constructive du feedback renforcent la qualité et les compétences de l’équipe.

### DDD (Domain Driven Design)
Le DDD permet d’aligner l’architecture applicative sur le métier en définissant clairement des domaines métier, améliorant ainsi la compréhension et la gestion du projet.

#### Clean Architecture
Notre architecture est structurée en couches distinctes (présentation, application, domaine, infrastructure), facilitant l’évolutivité, le test et l'indépendance des composants.

#### Principes SOLID
Nous appliquons les principes SOLID :
- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

Ces principes assurent un code flexible, robuste et maintenable.

#### Injection de dépendance
L’injection de dépendance permet une meilleure modularité et facilite les tests en injectant les dépendances dans les composants plutôt que de les créer directement à l'intérieur.

## Gestion des sources

### Git: définition et bonnes pratiques
Git est un système de contrôle de version distribué. Nous appliquons des bonnes pratiques comme des commits atomiques, des messages explicites et l’utilisation raisonnée des branches.

#### Git flow
Stratégie basée sur des branches stables (main, develop, feature, release, hotfix) pour organiser clairement les développements, facilitant ainsi la gestion des déploiements et des corrections urgentes.

#### Github flow
Modèle simplifié utilisant uniquement une branche principale (main) avec des branches courtes pour les nouvelles fonctionnalités. Idéal pour les déploiements fréquents.

#### Trunk based development
Approche où tous les développeurs intègrent régulièrement leurs changements directement dans la branche principale (trunk), facilitant l'intégration continue et le déploiement continu (CI/CD).

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
