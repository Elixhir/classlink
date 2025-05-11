import { PrismaClient } from '@prisma/client'
import { StudentRepository } from '@/src/domain/repositories/student'
import { Student } from '@/src/domain/entities/student'

const prisma = new PrismaClient()

export class StudentPrismaRepository implements StudentRepository {
  async create(data: Omit<Student, 'id'>): Promise<Student> {
    return await prisma.student.create({ data })
  }

  async findById(id: number): Promise<Student | null> {
    return await prisma.student.findUnique({ where: { id } })
  }

  async findAll(): Promise<Student[]> {
    return await prisma.student.findMany()
  }
}
