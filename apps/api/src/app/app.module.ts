import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbModule } from "./db/db.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { environment } from "./environment/environment";

@Module({
  imports: [
    DbModule.forRoot(environment.DATABASE_URL),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
