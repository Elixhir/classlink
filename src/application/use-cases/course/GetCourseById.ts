import { CourseRepository } from '@/src/domain/repositories/course'
import { Course } from '@/src/domain/entities/course'

export class GetCourseById {
  constructor(private courseRepository: CourseRepository) {}

  async execute(id: number): Promise<Course | null> {
    return this.courseRepository.findById(id)
  }
}
