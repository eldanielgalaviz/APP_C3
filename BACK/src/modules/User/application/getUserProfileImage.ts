import { UserRepository } from "../domain/exceptions/UserRepository";


export class getUserProfileImage {
  constructor(private repository: UserRepository) {}

  async run(idUser: number): Promise<any> {
    return this.repository.getUserProfileImage(idUser);
  }
}
