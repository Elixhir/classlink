import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Course } from '@/src/domain/entities/course'
import { CoursePrismaRepository } from '@/src/infrastructure/repositories/course'
import { CreateCourse } from '@/src/application/use-cases/course/CreateCourse'
import { GetCourseById } from '@/src/application/use-cases/course/GetCourseById'
import { GetAllCourses } from '@/src/application/use-cases/course/GetAllCourses'
import { CreateCourseInput } from '@/src/presentation/inputs/course'

const courseRepo = new CoursePrismaRepository()
const createCourse = new CreateCourse(courseRepo)
const getCourseById = new GetCourseById(courseRepo)
const getAllCourses = new GetAllCourses(courseRepo)

@Resolver(() => Course)
export class CourseResolver {
  @Mutation(() => Course)
  async createCourse(
    @Args('data') data: CreateCourseInput,
  ): Promise<Course> {
    const result = await createCourse.execute(data)
    return new Course(result)
  }

  @Query(() => Course, { nullable: true })
  async course(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Course | null> {
    const result = await getCourseById.execute(id)
    return result ? new Course(result) : null
  }

  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    const result = await getAllCourses.execute()
    return result.map(course => new Course(course))
  }
}
