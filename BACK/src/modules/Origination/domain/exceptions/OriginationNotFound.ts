export class OriginationNotFound extends Error {
  constructor(id: string) {
    super(`Origination with id ${id} not found`);
    this.name = 'OriginationNotFound';
  }
}