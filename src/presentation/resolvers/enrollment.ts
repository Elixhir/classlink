import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
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
    @Args('studentId', { type: () => Int }) studentId: number,
    @Args('courseId', { type: () => Int }) courseId: number,
  ): Promise<Enrollment> {
    const enrollmentData = await enrollStudent.execute(studentId, courseId)
    return new Enrollment(enrollmentData)
  }

  @Query(() => Enrollment, { nullable: true })
  async enrollment(
    @Args('studentId', { type: () => Int }) studentId: number,
    @Args('courseId', { type: () => Int }) courseId: number,
  ): Promise<Enrollment | null> {
    const enrollment = await getEnrollmentByStudentAndCourse.execute(studentId, courseId)
    return enrollment ? new Enrollment(enrollment) : null
  }

  @Query(() => [Enrollment])
  async enrollments(): Promise<Enrollment[]> {
    const all = await getAllEnrollments.execute()
    return all.map((e) => new Enrollment(e))
  }
}
