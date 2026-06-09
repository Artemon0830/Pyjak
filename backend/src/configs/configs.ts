
import { ObjectCannedACL } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
interface Dict<T> {
    [key: string]: T ;
}

const env = process.env as Dict<string>;

export const configs={
    APP_HOST:env.APP_HOST,
    APP_PORT:Number(env.APP_PORT)||3001,
    MONGO_DB:env.MONGO_DB,

    JWT_ACCESS_SECRET:env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRATION:env.JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_SECRET:env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION:env.JWT_REFRESH_EXPIRATION,

    AWS_ACCESS_KEY:env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY:env.AWS_SECRET_KEY,
    AWS_S3_BUCKET_NAME:env.AWS_S3_BUCKET_NAME,
    AWS_S3_REGION:env.AWS_S3_REGION,
    AWS_S3_ACL:env.AWS_S3_ACL as ObjectCannedACL,
    AWS_S3_ENDPOINT:env.AWS_S3_ENDPOINT

}
