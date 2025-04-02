# Pattern MVVM+I+R (Model-View-ViewModel + Interactor + Router)

Le pattern MVVM+I+R est un pattern d'architecture qui permet de séparer les préoccupations dans une application. Il est composé de plusieurs couches :
* Interactor: C'est la couche qui gère la logique métier de l'application. Elle est responsable de l'exécution des cas d'utilisation et de la gestion des erreurs. Elle est aussi la couche ACL (Anti-Corruption Layer) entre la couche Presentation et la couche DOMAIN.
* Router: C'est la couche qui gère la navigation entre les différentes vues de l'application. Elle est responsable de la création des routes et de la gestion de l'historique de navigation.
* ViewModel: C'est la couche qui gère l'état de la vue. Elle est responsable de la création des données à afficher dans la vue et de la gestion des événements de la vue.
* View: C'est la couche qui gère l'affichage de l'application. Elle est responsable de la création des composants de l'interface utilisateur et de la gestion des événements de l'utilisateur.

La communication entre la view et le view model se fait via des hooks. Les hooks sont des fonctions qui permettent de gérer l'état de la vue et de la vue modèle. Ils permettent de créer des composants réactifs qui se mettent à jour automatiquement lorsque l'état change.

La communication entre le view model et l'interactor se fait via des observables. Les observables sont des objets qui permettent de gérer les flux de données asynchrones. Ils permettent de créer des composants réactifs qui se mettent à jour automatiquement lorsque les données changent.

## Créer l'interactor

## Créer le ViewModel

## Créer la vue

## Gérer la navigation
