import { CourseRepository } from '@/src/domain/repositories/course'
import { Course } from '@/src/domain/entities/course'

export class GetAllCourses {
  constructor(private courseRepository: CourseRepository) {}

  async execute(): Promise<Course[]> {
    return this.courseRepository.findAll()
  }
}
