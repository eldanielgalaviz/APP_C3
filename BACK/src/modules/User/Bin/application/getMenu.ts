import { UserRepository } from "../../domain/exceptions/UserRepository";

export class getUsersMenu {
  constructor(private repository: UserRepository) {}

  async run(userId: number): Promise<any[]> {
    return this.repository.getUserMenu(userId);
  }
}