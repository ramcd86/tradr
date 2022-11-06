import { Controller, Get, Res, Request, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { Message } from "@tradr/api-interfaces";

import { AppService } from "./app.service";
import { DbConnectorService } from "./db/db-connector.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { RegistrationService } from "./users/registration.service";

@Controller()
export class AppController {
  constructor(
    private readonly _appService: AppService,
    private readonly _dbConnectorService: DbConnectorService,
    private readonly _authService: AuthService,
    private readonly _registrationService: RegistrationService
  ) {}

  // Handle User Routes

  @Post("auth/register")
  async register(@Request() req) {
    return await this._registrationService.registerUser(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    console.log(req.body);
    return this._authService.login(req.user);
  }

  @Get()
  root(@Res() response): void {
    response.sendFile("index.html");
  }

  @Get("api/hello")
  getData(): Message {
    this._dbConnectorService.doInit();
    return this._appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
