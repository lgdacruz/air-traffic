import { Module, Global } from '@nestjs/common';
import * as dynamoose from 'dynamoose';

@Global()
@Module({
  providers: [
    {
      provide: 'DYNAMOOSE',
      useFactory: () => {
        const ddb = new dynamoose.aws.ddb.DynamoDB({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
          region: process.env.AWS_REGION!,
        });
        // Definir a instância do DynamoDB para o Dynamoose
        dynamoose.aws.ddb.set(ddb);
        return dynamoose;
      },
    },
  ],
  exports: ['DYNAMOOSE'],
})
export class DynamooseModule {}
