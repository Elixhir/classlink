import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Course {
  @Field(() => ID)
  id: number

  @Field()
  title: string

  @Field()
  code: string

  constructor(partial: Partial<Course>) {
    Object.assign(this, partial)
  }
}

