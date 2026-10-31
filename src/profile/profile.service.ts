import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    return await this.prisma.profile.findFirstOrThrow();
  }

  async getLinks({ profileId }: { profileId: string }) {
    return await this.prisma.profile
      .findUnique({ where: { id: profileId } })
      .links();
  }
  async getSkills({ profileId }: { profileId: string }) {
    return await this.prisma.profile
      .findUnique({ where: { id: profileId } })
      .skills();
  }
  async getExperience({ profileId }: { profileId: string }) {
    return await this.prisma.profile
      .findUnique({ where: { id: profileId } })
      .experience();
  }
  async getProjects({ profileId }: { profileId: string }) {
    return await this.prisma.profile
      .findUnique({ where: { id: profileId } })
      .projects();
  }
}
