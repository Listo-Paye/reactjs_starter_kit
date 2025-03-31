# Gérer les configurations globales

Définir une injection de dépendances pour la configuration globale présente un intérêt majeur : cela permet d’appliquer efficacement le principe d’inversion de dépendances (Dependency Inversion Principle, DIP), l’un des cinq principes SOLID.

En pratique, au lieu que les composants ReactJS soient directement responsables d’obtenir leur propre configuration (par exemple via des imports directs), ils reçoivent celle-ci de façon explicite via une injection. Les composants dépendent alors d’une abstraction (interface de configuration), plutôt que d’une implémentation concrète.

Cette inversion permet :
* Une meilleure modularité : Les composants n’ont plus besoin de connaître les détails de la source de la configuration.
* Un découplage renforcé : Il est possible de changer ou d’étendre la source de configuration (fichier local, serveur distant, variables d’environnement) sans affecter le code métier des composants.
* Une facilité de tests accrue : Durant les tests unitaires ou d’intégration, injecter une configuration mockée ou spécifique devient trivial, améliorant ainsi l’isolation des tests.

Appliquer l’injection de dépendances pour la configuration globale contribue donc fortement à rendre votre code ReactJS en TypeScript à la fois plus souple, évolutif et conforme aux bonnes pratiques SOLID.

Actuellement, nous avons configuré l'injection de dépendances pour la configuration d'authentification OpenID Connect (OIDC) et la configuration de l'API. Nous allons maintenant voir comment configurer l'injection de dépendances pour d'autres configurations globales, comme la configuration de l'API.

## Ajouter un élément de configuration
Pour ajouter un élément de configuration, il suffit de créer une interface et une implémentation correspondante, puis de les lier dans le conteneur d'injection.

`core/di/configuration/configuration.ts`
```typescript
export interface IConfiguration {
    authentication: IAuthenticationConfiguration
    api: IApiConfiguration
    newConfig: INewConfiguration
}

export interface IAuthenticationConfiguration {
    clientId: string | undefined
    clientSecret: string | undefined
    authority: string | undefined
    postLogoutRedirectUriSuffix: string | undefined
    silentRedirectUriSuffix: string | undefined
}

export interface IApiConfiguration {
    apiUrl: string | undefined
    apiVersion: string | undefined
}

export interface INewConfiguration {
    exemple: string | undefined
}
```

Nous avons ici ajouté une nouvelle configuration `INewConfiguration` à notre interface `IConfiguration`. Cette nouvelle configuration peut être utilisée pour stocker des paramètres supplémentaires que vous souhaitez injecter dans vos composants.

### Implémentation de la configuration
Pour que cette nouvelle configuration soit effective en production, il faut également l'implémenter dans le fichier de configuration. Voici un exemple d'implémentation :

`core/di/configuration/configuration_impl.ts`
```typescript
import {injectable} from "inversify";
import {IApiConfiguration, IAuthenticationConfiguration, IConfiguration} from "./configuration.ts";

@injectable()
export class ConfigurationImpl implements IConfiguration {
    authentication: IAuthenticationConfiguration
    api: IApiConfiguration
    newConfig: INewConfiguration

    constructor() {
        this.authentication = {
            clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
            clientSecret: import.meta.env.VITE_OIDC_CLIENT_SECRET,
            authority: import.meta.env.VITE_OIDC_AUTHORITY,
            postLogoutRedirectUriSuffix: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI_SUFFIX,
            silentRedirectUriSuffix: import.meta.env.VITE_OIDC_SILENT_REDIRECT_URI_SUFFIX,
        }
        this.api = {
            apiUrl: import.meta.env.VITE_API_URL,
            apiVersion: import.meta.env.VITE_API_VERSION,
        }
        this.newConfig = {
            exemple: import.meta.env.VITE_EXEMPLE,
        }
    }
}
```

Pour toute nouvelle configuration, il est fortement conseillé d'utiliser des variables d'environnement (et de ne les utiliser qu'ici). Ceci permet d'avoir un espace centralisé avec toutes les variables d'environnement.

> Chose à savoir : Les variables d'environnement sont accessibles via `import.meta.env` dans Vite. Il est important de noter que seules les variables d'environnement qui commencent par `VITE_` seront exposées à votre code. Cela permet de garder certaines variables d'environnement privées et non accessibles au client.
> 
> Lors du build, les valeurs de ces variables d'environnement seront intégrées dans le code, ce qui signifie que vous devez être prudent avec les informations sensibles.

#### Configuration en local avec Docker Compose

Pour configurer votre environnement local, il suffit d'ajouter les variables dans docker-compose.yml :

```yaml
services:
  frontend:
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    build:
      target: development
    environment:
      - VITE_OIDC_CLIENT_ID=your_client_id
      - VITE_OIDC_CLIENT_SECRET=your_client_secret
      - VITE_OIDC_AUTHORITY=http://keycloak:8080/auth/realms/your_realm
      - VITE_OIDC_POST_LOGOUT_REDIRECT_URI_SUFFIX=/oidc/logout
      - VITE_OIDC_SILENT_REDIRECT_URI_SUFFIX=/oidc/silent
      - VITE_API_URL=http://api:8080/api
      - VITE_API_VERSION=v1
      - VITE_EXEMPLE=example_value
    depends_on:
      - keycloak
      - api
```

### Configuration pour les tests

Pour les tests, il est possible de mettre à jour le Stub :

`core/di/configuration/configuration_stub.ts`
```typescript
import {injectable} from "inversify";
import {IApiConfiguration, IAuthenticationConfiguration, INewConfiguration, IConfiguration} from "./configuration.ts";

@injectable()
export class ConfigurationStub implements IConfiguration {
    authentication: IAuthenticationConfiguration
    api: IApiConfiguration
    newConfig: INewConfiguration

    constructor() {
        this.authentication = {
            clientId: "client-id",
            clientSecret: "secret",
            authority: "https://example.com",
            postLogoutRedirectUriSuffix: "portal/",
            silentRedirectUriSuffix: "silent-renewal/"
        }
        this.api = {
            apiUrl: "https://api.example.com",
            apiVersion: undefined
        }
        this.newConfig = {
            exemple: 'example stub',
        }
    }
}
```
