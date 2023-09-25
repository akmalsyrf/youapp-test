import { Injectable } from '@nestjs/common';
import { ZodiacRepository } from './zodiac.repository';
import { CreateOnlyNameRequest } from '../dto/create-only-name.request';

@Injectable()
export class ZodiacService {
  constructor(private readonly zodiacRepository: ZodiacRepository) {}

  /***
    bulk create script for migration purpose
  ***/
  bulkCreateZodiac(request: CreateOnlyNameRequest[]) {
    return this.zodiacRepository.bulkCreate(request);
  }
  /*****
   ******/

  createZodiac(request: CreateOnlyNameRequest) {
    return this.zodiacRepository.create(request);
  }
}
