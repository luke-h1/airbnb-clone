declare namespace NodeJS {
  interface ProcessEnv {
    TEST_DATABASE_URL: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    FRONTEND_HOST: string;
    TEST_HOST: string;
  }
}
