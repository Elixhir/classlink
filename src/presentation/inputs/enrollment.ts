import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class EnrollInput {
  @Field(() => Int)
  studentId: number

  @Field(() => Int)
  courseId: number
}
