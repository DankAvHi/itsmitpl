import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileResolver } from './profile.resolver.js';

@Module({
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
