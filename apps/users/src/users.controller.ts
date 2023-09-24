import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller('api')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rmqService: RmqService,
    ) {}

  @Get('user/:accountId')
  @UseGuards(JwtAuthGuard)
  async getUserByAccountId(@Param('accountId') accountId: string) {
    return this.usersService.getUserByAccountId(accountId);
  }

  @Post('user')
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @EventPattern('account_created')
  async handleUserCreate(@Payload() data: any, @Ctx() context: RmqContext) {
    this.usersService.createUser(data.request);
    this.rmqService.ack(context);
  }
}
