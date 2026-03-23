import { UserRepository } from "../../domain/exceptions/UserRepository";
import { CreateUserRequest } from "../../domain/CreateUserRequest";

export class setUsers {
  constructor(private repository: UserRepository) {}

  async run(user: CreateUserRequest): Promise<void> {
    return this.repository.setUsers(user);
  }
}