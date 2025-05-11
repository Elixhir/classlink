import { PrismaClient } from '@prisma/client'
import { CourseRepository } from '@/src/domain/repositories/course'
import { Course } from '@/src/domain/entities/course'

const prisma = new PrismaClient()

export class CoursePrismaRepository implements CourseRepository {
  async create(data: Omit<Course, 'id'>): Promise<Course> {
    return await prisma.course.create({ data })
  }

  async findById(id: number): Promise<Course | null> {
    return await prisma.course.findUnique({ where: { id } })
  }

  async findAll(): Promise<Course[]> {
    return await prisma.course.findMany()
  }
}

