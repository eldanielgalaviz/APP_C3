import { UserRepository } from "../../domain/exceptions/UserRepository";
import { CreateUserRequest } from "../../domain/CreateUserRequest";

export class getUsers {
  constructor(private repository: UserRepository) {}

  async run(): Promise<CreateUserRequest[]> {
    return this.repository.getUsers();
  }
}