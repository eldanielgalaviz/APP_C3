import { UserRepository } from "../domain/exceptions/UserRepository";
import { UserProfileImageRequest } from "../domain/UserProfileImageRequest";

export class setUserProfileImage {
  constructor(private repository: UserRepository) {}

  async run(user: UserProfileImageRequest): Promise<void> {
    return this.repository.setUserProfileImage(user.p_IdUser, user.p_url_img);
  }
}