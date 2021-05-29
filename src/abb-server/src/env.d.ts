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
  }
}
