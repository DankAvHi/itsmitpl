import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => String)
  label!: string;
  @Field(() => String)
  url!: string;
}
