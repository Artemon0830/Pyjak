declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB: string;
      APP_PORT: number;
      APP_HOST: string;


    JWT_ACCESS_SECRET:string;
    JWT_REFRESH_SECRET:string;
    JWT_ACCESS_EXPIRATION:string;
    JWT_REFRESH_EXPIRATION:string;

    
    MINIO_ACCESS_KEY:string;
    MINIO_SECRET_KEY:string;
    MINIO_BUCKET_NAME:string;
    MINIO_ENDPOINT:string;
    MINIO_PORT:number;
    }
  }
}

export {};