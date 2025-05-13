import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { CourseResolver } from '@/src/presentation/resolvers/course'
import { StudentResolver } from '@/src/presentation/resolvers/student'
import { EnrollmentResolver } from '@/src/presentation/resolvers/enrollment'


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
  ],
  providers: [CourseResolver, StudentResolver, EnrollmentResolver],
})
export class AppModule {}
