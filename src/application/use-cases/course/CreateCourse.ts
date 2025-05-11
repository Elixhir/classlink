import { CourseRepository } from '@/src/domain/repositories/course'
import { Course } from '@/src/domain/entities/course'

export class CreateCourse {
  constructor(private courseRepository: CourseRepository) {}

  async execute(data: Omit<Course, 'id'>): Promise<Course> {
    return this.courseRepository.create(data)
  }
}
