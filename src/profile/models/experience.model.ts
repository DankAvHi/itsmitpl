import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => String)
  company!: string;
  @Field(() => String)
  position!: string;
  @Field(() => Date)
  startDate!: Date;
  @Field(() => Date)
  endDate!: Date;
  @Field(() => [String])
  achievements!: [string];
}
