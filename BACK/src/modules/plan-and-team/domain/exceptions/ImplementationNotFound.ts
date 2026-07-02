export class ImplementationNotFound extends Error {
  constructor(id: string) {
    super(`Implementation with id ${id} not found`);
    this.name = 'ImplementationNotFound';
  }
}