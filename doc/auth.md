# Authentification OIDC & Service Worker

## 🧭 Objectif

Ce module implémente un système d'authentification sécurisé fondé sur le standard **OpenID Connect (OIDC)**. Il repose sur la librairie [`@axa-fr/oidc-client`](https://www.npmjs.com/package/@axa-fr/oidc-client) et un **Service Worker** pour :

- Gérer la connexion/déconnexion (classique et silencieuse).
- Protéger les jetons (`access_token`, `id_token`, `refresh_token`) contre les attaques XSS.
- Injecter automatiquement le jeton dans les appels vers des domaines de confiance (trusted domains).
- Permettre la simulation de l’authentification via des stubs en environnement de test.

---

## 🧩 Architecture Générale

```
+---------------------------+
|         IAuthentication  |
| (interface d'abstraction)|
+---------------------------+
            ▲
            |
+---------------------------+    +--------------------------+
|   AuthenticationImpl      |    |   AuthenticationStub     |
| (implémentation réelle)   |    | (implémentation mockée)  |
+---------------------------+    +--------------------------+
            ▲                          ▲
            |                          |
            |            +---------------------------+
            └───────────>| Injection (InversifyJS)   |
                         +---------------------------+
```

---

## 🔑 Principes d’authentification

Le module repose sur les mécanismes standardisés de l’OpenID Connect :

- **Authorization Code Flow avec PKCE** : utilisé pour sécuriser l’échange du code d’autorisation contre un jeton.
- **Service Worker** pour intercepter les requêtes et y injecter l’`access_token` de manière sécurisée.
- **Token Refresh et Silent Login** sont également pris en charge.

---

## 🛠️ Interfaces et implémentations

### IAuthentication

Interface permettant d’abstraire le comportement de l’authentification :

```ts
interface IAuthentication {
    login(callbackPath?: string): Promise<unknown>
    silentLogin(): Promise<unknown>
    logout(callbackPath?: string): Promise<void>
    getAccessToken(): Promise<string | undefined>
    isAuthenticated(): Observable<boolean>
}
```

### AuthenticationImpl

- Utilise `OidcClient` pour se connecter à l’Identity Provider.
- Utilise un `Observable<boolean>` pour diffuser l’état de connexion.
- Gère `login`, `logout`, `silentLogin`, `getAccessToken`.

### AuthenticationStub

- Permet de simuler le comportement de l’authentification pour les tests.
- L’état de connexion est simulé via des délais.

---

## ⚙️ Injection de dépendances

L’injection de dépendances repose sur **InversifyJS**. Elle permet de changer d’implémentation selon l’environnement :

```ts
configureInjection(Flavors.Release); // Authent réel
configureInjection(Flavors.Test);    // Stub pour les tests
```

---

## 🧵 Service Worker

Le fichier `OidcServiceWorker.js` implémente une logique poussée :

- **Protection des tokens** : les jetons sont stockés dans le SW et non accessibles au JS client.
- **Interception des appels HTTP** : si l’appel cible un trusted domain, le SW injecte le token dans l’en-tête `Authorization`.
- **Renouvellement automatique des tokens** (si expirés mais avec un `refresh_token` encore valide).
- **Support du DPoP** (Demonstration of Proof of Possession) si activé.

### Communication Client ↔️ Service Worker

Les échanges sont réalisés par `postMessage` pour :

- Initialiser le contexte (`init`)
- Récupérer ou réinitialiser les tokens
- Gérer le `code_verifier`, le `state`, et le `nonce`

---

## 🌐 Configuration des trusted domains

Les trusted domains sont déclarés dans `OidcTrustedDomains.js`. Ce fichier autorise l’injection du token dans les appels vers certaines URL.

### Exemple de configuration simple :

```js
const trustedDomains = {
  default: ['https://monapi.com', 'https://auth.monidp.com']
};
```

### Exemple avec options avancées :

```js
trustedDomains.config_show_access_token = {
  domains: ['https://monapi.com'],
  showAccessToken: true, // access_token exposé dans le JS client
  convertAllRequestsToCorsExceptNavigate: true,
  setAccessTokenToNavigateRequests: false,
};
```

### Exemple avec séparation des domaines :

```js
trustedDomains.config_separate_oidc_access_token_domains = {
  oidcDomains: ['https://monidp.com'],
  accessTokenDomains: ['https://monapi.com']
};
```

---

## 🔐 Concepts de sécurité

| Élément                          | Explication |
|----------------------------------|-------------|
| **Service Worker**               | Empêche tout accès direct aux tokens via le JS exécuté dans le navigateur. |
| **DPoP (Proof of Possession)**   | Renforce la sécurité des tokens : ils ne peuvent être utilisés que par celui qui les a générés. |
| **Nonce, State, Code Verifier**  | Mécanismes standards du PKCE pour prévenir les attaques par injection ou par interception. |
| **Refresh Token caché**          | Jamais transmis au JS client, uniquement géré dans le Service Worker. |

---

## 🧪 Tests et environnements

L’environnement `Test` utilise `AuthenticationStub`, permettant :

- De simuler un utilisateur connecté ou déconnecté (`authStub.isConnected = true`)
- De forcer un `access_token` statique (`access-token`)
- D'éviter toute communication réelle avec un serveur OIDC

---

## 🧠 Bonnes pratiques

- Ne jamais accéder directement aux tokens côté client.
- Toujours utiliser les méthodes fournies par l’interface `IAuthentication`.
- Bien définir les trusted domains pour éviter les erreurs CORS ou des fuites de tokens.
- En cas d’appel backend via WebSocket, prévoir un mécanisme explicite pour récupérer le token côté Service Worker.

---

## 📎 Pour aller plus loin

- [RFC 6749 - OAuth 2.0 Framework](https://tools.ietf.org/html/rfc6749)
- [RFC 7636 - PKCE](https://tools.ietf.org/html/rfc7636)
- [RFC 9449 - DPoP](https://www.rfc-editor.org/rfc/rfc9449)
- [OIDC Client par AXA France](https://github.com/AxaFrance/oidc-client)
