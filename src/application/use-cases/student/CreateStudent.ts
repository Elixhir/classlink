import { StudentRepository } from '@/src/domain/repositories/student'
import { Student } from '@/src/domain/entities/student'

export class CreateStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute(data: Omit<Student, 'id'>): Promise<Student> {
    return this.studentRepository.create(data)
  }
}
