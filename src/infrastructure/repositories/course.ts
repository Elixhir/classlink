import { PrismaClient } from '@prisma/client'
import { CourseRepository } from '@/src/domain/repositories/course'
import { Course } from '@/src/domain/entities/course'

const prisma = new PrismaClient()

export class CoursePrismaRepository implements CourseRepository {

  async create(data: Omit<Course, 'id'>): Promise<Course> {
    const createdCourse = await prisma.course.create({ data })
    return new Course(createdCourse)
  }

  async findById(id: number): Promise<Course | null> {
    const course = await prisma.course.findUnique({ where: { id } })
    if (!course) return null;
    return new Course(course)
  }

  async findAll(): Promise<Course[]> {
    const courses = await prisma.course.findMany()
    return courses.map(course => new Course(course))
  }
}
