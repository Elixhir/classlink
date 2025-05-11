import { Course } from '../entities/course'

export interface CourseRepository {
  create(course: Omit<Course, 'id'>): Promise<Course>
  findById(id: number): Promise<Course | null>
  findAll(): Promise<Course[]>
}
