import { Injectable } from "@nestjs/common";
import { DbConnectorService } from "../db/db-connector.service";
import { IUserInterface } from "../../../../../libs/api-interfaces/src/lib/user.interface";

const bcrypt = require("bcrypt");

@Injectable()
export class RegistrationService {
  constructor(private readonly _dbConnectorService: DbConnectorService) {}

  public async registerUser(userData: IUserInterface): Promise<number> {
    const userExists = await this.validateIfUserExists(
      userData.username,
      userData.email
    );
    if (userExists) {
      return 409;
    }

    const insertedUser = await this._dbConnectorService.insertUser(
      await this.secureUserData(userData)
    );
    if (insertedUser) {
      return 200;
    }

    return 409;
  }

  private async validateIfUserExists(
    username: string,
    email: string
  ): Promise<boolean> {
    return await this._dbConnectorService.validateIfUserExists(username, email);
  }

  private async secureUserData(userData: IUserInterface) {
    // userData.password = await bcrypt.hash(userData.password, 10);
    return userData;
  }
}
