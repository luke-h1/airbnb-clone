declare namespace NodeJS {
  interface ProcessEnv {
    TEST_DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    COOKIE_SECRET: string;
    CORS_ORIGIN: string;
    FRONTEND_HOST: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_KEY: string;
    CLOUDINARY_SECRET: string;
    MAIL_HOST: any;
    MAIL_PORT: string;
    MAIL_USER: string;
    MAIL_PASS: string;
    AWS_BUCKET_NAME: string;
    AWS_BUCKET_REGION: string;
    AWS_ACCESS_KEY: string;
    AWS_ACCESS_SECRET: string;
  }
}
