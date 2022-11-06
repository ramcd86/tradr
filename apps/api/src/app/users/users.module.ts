import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegistrationService } from "./registration.service";
import { DbModule } from "../db/db.module";
import { environment } from "../environment/environment";

@Module({
  imports: [DbModule.forRoot(environment.DATABASE_URL)],
  providers: [UsersService, RegistrationService],
  exports: [UsersService, RegistrationService],
})
export class UsersModule {}
