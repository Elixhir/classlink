import { StudentRepository } from '@/src/domain/repositories/student'
import { Student } from '@/src/domain/entities/student'

export class GetAllStudents {
  constructor(private studentRepository: StudentRepository) {}

  async execute(): Promise<Student[]> {
    return this.studentRepository.findAll()
  }
}
