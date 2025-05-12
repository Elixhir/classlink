import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Student } from '@/src/domain/entities/student'
import { StudentPrismaRepository } from '@/src/infrastructure/repositories/student'
import { CreateStudent } from '@/src/application/use-cases/student/CreateStudent'
import { GetStudentById } from '@/src/application/use-cases/student/GetStudentById'
import { GetAllStudents } from '@/src/application/use-cases/student/GetAllStudents'

const studentRepo = new StudentPrismaRepository()
const createStudent = new CreateStudent(studentRepo)
const getStudentById = new GetStudentById(studentRepo)
const getAllStudents = new GetAllStudents(studentRepo)

@Resolver(() => Student)
export class StudentResolver {
  @Mutation(() => Student)
  async createStudent(@Arg('data') data: Omit<Student, 'id'>): Promise<Student> {
    return createStudent.execute(data)
  }

  @Query(() => Student, { nullable: true })
  async student(@Arg('id') id: number): Promise<Student | null> {
    return getStudentById.execute(id)
  }

  @Query(() => [Student])
  async students(): Promise<Student[]> {
    return getAllStudents.execute()
  }
}
