export class PermissionsNotFound extends Error {
  constructor(id: number) {
    super(`Permissions with id ${id} not found`);
    this.name = 'PermissionsNotFound';
  }
}