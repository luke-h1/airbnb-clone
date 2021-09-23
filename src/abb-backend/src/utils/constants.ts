export namespace constants {
  export const isProd = process.env.NODE_ENV === 'production';
  export const COOKIE_NAME = 'connect.sid';
  export const FORGET_PASSWORD_PREFIX = 'forget-password:';
  export const redisSessionPrefix = 'sess:';
  export const userSessionIdPrefix = 'userSids:';
  export const S3UserImageKey = 'abb-userImages';
  export const S3PropertyImageKey = 'abb-propertyImages';
}
