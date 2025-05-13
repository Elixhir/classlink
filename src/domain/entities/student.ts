import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Student {
  @Field(() => ID)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  constructor(student: { id: number; name: string; email: string }) {
    this.id = student.id
    this.name = student.name
    this.email = student.email
  }
}
