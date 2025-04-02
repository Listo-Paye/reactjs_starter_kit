export class User {
    name?: string;
    email?: string;

    constructor(name: string | undefined, email: string | undefined) {
        this.name = name
        this.email = email
    }
}
