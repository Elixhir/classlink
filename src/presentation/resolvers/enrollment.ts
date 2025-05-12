import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Enrollment } from '@/src/domain/entities/enrollment'
import { EnrollmentPrismaRepository } from '@/src/infrastructure/repositories/enrollment'
import { EnrollStudent } from '@/src/application/use-cases/enrollment/EnrollStudent'
import { GetAllEnrollments } from '@/src/application/use-cases/enrollment/GetAllEnrollments'
import { GetEnrollmentByStudentAndCourse } from '@/src/application/use-cases/enrollment/GetEnrollmentByStudentAndCourse'

const enrollmentRepo = new EnrollmentPrismaRepository()
const enrollStudent = new EnrollStudent(enrollmentRepo)
const getAllEnrollments = new GetAllEnrollments(enrollmentRepo)
const getEnrollmentByStudentAndCourse = new GetEnrollmentByStudentAndCourse(enrollmentRepo)

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  @Mutation(() => Enrollment)
  async enroll(
    @Arg('studentId') studentId: number,
    @Arg('courseId') courseId: number
  ): Promise<Enrollment> {
    return enrollStudent.execute(studentId, courseId)
  }

  @Query(() => Enrollment, { nullable: true })
  async enrollment(
    @Arg('studentId') studentId: number,
    @Arg('courseId') courseId: number
  ): Promise<Enrollment | null> {
    return getEnrollmentByStudentAndCourse.execute(studentId, courseId)
  }

  @Query(() => [Enrollment])
  async enrollments(): Promise<Enrollment[]> {
    return getAllEnrollments.execute()
  }
}
