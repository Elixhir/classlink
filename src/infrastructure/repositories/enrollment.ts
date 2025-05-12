import { PrismaClient } from '@prisma/client'
import { EnrollmentRepository } from '@/src/domain/repositories/enrollment'
import { Enrollment } from '@/src/domain/entities/enrollment'

const prisma = new PrismaClient()

export class EnrollmentPrismaRepository implements EnrollmentRepository {

  async enroll(studentId: number, courseId: number): Promise<Enrollment> {
    return await prisma.enrollment.create({
      data: {
        studentId,
        courseId
      }
    })
  }

  async findByStudentAndCourse(studentId: number, courseId: number): Promise<Enrollment | null> {
    return await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId
        }
      }
    })
  }

  async findAll(): Promise<Enrollment[]> {
    return await prisma.enrollment.findMany()
  }
}
