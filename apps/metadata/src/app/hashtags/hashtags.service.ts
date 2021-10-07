import { Injectable, NotFoundException } from '@nestjs/common';
import moment = require('moment');
import { I18nService } from 'nestjs-i18n';
import { TranslatorService } from 'nestjs-translator';
import { NotFoundError } from 'rxjs';
@Injectable()
export class HashtagsService {
  constructor(private translator: TranslatorService) {}

  async getDataV1(uuid: string, language: string) {
    if (language != 'en' && language != 'th')
      throw new NotFoundException('Language Invalid');
    const feed: string = await this.translator.translate('feed', {
      lang: language,
    });

    const dateObj = moment().toDate();
    return {
      message: 'success message',
      payload: [
        {
          id: uuid,
          slug: 'feed',
          name: feed,
          key: 'feature.feed',
          create_at: dateObj,
          update_at: dateObj,
        },
      ],
    };
  }

  async getDataV2(uuid: string, language: string) {
    if (language != 'en' && language != 'th')
      throw new NotFoundException('Language Invalid');
    const feed: string = await this.translator.translate('feed', {
      lang: language,
    });
    const photo: string = await this.translator.translate('photo', {
      lang: language,
    });
    const watch: string = await this.translator.translate('watch', {
      lang: language,
    });
    const dateObj = moment().toDate();
    return {
      message: 'success message',
      payload: [
        {
          id: uuid,
          slug: 'feed',
          name: feed,
          key: 'feature.feed',
          create_at: dateObj,
          update_at: dateObj,
        },
        {
          id: uuid,
          slug: 'photo',
          name: photo,
          key: 'feature.photo',
          create_at: dateObj,
          update_at: dateObj,
        },
        {
          id: uuid,
          slug: 'watch',
          name: watch,
          key: 'feature.watch',
          create_at: dateObj,
          update_at: dateObj,
        },
      ],
    };
  }
}
