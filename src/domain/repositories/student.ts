import { Student } from '../entities/student'

export interface StudentRepository {
  create(student: Omit<Student, 'id'>): Promise<Student>
  findById(id: number): Promise<Student | null>
  findAll(): Promise<Student[]>
}
