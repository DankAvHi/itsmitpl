import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './models/profile.model';
import type { ProfileModel } from '@/generated/prisma/models';
import { Link } from './models/link.model';
import { Skill } from './models/skill.model';
import { Experience } from './models/experience.model';
import { Project } from './models/project.model';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { name: 'profile' })
  async getProfile() {
    return this.profileService.getProfile();
  }

  @ResolveField('links', () => [Link])
  async getLinks(@Parent() profile: ProfileModel) {
    return await this.profileService.getLinks({ profileId: profile.id });
  }
  @ResolveField('skills', () => [Skill])
  async getSkills(@Parent() profile: ProfileModel) {
    return await this.profileService.getSkills({ profileId: profile.id });
  }
  @ResolveField('experience', () => [Experience])
  async getExperience(@Parent() profile: ProfileModel) {
    return await this.profileService.getExperience({ profileId: profile.id });
  }
  @ResolveField('projects', () => [Project])
  async getProjects(@Parent() profile: ProfileModel) {
    return await this.profileService.getProjects({ profileId: profile.id });
  }
}
