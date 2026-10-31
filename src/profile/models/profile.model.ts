import { Field, ObjectType } from '@nestjs/graphql';
import { Link } from './link.model';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

@ObjectType()
export class Profile {
  @Field(() => String)
  name!: string;
  @Field(() => String)
  description!: string;

  @Field(() => [Link])
  links!: [Link];
  @Field(() => [Skill])
  skills!: [Skill];
  @Field(() => [Experience])
  experience!: [Experience];
  @Field(() => [Project])
  projects!: [Project];
}
