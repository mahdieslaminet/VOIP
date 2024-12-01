import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { VoiceChatGateway } from './voice-chat/voice-chat.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VoiceChatGateway],
})
export class AppModule {}
