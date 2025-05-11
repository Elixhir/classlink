import { StudentRepository } from '@/src/domain/repositories/student'
import { Student } from '@/src/domain/entities/student'

export class GetStudentById {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: number): Promise<Student | null> {
    return this.studentRepository.findById(id)
  }
}
