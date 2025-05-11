import { Enrollment } from '../entities/enrollment'

export interface EnrollmentRepository {
  enroll(studentId: number, courseId: number): Promise<Enrollment>
  findByStudentAndCourse(studentId: number, courseId: number): Promise<Enrollment | null>
  findAll(): Promise<Enrollment[]>
}
