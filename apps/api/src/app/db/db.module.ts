import { DynamicModule, Module } from "@nestjs/common";
import { DbConnectorService } from "./db-connector.service";

@Module({
  imports: [],
  providers: [DbConnectorService],
  exports: [DbConnectorService],
})
export class DbModule {
  static forRoot(dbUrl: string): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: "URI_STRING",
          useValue: dbUrl,
        },
        DbConnectorService,
      ],
      exports: [DbConnectorService],
    };
  }
}
