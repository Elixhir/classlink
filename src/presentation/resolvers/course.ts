import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Course } from '@/src/domain/entities/course'
import { CoursePrismaRepository } from '@/src/infrastructure/repositories/course'
import { CreateCourse } from '@/src/application/use-cases/course/CreateCourse'
import { GetCourseById } from '@/src/application/use-cases/course/GetCourseById'
import { GetAllCourses } from '@/src/application/use-cases/course/GetAllCourses'

const courseRepo = new CoursePrismaRepository()
const createCourse = new CreateCourse(courseRepo)
const getCourseById = new GetCourseById(courseRepo)
const getAllCourses = new GetAllCourses(courseRepo)

@Resolver(() => Course)
export class CourseResolver {
  @Mutation(() => Course)
  async createCourse(@Arg('data') data: Omit<Course, 'id'>): Promise<Course> {
    return createCourse.execute(data)
  }

  @Query(() => Course, { nullable: true })
  async course(@Arg('id') id: number): Promise<Course | null> {
    return getCourseById.execute(id)
  }

  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    return getAllCourses.execute()
  }
}
