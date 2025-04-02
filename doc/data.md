# Alimenter la couche DATA

## 1. Créer le modèle de données

Avant toute chose, créons le modèle de données basé sur le retour de l'outil externe (ici, l'API). Ce type de modèle se nomme DTO (Data Transfert Object).
Il sert exclusivement à transporter les données entre les différentes couches de l'application. Il ne doit pas contenir de logique métier.

```typescript
export class UserDto {
    name?: string;
    email?: string;
    constructor(name: string | undefined, email: string | undefined) {
        this.name = name
        this.email = email
    }
}

```

## 2. Créer le service

Nous ajouterons ici l'appel à l'API via notre Retrofit "user_service.ts" (ou autre nom de service).

```typescript
@BasePath(`${basePath}/${version}`)
export class UserService extends BaseService {
    @GET("/user")
    async getUser(): Promise<Response<UserDto>> { return <Response<UserDto>> {} }
}
```

## 3. Créer le repository

Le repository est la couche intermédiaire entre le service et le reste de l'application. Il permet de centraliser les appels aux services et de gérer les erreurs.

```typescript
import {inject, injectable} from "inversify"
import type {INetwork} from "@core"
import {UserDto} from "@data"

@injectable()
export class UserRepository {
    constructor(
        @inject("INetwork") private network: INetwork,
    ) {
    }

    public call = async (): Promise<UserDto> => {
        const userResponse = await this.network.userService.getUser()
        return userResponse.data
    }
}
```

## 4. Ajouter le repository à l'injection de dépendance

Nous devons ajouter le repository à l'injection de dépendance pour pouvoir l'utiliser dans le reste de l'application.
Je le gère dans le fichier "index.ts" à la racine de la couche DATA.

```typescript
import {Injection} from "@core";
import { UserRepository } from "./repositories/user_repository"

export { UserDto } from "./dto/user_dto"
export { UserRepository } from "./repositories/user_repository"

export const registerInjections = () => {
    Injection.register<UserRepository>("UserRepository", UserRepository, "factory")
}
```
