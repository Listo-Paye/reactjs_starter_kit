# Injection de dépendance

Le principe d'injection de dépendance (ou *dependency injection*) est une technique de programmation qui consiste à fournir à un objet les dépendances dont il a besoin pour fonctionner, plutôt que de les instancier lui-même. Cette approche permet de déléguer la gestion des dépendances à un conteneur d'injection, qui se charge de les fournir à l'objet lors de sa création.

Nous utilisons ici InversifyJS, une bibliothèque d'injection de dépendance pour TypeScript et JavaScript. InversifyJS permet de définir des *bindings* entre des interfaces et des implémentations, et de résoudre automatiquement les dépendances lors de la création des objets.

## Exemple d'ajout d'une dépendance

Pour ajouter une dépendance à un service, il suffit de déclarer une interface et une implémentation correspondante, puis de les lier dans le conteneur d'injection.

```typescript
// Définition de l'interface du service
interface ILogger {
    log(message: string): void;
}

// Implémentation du service
@injectable()
class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(message);
    }
}
```
Dans le fichier `inversify.config.ts`, on définit les *bindings* entre les interfaces et les implémentations :

```typescript
import {Flavors} from "./flavors.ts";

export const configureInjection = (environment: Flavors) => {
    // Register services here
    // Injection.register(ServiceIdentifier)
    console.debug("Injection configured for", environment)
    
    Injection.register(serviceIdentifier = ILogger, implementation = ConsoleLogger, pattern = "singleton");
}
```

Pour l'utiliser dans un composant, on peut
```typescript
@injectable()
class LoggedService {
  constructor(
    @inject(ILogger)
    public readonly logger: ILogger,
  ) {}
    
  public log(message: string): void {
    this.logger.log(message);
  }
}
```
