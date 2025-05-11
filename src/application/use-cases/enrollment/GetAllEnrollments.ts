import { EnrollmentRepository } from '@/src/domain/repositories/enrollment'
import { Enrollment } from '@/src/domain/entities/enrollment'

export class GetAllEnrollments {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(): Promise<Enrollment[]> {
    return this.enrollmentRepository.findAll()
  }
}
