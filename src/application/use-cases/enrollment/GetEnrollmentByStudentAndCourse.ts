import { EnrollmentRepository } from '@/src/domain/repositories/enrollment'
import { Enrollment } from '@/src/domain/entities/enrollment'

export class GetEnrollmentByStudentAndCourse {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(studentId: number, courseId: number): Promise<Enrollment | null> {
    return this.enrollmentRepository.findByStudentAndCourse(studentId, courseId)
  }
}
