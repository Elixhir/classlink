import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { StudentService } from '@/src/infrastructure/adapters/student.service'

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @GrpcMethod('StudentService', 'GetStudentById')
    async getStudentById(data: { id: number }) {
    return this.studentService.getStudentById({ id: data.id })
}
}
