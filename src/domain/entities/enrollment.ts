import { ObjectType, Field, ID, Int } from '@nestjs/graphql'

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: number

  @Field(() => Int)
  studentId: number

  @Field(() => Int)
  courseId: number

  constructor(enrollment: { id: number; studentId: number; courseId: number }) {
    this.id = enrollment.id
    this.studentId = enrollment.studentId
    this.courseId = enrollment.courseId
  }
}
