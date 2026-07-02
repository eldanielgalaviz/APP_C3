export class LoginNotFound extends Error {
  constructor(id: string) {
    super(`Login with id ${id} not found`);
    this.name = 'LoginNotFound';
  }
}