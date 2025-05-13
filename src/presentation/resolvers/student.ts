import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Student } from '@/src/domain/entities/student'
import { StudentPrismaRepository } from '@/src/infrastructure/repositories/student'
import { CreateStudent } from '@/src/application/use-cases/student/CreateStudent'
import { GetStudentById } from '@/src/application/use-cases/student/GetStudentById'
import { GetAllStudents } from '@/src/application/use-cases/student/GetAllStudents'
import { CreateStudentInput } from '@/src/presentation/inputs/student'

const studentRepo = new StudentPrismaRepository()
const createStudent = new CreateStudent(studentRepo)
const getStudentById = new GetStudentById(studentRepo)
const getAllStudents = new GetAllStudents(studentRepo)

@Resolver(() => Student)
export class StudentResolver {
  @Mutation(() => Student)
  async createStudent(@Args('data') data: CreateStudentInput): Promise<Student> {
    const studentData = await createStudent.execute(data)
    return new Student(studentData)
  }

  @Query(() => Student, { nullable: true })
  async student(@Args('id') id: number): Promise<Student | null> {
    const student = await getStudentById.execute(id)
    return student ? new Student(student) : null
  }

  @Query(() => [Student])
  async students(): Promise<Student[]> {
    const all = await getAllStudents.execute()
    return all.map((s) => new Student(s))
  }
}
