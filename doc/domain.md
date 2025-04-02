# Définir entités et cas d'utilisation

## 1. Créer le modèle d'entité

La première chose à faire est de créer notre modèle métier. Il doit être le plus proche possible de la réalité. Il doit contenir toutes les propriétés nécessaires à l'application.
Ce type de modèle se nomme Entity (ou Domain Model).

```typescript
export class User {
    name?: string;
    email?: string;

    constructor(name: string | undefined, email: string | undefined) {
        this.name = name
        this.email = email
    }
}
```

## 2. Créer le Protocol

Le protocol est une interface qui permet de définir un mapping entre le modèle de données et le modèle métier. Il permet de transformer les données du DTO en entité.
Son utilité est de créer une séparation entre la couche DATA et la couche DOMAIN. Il permet de ne pas avoir de dépendance entre les deux couches.
C'est ce qu'on appelle le principe de séparation des préoccupations (Separation of Concerns), et plus particulièrement dans notre cas: un ACL (Anti-Corruption Layer).

```typescript
import {UserDto} from "@data"
import {User} from "@domain"

export class UserProtocol {
    static toDomain(userDto: UserDto): User {
        return new User(userDto.name, userDto.email)
    }

    static fromDomain(user: User): UserDto {
        return new UserDto(user.name, user.email)
    }
}
```

Les protocols sont créés dans la couche DATA mais sont utilisés dans la couche DOMAIN. Ils permettent de transformer les données du DTO en entité et inversement.

## 3. Créer le cas d'utilisation

Le cas d'utilisation est la couche intermédiaire entre le repository et le reste de l'application. Il permet de centraliser les appels aux repositories et de gérer les erreurs.
Il permet également de définir la logique métier de l'application. Il doit être le plus proche possible de la réalité.

Il existe deux types de cas d'utilisation: les cas d'utilisation simples et les cas d'utilisation aggrégés : 
- Les cas d'utilisation simples sont des cas d'utilisation qui ne font qu'un appel à un repository. Ils sont généralement utilisés pour des opérations simples comme la création, la mise à jour ou la suppression d'une entité.
- Les cas d'utilisation aggrégés sont des cas d'utilisation qui font plusieurs appels à plusieurs repositories. Ils sont généralement utilisés pour des opérations plus complexes qui nécessitent plusieurs étapes.

```typescript
import {inject, injectable} from "inversify";
import {UserProtocol, UserRepository} from "@data";
import {Observable, Subscriber} from "rxjs";
import {User} from "@domain";

@injectable()
export class UserUseCase {
    private subscriber: Subscriber<User> | undefined
    private observable: Observable<User> = new Observable<User>(subscriber => {
        this.subscriber = subscriber
    })

    constructor(
        @inject("UserRepository") private userRepository: UserRepository,
    ) {
    }

    public get stream(): Observable<User> {
        return this.observable
    }

    public call = async (): Promise<void> => {
        const result = await this.userRepository.call()
        const user = UserProtocol.toDomain(result)
        this.subscriber?.next(user)
    }
}
```

## 4. Ajouter le cas d'utilisation à l'injection de dépendance

Nous devons ajouter le cas d'utilisation à l'injection de dépendance pour pouvoir l'utiliser dans le reste de l'application.
Je le gère dans le fichier "index.ts" à la racine de la couche DOMAIN.

```typescript
import {Injection} from "@core";
import { UserUseCase } from "./usecases/user_usecase"

export { User } from "./entities/user_entity"
export { UserUseCase } from "./usecases/user_usecase"

export const registerInjections = () => {
    Injection.register<UserUseCase>("UserUseCase", UserUseCase, "singleton")
}
```
