import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => String)
  name!: string;
  @Field(() => String, { nullable: true })
  description?: string;
}
