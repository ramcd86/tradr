import { Module } from "@nestjs/common";
import {DbModule} from "../db/db.module";
import {AuthModule} from "../auth/auth.module";
import {environment} from "../environment/environment";
import {AppController} from "../app.controller";
import {AuthService} from "../auth/auth.service";
import {DbConnectorService} from "../db/db-connector.service";

@Module({
    imports: [
        DbModule.forRoot(environment.DATABASE_URL),
        AuthModule,
    ],
    controllers: [AppController],
    exports: [AuthService, DbConnectorService]
})
export class SharedModule {}
