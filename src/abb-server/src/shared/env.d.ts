declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    COOKIE_SECRET: string;
    CORS_ORIGIN: string;
    FRONTEND_HOST: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    MAIL_USERNAME: string;
    MAIL_PASSWORD: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_ACCESS_KEY_SECRET: string;
    AWS_BUCKET_REGION: string;
  }
}
