import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => String)
  name!: string;
  @Field(() => String)
  description!: string;
  @Field(() => String, { nullable: true })
  link?: string;
  @Field(() => String, { nullable: true })
  repoLink?: string;
}
