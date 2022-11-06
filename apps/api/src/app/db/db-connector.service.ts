import { Injectable, Inject } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { IUserInterface } from "../../../../../libs/api-interfaces/src/lib/user.interface";

@Injectable()
export class DbConnectorService {
  private databaseConnector: MongoClient = new MongoClient(this.dbUri);
  private dataBase = this.databaseConnector.db("tradr");
  private userVault = this.dataBase.collection("user_vault");

  constructor(@Inject("URI_STRING") private dbUri: string) {}

  public async validateIfUserExists(
    username: string,
    email: string
  ): Promise<boolean> {
    const userNameQuery = await this.userVault.findOne({ username });
    console.log("userNameQuery", userNameQuery);
    const emailQuery = await this.userVault.findOne({ email });
    console.log("emailQuery", emailQuery);
    return !!(userNameQuery || emailQuery);
  }

  public async insertUser(user: IUserInterface) {
    return this.userVault.insertOne(user);
  }

  public async doInit(): Promise<void> {
    const client = new MongoClient(this.dbUri);

    try {
      const db = client.db("tradr");
      const collection = db.collection("misc");

      const queryResult = await collection.findOne({ name: "Johnny" });

      if (!queryResult) {
        await collection.insertOne({ name: "Johnny" });
      }

      console.log("Query result:", queryResult);
    } catch (e) {
      console.log("Connection Error:", e);
      await client.close();
    } finally {
      await client.close();
    }
  }
}
