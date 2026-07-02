export class Login { 
  Email: string;
  Password: string;
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {
    this.Email = email;
    this.Password = password;
  }
}