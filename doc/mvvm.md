# Pattern MVVM+I+R (Model-View-ViewModel + Interactor + Router)
Le pattern MVVM+I+R est une architecture sophistiquée qui vise à découpler strictement les différentes responsabilités d’une application. Cette approche modulaire permet d’isoler la logique métier, de gérer l’état de l’interface, d’assurer la navigation entre les vues et de simplifier la maintenance ainsi que l’évolution du code. Dans cette architecture, chaque couche – qu’il s’agisse de l’interactor, du modèle, du viewmodel, de la vue ou du router – assume une responsabilité spécifique, garantissant ainsi une meilleure testabilité et une évolutivité accrue du projet.
* Interactor: C'est la couche qui gère la logique métier de l'application. Elle est responsable de l'exécution des cas d'utilisation et de la gestion des erreurs. Elle est aussi la couche ACL (Anti-Corruption Layer) entre la couche Presentation et la couche DOMAIN.
* ViewModel: C'est la couche qui gère l'état de la vue. Elle est responsable de la création des données à afficher dans la vue et de la gestion des événements de la vue.
* View: C'est la couche qui gère l'affichage de l'application. Elle est responsable de la création des composants de l'interface utilisateur et de la gestion des événements de l'utilisateur.
* Model: C'est la couche qui gère les données de l'application. Elle est responsable de la création des données à afficher dans la vue et de la gestion des événements de la vue.
* Router: C'est la couche qui gère la navigation entre les différentes vues de l'application. Elle est responsable de la création des routes et de la gestion de l'historique de navigation.

La communication entre la view et le view model se fait via des hooks. Les hooks sont des fonctions qui permettent de gérer l'état de la vue et de la vue modèle. Ils permettent de créer des composants réactifs qui se mettent à jour automatiquement lorsque l'état change.

La communication entre le view model, le model et l'interactor se fait via des observables. Les observables sont des objets qui permettent de gérer les flux de données asynchrones. Ils permettent de créer des composants réactifs qui se mettent à jour automatiquement lorsque les données changent.

## Créer l'interactor

Dans le fichier dédié à l’interactor, nous observons plusieurs points clés :

- **Responsabilités :**  
  L’interactor constitue la couche dédiée à la logique métier. Il orchestre l’exécution des cas d’usage (ici, via `UserUseCase` et `LoginUseCase`) tout en servant d’interface entre la présentation et le domaine, agissant en quelque sorte comme une couche ACL (Anti-Corruption Layer).

- **Implémentation technique :**  
  L’utilisation d’Inversify pour l’injection de dépendances facilite le couplage faible entre les composants. De plus, la manipulation des flux de données asynchrones se fait via RxJS, avec notamment la méthode `pipe` associée à l’opérateur `map` pour transformer le flux de données (extraction du nom de l’utilisateur).

- **Fonctionnalités proposées :**  
  Les méthodes asynchrones `call` et `login` encapsulent respectivement l’appel aux cas d’usage, garantissant ainsi une gestion centralisée de la logique métier.

```typescript
import {inject, injectable} from "inversify";
import {LoginUseCase, UserUseCase} from "@domain";
import {map} from "rxjs";

@injectable()
export class HomeInteractor {
    constructor(
        @inject("UserUseCase") private userUseCase: UserUseCase,
        @inject("LoginUseCase") private loginUseCase: LoginUseCase,
    ) {
    }

    public get stream() {
        return this.userUseCase.stream.pipe(
            map(user => user.name)
        )
    }

    public call = async (): Promise<void> => {
        await this.userUseCase.call()
    }

    public login = async (): Promise<void> => {
        await this.loginUseCase.call()
    }
}

```

## Créer le modèle

Le modèle, représenté ici par la classe correspondante, joue le rôle d’intermédiaire entre l’interactor et la couche supérieure (le ViewModel) :

- **Abstraction et médiation :**  
  Le modèle simplifie l’accès aux fonctionnalités de l’interactor en exposant des méthodes telles que `refresh` et `login`, tout en relayant les flux de données (via la propriété `stream`).

- **Objectif principal :**  
  Il offre une couche d’abstraction qui permet de masquer la complexité de la logique métier tout en fournissant une interface simplifiée pour la mise à jour et l’observation des données.

```typescript
import {inject, injectable} from "inversify";
import {HomeInteractor} from "./home.interactor.ts";

@injectable()
export class HomeModel {
    constructor(
        @inject("HomeInteractor") private homeInteractor: HomeInteractor
    ) {}

    public refresh = async (): Promise<void> => {
        await this.homeInteractor.call()
    }

    public login = async (): Promise<void> => {
        await this.homeInteractor.login()
    }

    public get stream() {
        return this.homeInteractor.stream
    }
}

```

## Créer le ViewModel

Le ViewModel se matérialise sous la forme d’un hook React personnalisé :

- **Gestion de l’état et des abonnements :**  
  Le hook `useHomeViewModel` initialise un état local (`userName`) et récupère une instance du modèle via un système d’injection de dépendances. L’abonnement à l’observable `stream` permet de réagir en temps réel aux mises à jour de l’état de l’utilisateur.

- **Interface pour la vue :**  
  En exposant à la fois l’état (`userName`) et des méthodes asynchrones (`refresh` et `login`), le ViewModel sert d’interface de communication entre la vue et la logique métier, garantissant ainsi une synchronisation fluide entre l’interface et les données sous-jacentes.

```typescript
import {useEffect, useState} from "react";
import {Injection} from "@core";
import {HomeModel} from "./home.model.ts";

export const useHomeViewModel = () => {
    const [userName, setUserName] = useState<string>("")
    const homeModel = Injection.get<HomeModel>("HomeModel")

    useEffect(() => {
        const subscription = homeModel?.stream.subscribe((state) => {
            setUserName(state || "");
        })
        return () => {
            subscription?.unsubscribe()
        }
    }, [homeModel])

    return {
        userName,
        refresh: async () => {
            await homeModel?.refresh()
        },
        login: async () => {
            await homeModel?.login()
        }
    }

}

```

## Créer la vue

La vue est implémentée en tant que composant fonctionnel React :

- **Rôle d’affichage :**  
  Le composant `Home` se charge d’afficher l’interface utilisateur, notamment en présentant un message de bienvenue personnalisé (exemple : "Bonjour {userName}").

- **Cycle de vie et interactions :**  
  À l’aide du hook `useEffect`, le composant initie une série d’appels (`login` puis `refresh`) dès son montage, ce qui permet d’actualiser l’état de la vue en fonction de l’évolution des données.

- **Intégration avec MUI :**  
  L’utilisation des composants de Material UI (tels que `Container`, `Box` et `Typography`) garantit une interface élégante et cohérente, tout en facilitant la gestion des styles et de la mise en page.

```typescript
import * as React from 'react'
import {Box, Container, Typography} from "@mui/material"
import {Copyright} from "@presentation";
import {useHomeViewModel} from "../home.viewmodel"

const Home: React.FC = () => {
    const {userName, refresh, login} = useHomeViewModel()

    React.useEffect(() => {
        login().then(() => {
            refresh().then()
        })
    }, [])

    return (
        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" sx={{mb: 2}}>
                    Bonjour {userName}
                </Typography>

                <Copyright/>
            </Box>
        </Container>
    )
}

export default Home

```

## Gérer la navigation

La configuration du routing est essentielle pour orchestrer la navigation entre les différentes vues de l’application :

- **Lazy loading et optimisation :**  
  L’utilisation de `React.lazy` permet de différer le chargement du composant `Home`, améliorant ainsi les performances et l’expérience utilisateur par le biais d’un chargement asynchrone.

- **Gestion des routes :**  
  La configuration des `Routes` et `Route` offre une définition claire des chemins, avec un mécanisme de redirection (via `<Navigate>`) qui assure que toute URL non définie redirige vers la page d’accueil.

- **Thématisation et cohérence visuelle :**  
  Le composant `ThemeProvider` associé à Material UI garantit que l’ensemble de l’application respecte une charte graphique uniforme, améliorant ainsi la cohérence visuelle et l’expérience utilisateur globale.

```typescript
import * as React from "react"
import "./app.css"
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme.tsx";
import {Navigate, Route, Routes} from "react-router";

const Home = React.lazy(() => import("./home"))

// @ts-ignore
const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
            <Route path="/" element={
                <React.Suspense fallback={<>...</>}>
                    <Home />
                </React.Suspense>
            } />
        </Routes>
        <Routes>
            <Route path="*"  element={<Navigate to="/" replace />} />
        </Routes>
    </ThemeProvider>
)

export default App

```

Le pattern MVVM+I+R, tel que présenté dans cette documentation, illustre une approche architecturale robuste et modulable. Chaque couche – de l’interactor au router – est clairement délimitée et assume des responsabilités précises, permettant ainsi une séparation nette entre la logique métier, la gestion de l’état et l’interface utilisateur. Cette structuration favorise la réutilisabilité du code, facilite les tests unitaires et contribue à une meilleure maintenabilité de l’application. En adoptant ce modèle, les développeurs se dotent d’un outil puissant pour concevoir des applications réactives, évolutives et pérennes, tout en bénéficiant d’une approche pédagogique et structurée pour la montée en compétences de leurs équipes.

Ce type d’architecture, en alliant rigueur et flexibilité, représente indubitablement un levier stratégique pour optimiser la qualité et la performance des applications modernes.
