import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateStudentInput {
  @Field()
  name: string

  @Field()
  email: string
}
