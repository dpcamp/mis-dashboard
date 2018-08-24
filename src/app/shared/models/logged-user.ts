export class LoggedUser {
    constructor(
    public guid: string,
    public user_name: string,
    public is_authenticated: string,
    public is_admin: boolean,
    public timestamp: string

    ) {}
  }
