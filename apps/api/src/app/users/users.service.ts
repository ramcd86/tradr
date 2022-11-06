import { Injectable } from "@nestjs/common";
import { DbConnectorService } from "../db/db-connector.service";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: "john",
      password: "changeme",
    },
    {
      userId: 2,
      username: "maria",
      password: "guess",
    },
  ];

  constructor(private readonly _dbConnectorService: DbConnectorService) {}

  async findOne(username: string): Promise<User | undefined> {
    // @todo replace with dbquery
    return this.users.find((user) => user.username === username);
  }
}
