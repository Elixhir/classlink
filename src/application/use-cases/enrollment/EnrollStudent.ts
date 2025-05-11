import { EnrollmentRepository } from '@/src/domain/repositories/enrollment'
import { Enrollment } from '@/src/domain/entities/enrollment'

export class EnrollStudent {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(studentId: number, courseId: number): Promise<Enrollment> {
    return this.enrollmentRepository.enroll(studentId, courseId)
  }
}
