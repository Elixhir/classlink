import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { CourseResolver } from '@/src/presentation/resolvers/course';
import { StudentResolver } from '@/src/presentation/resolvers/student';
import { EnrollmentResolver } from '@/src/presentation/resolvers/enrollment';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),

    ClientsModule.register([
      {
        name: 'STUDENT_SERVICE', 
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000', 
          package: 'student', 
          protoPath: join(process.cwd(), 'proto', 'student.proto'),
        },
      },
    ]),
  ],
  providers: [CourseResolver, StudentResolver, EnrollmentResolver],
})
export class AppModule {}
