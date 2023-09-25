import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { ZodiacService } from './zodiac.service';
import { CreateOnlyNameRequest } from '../dto/create-only-name.request';

@Controller('api')
export class ZodiacController {
  constructor(private readonly zodiacService: ZodiacService) {}

  @Post('zodiac')
  @UseGuards(JwtAuthGuard)
  createZodiac(@Body() request: CreateOnlyNameRequest) {
    return this.zodiacService.createZodiac(request);
  }
}
