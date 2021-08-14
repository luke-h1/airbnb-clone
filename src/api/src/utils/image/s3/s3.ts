import 'dotenv-safe/config';

const AWS = require('aws-sdk');

export type S3Object = {
  Etag: string;
  Location: string;
  Key: string;
  Bucket: string;
};
export type UploadedFileResponse = {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
};

export const AWSCONFIG = AWS.config.update({
  signatureVersion: 's3v4',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
  Bucket: process.env.AWS_BUCKET_NAME,
});

export const S3 = new AWS.S3({
  signatureVersion: 's3v4',
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const S3DefaultParams = {
  ACL: 'public-read',
  Bucket: process.env.AWS_BUCKET_NAME,
  Conditions: [
    ['content-length-range', 0, 3096000], // 3 Mb
    { acl: 'public-read' },
  ],
};
