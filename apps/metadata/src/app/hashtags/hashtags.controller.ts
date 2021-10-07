import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Version,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { HashtagsService } from './hashtags.service';

@Controller('metadata')
export class HashtagsController {
  constructor(private readonly hashtagsModuleService: HashtagsService) {}

  @Version('1')
  @Get('features')
  @UseGuards(JwtAuthGuard)
  getDataV1(@Req() req: any) {
    return this.hashtagsModuleService.getDataV1(
      req.user.uuid,
      req.headers['accept-language']
    );
  }

  @Version('2')
  @Get('features')
  @UseGuards(JwtAuthGuard)
  getDataV2(@Req() req: any) {
    return this.hashtagsModuleService.getDataV2(
      req.user.uuid,
      req.headers['accept-language']
    );
  }
}
