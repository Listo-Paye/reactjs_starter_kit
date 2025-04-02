# Configurer vos appels API via Axios et Retrofit

La connexion à l'API est établie en utilisant Retrofit, un client HTTP typé, à la base, pour Android et Java. Retrofit vous permet de définir vos points d'accès API sous forme d'interfaces, facilitant ainsi l'interaction avec des services RESTful.

## Interface API

L'interface de l'API est définie à l'aide des annotations Retrofit afin de spécifier les méthodes HTTP, les points d'accès ainsi que les types de requête/réponse. Par exemple :

## Aperçu rapide

Voici une définition et une utilisation typiques d'un service :

```typescript
import { GET, POST, PUT, PATCH, DELETE, BasePath, Header, Path, Body, BaseService, ServiceBuilder, Response } from "axios-retrofit";

interface User {
  id?: number;
  name: string;
  email: string;
}

@BasePath("/api/v1")
class UserService extends BaseService {
  @GET("/users")
  async getUsers(@Header("Authorization") authorization: string): Promise<Response<Array<User>>> { return <Response<Array<User>>> {} };

  @GET("/users/{userId}")
  async getUser(@Header("Authorization") authorization: string, @Path("userId") userId: number): Promise<Response<User>> { return <Response<User>> {} };

  @POST("/users")
  async createUser(@Header("Authorization") authorization: string, @Body user: User): Promise<Response> { return <Response> {} };

  @PUT("/users/{userId}")
  async updateUser(@Header("Authorization") authorization: string, @Path("userId") userId: number, @Body user: User): Promise<Response> { return <Response> {} };

  @PATCH("/users/{userId}")
  async patchUser(@Header("Authorization") authorization: string, @Path("userId") userId: number, @Body user: Partial<User>): Promise<Response> { return <Response> {} };

  @DELETE("/users/{userId}")
  async deleteUser(@Header("Authorization") authorization: string, @Path("userId") userId: number): Promise<Response> { return <Response> {} };
}

@injectable()
export class NetworkImpl implements Network {
    private _userService?: UserService
    private _oidcInterceptor: RequestInterceptorFunction = (config: InternalAxiosRequestConfig) => {
        config.headers.set("Authorization", `Bearer ${this._oidc.getAccessToken()}`)
        return config;
    }
    get userService(): UserService {
        if (!this._userService) {
            const instance: AxiosInstance = axios.create()
            const axiosWithCache:  AxiosCacheInstance = setupCache(instance)
            this._userService = new ServiceBuilder()
                .setEndpoint(this.configuration.api.apiUrl || "")
                .setStandalone(axiosWithCache)
                .setRequestInterceptors(this._oidcInterceptor)
                .build(UserService)
        }
        return this._userService
    }
    constructor(
        @inject("IAuthentication") private _oidc: IAuthentication,
        @inject("IConfiguration") private configuration: IConfiguration
    ) {
    }
}
```

---

## Journalisation

Vous pouvez définir un callback de journalisation pour afficher certaines informations une fois la requête terminée (succès/erreur) :

```typescript
@BasePath("")
export class HealthService extends BaseService {
  @GET("/ping")
  @ResponseStatus(200)
  async ping(): Promise<Response> { return <Response>{} };
}
const myLogCallback = (config: RequestConfig, response: Response) => {
  const log = `[${config.method}] ${config.url} ${response.status}`;
  console.log(log); // [GET] http://localhost:12345/ping 200
};
const service = new ServiceBuilder()
  .setEndpoint("http://localhost:12345")
  .setLogCallback(myLogCallback)
  .build(HealthService);

// ou utiliser ceci
service.setLogCallback(myLogCallback);
const response = await service.ping();
```

---

## Décorateurs

### BasePath

* **Position : Classe**

Le décorateur `BasePath` déclare le préfixe de chemin d'un service.

```typescript
// Le chemin commun de ItemService est ${ENDPOINT}/api/v1
@BasePath("/api/v1")
class ItemService extends BaseService {}
```

### Décorateurs de méthodes HTTP

Tous les décorateurs de méthodes HTTP possèdent un second paramètre optionnel de type **HttpMethodOptions** :

```typescript
export interface HttpMethodOptions {
  ignoreBasePath?: boolean;
}
```

#### GET

* **Position : Méthode**

Le décorateur `GET` déclare que ce qu'il décore utilise la méthode HTTP **GET** pour effectuer la requête vers le serveur.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items
  @GET("/items")
  async getItems(): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };

  // GET ${ENDPOINT}/items
  @GET("/items", { ignoreBasePath: true })
  async getItemsWithoutBasePath(): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

#### POST

* **Position : Méthode**

Le décorateur `POST` déclare que ce qu'il décore utilise la méthode HTTP **POST** pour effectuer la requête vers le serveur.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // POST ${ENDPOINT}/api/v1/items
  @POST("/items")
  async createItem(@Body item: Item): Promise<Response> { return <Response> {} };
}
```

#### PUT

* **Position : Méthode**

Le décorateur `PUT` déclare que ce qu'il décore utilise la méthode HTTP **PUT** pour effectuer la requête vers le serveur.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // PUT ${ENDPOINT}/api/v1/items/{itemId}
  @PUT("/items/{itemId}")
  async updateItem(@Path("itemId") itemId: number, @Body item: Item): Promise<Response> { return <Response> {} };
}
```

#### PATCH

* **Position : Méthode**

Le décorateur `PATCH` déclare que ce qu'il décore utilise la méthode HTTP **PATCH** pour effectuer la requête vers le serveur.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // PATCH ${ENDPOINT}/api/v1/items/{itemId}
  @PATCH("/items/{itemId}")
  async patchItem(@Path("itemId") itemId: number, @Body item: Partial<Item>): Promise<Response> { return <Response> {} };
}
```

#### DELETE

* **Position : Méthode**

Le décorateur `DELETE` déclare que ce qu'il décore utilise la méthode HTTP **DELETE** pour effectuer la requête vers le serveur.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // DELETE ${ENDPOINT}/api/v1/items/{itemId}
  @DELETE("/users/{userId}")
  async deleteUser(@Header("Authorization") authorization: string, @Path("userId") userId: number): Promise<Response> { return <Response> {} };
}
```

#### HEAD

* **Position : Méthode**

Le décorateur `HEAD` déclare que ce qu'il décore utilise la méthode HTTP **HEAD** pour effectuer la requête vers le serveur.

```typescript
@BasePath("/api/v1")
class FileService extends BaseService {
  // HEAD ${ENDPOINT}/api/v1/files/{fileId}
  @HEAD("/files/{fileId}")
  async getFileMetaInfo(@Path("fileId") fileId: number): Promise<Response> { return <Response> {} };
}
```

#### OPTIONS

* **Position : Méthode**

Le décorateur `OPTIONS` déclare que ce qu'il décore utilise la méthode HTTP **OPTIONS** pour effectuer la requête vers le serveur.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // OPTIONS ${ENDPOINT}/api/v1/items/{itemId}
  @OPTIONS("/items/{itemId}")
  async getFileMetaInfo(@Path("itemId") itemId: number): Promise<Response> { return <Response> {} };
}
```

### Headers

* **Position : Méthode**

Le décorateur `Headers` déclare quels en-têtes HTTP statiques doivent être ajoutés à la requête.

```typescript
@BasePath("")
export class AuthService extends BaseService {
  @POST("/oauth/token")
  @Headers({
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    "Accept": "application/json"
  })
  async auth(@Body body: OAuth): Promise<Response<Token>> { return <Response<Token>>{} };
}
```

### Header

* **Position : Paramètre de méthode**

Le décorateur `Header` permet de paramétrer un en-tête dans la requête HTTP. Le client peut fournir une valeur pour un seul en-tête.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items
  async getItems(@Header("Authorization") authorization: string): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

### HeaderMap

* **Position : Paramètre de méthode**

Le décorateur `HeaderMap` permet de paramétrer les en-têtes dans la requête HTTP. Le client peut fournir des valeurs pour plusieurs en-têtes.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items
  async getItems(@HeaderMap headers: any): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

### Path

* **Position : Paramètre de méthode**

Le décorateur `Path` permet de paramétrer une partie du chemin dans la requête HTTP.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items/{itemId}
  @GET("/items/{itemId}")
  async getItem(@Path("itemId") itemId: number): Promise<Response<Item>> { return <Response<Item>> {} };
}
```

### Body

* **Position : Paramètre de méthode**

Le décorateur `Body` permet de paramétrer le corps de la requête HTTP.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // POST ${ENDPOINT}/api/v1/items
  @POST("/items")
  async createItem(@Body item: Item): Promise<Response> { return <Response> {} };
}
```

### QueryArrayFormat

* **Position : Méthode**

Le décorateur `QueryArrayFormat` déclare le format à utiliser pour les tableaux dans les requêtes.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // getItemsWithQueryArrayFormatIndices(["food", "book", "pet"])
  // GET ${ENDPOINT}/api/v1/items?categories[0]=food&categories[1]=book&categories[2]=pet
  @GET("/items")
  @QueryArrayFormat("indices")
  async getItemsWithQueryArrayFormatIndices(
    @Query("categories") categories: string[]
  ): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
  
  // getItemsWithQueryArrayFormatBrackets(["food", "book", "pet"])
  // GET ${ENDPOINT}/api/v1/items?categories[]=food&categories[]=book&categories[]=pet
  @GET("/items")
  @QueryArrayFormat("brackets")
  async getItemsWithQueryArrayFormatBrackets(
    @Query("categories") categories: string[]
  ): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
  
  // getItemsWithQueryArrayFormatRepeat(["food", "book", "pet"])
  // GET ${ENDPOINT}/api/v1/items?categories=food&categories=book&categories=pet
  @GET("/items")
  @QueryArrayFormat("repeat")
  async getItemsWithQueryArrayFormatRepeat(
    @Query("categories") categories: string[]
  ): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
  
  // getItemsWithQueryArrayFormatComma(["food", "book", "pet"])
  // GET ${ENDPOINT}/api/v1/items?categories=food,book,pet
  @GET("/items")
  @QueryArrayFormat("comma")
  async getItemsWithQueryArrayFormatComma(
    @Query("categories") categories: string[]
  ): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

### Queries

* **Position : Méthode**

Le décorateur `Queries` déclare les paramètres de requête statiques à ajouter à la requête.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items?size=20
  @GET("/items")
  @Queries({
    size: 20,
  })
  async getItems(): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

### Query

* **Position : Paramètre de méthode**

Le décorateur `Query` permet de paramétrer un paramètre de requête dans la requête HTTP. Le client peut fournir une valeur pour un seul paramètre.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items?size=20
  @GET("/items")
  async getItems(@Query('size') size: number): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

### QueryMap

* **Position : Paramètre de méthode**

Le décorateur `QueryMap` permet de paramétrer plusieurs paramètres de requête dans la requête HTTP.

```typescript
@BasePath("")
class SearchService extends BaseService {
  // GET ${ENDPOINT}/search?a=foo&b=bar
  @GET("/search")
  async search(@QueryMap query: SearchQuery): Promise<Response<SearchResult>> { return <Response<SearchResult>> {} };
}
```

### FormUrlEncoded

* **Position : Méthode**

Le décorateur `FormUrlEncoded` déclare que le type de contenu dans la requête HTTP est **application/x-www-form-urlencoded;charset=utf-8**.

```typescript
@BasePath("")
export class AuthService extends BaseService {
  @POST("/oauth/token")
  @FormUrlEncoded
  async auth(@Body body: OAuth): Promise<Response<Token>> { return <Response<Token>>{} };
}
```

### Field

* **Position : Paramètre de méthode**

Le décorateur `Field` permet de paramétrer un champ dans la requête HTTP. Il n'est effectif que lorsque la méthode est décorée par **@FormUrlEncoded**.

```typescript
@BasePath("")
export class AuthService extends BaseService {
  @POST("/oauth/token")
  @FormUrlEncoded
  async auth(@Field("username") username: string, @Field("password") password: string): Promise<Response<Token>> { return <Response<Token>>{} };
}
```

### FieldMap

* **Position : Paramètre de méthode**

Le décorateur `FieldMap` permet de paramétrer plusieurs champs dans la requête HTTP. Il n'est effectif que lorsque la méthode est décorée par **@FormUrlEncoded**.

```typescript
@BasePath("")
export class AuthService extends BaseService {
  @POST("/oauth/token")
  @FormUrlEncoded
  async auth(@FieldMap fields: OAuth): Promise<Response<Token>> { return <Response<Token>>{} };
}
```

### Multipart

* **Position : Méthode**

Le décorateur `Multipart` déclare que le type de contenu dans la requête HTTP est **multipart/form-data**.

```typescript
@BasePath("/api/v1")
export class FileService extends BaseService {
  @POST("/upload")
  @Multipart
  async upload(@Part("bucket") bucket: PartDescriptor<string>, @Part("file") file: PartDescriptor<Buffer>): Promise<Response> { return <Response>{} };
}
```

### Part

* **Position : Paramètre de méthode**

Le décorateur `Part` permet de paramétrer une partie dans la requête HTTP. Il n'est effectif que lorsque la méthode est décorée par **@Multipart**.

```typescript
@BasePath("/api/v1")
export class FileService extends BaseService {
  @POST("/upload")
  @Multipart
  async upload(@Part("bucket") bucket: PartDescriptor<string>, @Part("file") file: PartDescriptor<Buffer>): Promise<Response> { return <Response>{} };
}
```

### ResponseType

* **Position : Méthode**  
  *Options : 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'*

Le décorateur `ResponseType` déclare le type de réponse dans la configuration d'axios.

```typescript
@BasePath("/api/v1")
export class FileService extends BaseService {
  @GET("/file")
  @ResponseType("stream")
  async getFile(@Path("fileId") fileId: string): Promise<Response> { return <Response>{} };
}
```

### RequestTransformer

* **Position : Méthode**

Le décorateur `RequestTransformer` offre une possibilité de manipuler les données de la requête avant leur envoi vers le serveur.

```typescript
@BasePath(API_PREFIX)
export class TransformerService extends BaseService {
  @POST("/request-transformer")
  @RequestTransformer((data: any, headers?: any) => {
    data.foo = 'foo'; // ajouter quelque chose aux données de la requête
    return JSON.stringify(data);
  })
  async createSomething(@Body body: Something): Promise<Response> { return <Response>{} };
}
```

### ResponseTransformer

* **Position : Méthode**

Le décorateur `ResponseTransformer` offre une possibilité de manipuler les données de la réponse après leur réception du serveur.

```typescript
@BasePath(API_PREFIX)
export class TransformerService extends BaseService {
  @POST("/request-transformer")
  @ResponseTransformer((data: any, headers?: any) => {
    data.foo = 'foo';  // ajouter quelque chose aux données de la réponse
    return JSON.stringify(data);
  })
  async createSomething(@Body body: Something): Promise<Response> { return <Response>{} };
}
```

### Timeout

* **Position : Méthode**

Le décorateur `Timeout` déclare le délai d'attente dans la configuration d'axios.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items
  @GET("/items")
  @Timeout(3000)
  async getItems(): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

### ResponseStatus

* **Position : Méthode**

Le décorateur `ResponseStatus` déclare le code de statut pour la méthode, sans effet autre qu'une simple déclaration.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items
  @GET("/items")
  @Timeout(3000)
  async getItems(): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

### Config

* **Position : Méthode**

Le décorateur `Config` offre un moyen direct de définir la configuration d'une requête dans axios.

```typescript
@BasePath("/api/v1")
export class ConfigService extends BaseService {
  @GET("/config")
  @Config({
    maxRedirects: 1,
  })
  async getConfig(): Promise<Response> { return <Response>{} };
}
```

### GraphQL et GraphQLVariables

* **Position : Méthode**

Le décorateur `GraphQL` déclare la requête pour une requête GraphQL.  
Le décorateur `GraphQLVariables` déclare les variables pour une requête GraphQL.

```typescript
const gqlQuery =
`query ($name: String!, $owner: String!) {
  viewer {
    name
    location
  }
  repository(name: $name, owner: $owner) {
    stargazerCount
    forkCount
  }
}`;

@BasePath("")
export class GraphQLService extends BaseService {
  @POST("/graphql")
  @GraphQL(gqlQuery, "UserAndRepo")
  async graphql1(
    @GraphQLVariables variables: any,
  ): Promise<Response> { return <Response>{} };
}
```

### Deprecated

* **Position : Méthode**

Le décorateur `Deprecated` marque une méthode comme obsolète.

```typescript
@BasePath("/api/v1")
class ItemService extends BaseService {
  // GET ${ENDPOINT}/api/v1/items
  @GET("/items")
  @Deprecated("This method is deprecated")
  async getItems(): Promise<Response<Array<Item>>> { return <Response<Array<Item>>> {} };
}
```

### Récapitulatif des Décorateurs

|      Catégorie       |         Nom          |                         Description                          | Position du Décorateur |                           Exemple                            |
| :------------------: | :------------------: | :----------------------------------------------------------: | :--------------------: | :----------------------------------------------------------: |
|     HTTP Method      |         @GET         |                          Méthode GET                         |        Méthode         |                        @GET("/users")                         |
|     HTTP Method      |        @POST         |                         Méthode POST                         |        Méthode         |                       @POST("/users")                         |
|     HTTP Method      |         @PUT         |                          Méthode PUT                         |        Méthode         |                   @PUT("/users/{userId}")                      |
|     HTTP Method      |        @PATCH        |                         Méthode PATCH                        |        Méthode         |                  @PATCH("/users/{userId}")                     |
|     HTTP Method      |       @DELETE        |                        Méthode DELETE                        |        Méthode         |                  @DELETE("/users/{userId}")                    |
|     HTTP Method      |        @HEAD         |                         Méthode HEAD                         |        Méthode         |                   @HEAD("/users/{userId}")                     |
|     HTTP Method      |       @OPTIONS       |                        Méthode OPTIONS                       |        Méthode         |                 @OPTIONS("/users/{userId}")                    |
|      Base Path       |      @BasePath       |    Spécifie le chemin de base d'une série de points d'accès API   |         Classe         |                     @BasePath("/api/v1")                        |
|   Static Headers     |       @Headers       |        Spécifie les en-têtes HTTP statiques de l'API          |        Méthode         | @Headers({ "content-type": "application/x-www-form-urlencoded", "Accept": "application/json" }) |
|  Header Parameter    |       @Header        |                     En-tête paramétré                         | Paramètre de Méthode   |                      @Header("X-Token")                         |
|  Header Parameters   |      @HeaderMap      |                     En-têtes paramétrées                      | Paramètre de Méthode   |                          @HeaderMap                           |
|   Path Parameter     |        @Path         |             Spécifie un paramètre dans le chemin d'accès       | Paramètre de Méthode   |                       @Path("userId")                           |
|        Body          |        @Body         |                     Spécifie les données du corps              | Paramètre de Méthode   |                            @Body                              |
| Query Array Format   |  @QueryArrayFormat   |                Spécifie le format des tableaux en requête       |        Méthode         |                 @QueryArrayFormat('repeat')                   |
|    Static Query      |       @Queries       |                 Spécifie les paramètres de requête statiques      |        Méthode         | @Queries({ page: 1, size: 20, sort: "createdAt:desc" })          |
|   Query Parameter    |        @Query        |                     Paramètre de requête                       | Paramètre de Méthode   |                       @Query("group")                           |
|  Query Parameters    |      @QueryMap       |                     Paramètres de requête                      | Paramètre de Méthode   |                          @QueryMap                            |
|   Static Headers     |   @FormUrlEncoded    | Spécifie que le "content-type" est "application/x-www-form-urlencoded" |        Méthode         |                       @FormUrlEncoded                         |
|   Field Parameter    |        @Field        | Spécifie un champ dans le paramètre de la méthode (avec @FormUrlEncoded) | Paramètre de Méthode   |                        @Field("name")                          |
|  Field Parameters    |      @FieldMap       | Spécifie une carte de champs dans le paramètre de la méthode (avec @FormUrlEncoded) | Paramètre de Méthode   |                          @FieldMap                            |
|   Static Headers     |      @Multipart      |    Spécifie que le "content-type" est "multipart/form-data"       |        Méthode         |                          @Multipart                           |
|   Part Parameters    |        @Part         | Spécifie une partie dans le paramètre de la méthode (avec @Multipart) | Paramètre de Méthode   |                        @Part("name")                           |
|      Response        |    @ResponseType     |         Spécifie le type de réponse dans la configuration axios   |        Méthode         |                   @ResponseType("stream")                     |
| RequestTransformer   | @RequestTransformer  |      Spécifie le transformateur de requête dans la configuration axios |        Méthode         | @RequestTransformer((data: any, headers?: any) => { data.foo = 'foo'; return JSON.stringify(data); }) |
| ResponseTransformer  | @ResponseTransformer |     Spécifie le transformateur de réponse dans la configuration axios  |        Méthode         | @ResponseTransformer((data: any, headers?: any) => { const json = JSON.parse(data); json.foo = 'foo'; return json; }) |
|       Timeout        |       @Timeout       |            Spécifie le délai d'attente dans la configuration axios  |        Méthode         |                        @Timeout(5000)                         |
|   ResponseStatus     |   @ResponseStatus    | Déclare le code de statut pour la méthode, sans autre effet         |        Méthode         |                     @ResponseStatus(204)                        |
|       Config         |       @Config        |      Un moyen direct de définir la configuration d'une requête dans axios |        Méthode         |                 @Config({ maxRedirects: 1 })                    |
|       GraphQL        |       @GraphQL       |            Déclare la requête pour une requête GraphQL              |        Méthode         |             @GraphQL(gqlQuery, "operationName")                 |
|  GraphQLVariables    |  @GraphQLVariables   |          Déclare les variables pour une requête GraphQL             |        Méthode         |                      @GraphQLVariables                          |
|     Deprecated       |     @Deprecated      |                 Marque une méthode comme obsolète                 |        Méthode         |  @Deprecated()<br>@Deprecated("This method is deprecated")       |
