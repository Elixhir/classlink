import { Injectable } from '@nestjs/common'
import { GetStudentById } from '@/src/application/use-cases/student/GetStudentById'
import { StudentPrismaRepository } from '@/src/infrastructure/repositories/student'

@Injectable()
export class StudentService {
  private readonly getStudentByIdUseCase: GetStudentById

  constructor() {
    const studentRepo = new StudentPrismaRepository()
    this.getStudentByIdUseCase = new GetStudentById(studentRepo)
  }

  async getStudentById(data: { id: number }) {
    const student = await this.getStudentByIdUseCase.execute(data.id)
    if (!student) {
      return null
    }

    return {
      id: student.id,
      name: student.name,
      email: student.email,
    }
  }
}
