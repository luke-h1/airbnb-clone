import 'dotenv-safe/config';
import { v4 } from 'uuid';

const AWS = require('aws-sdk');

// set public access to s3 bucket to true (for now)

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

// actual upload to s3 happens here
export const handleFileUpload = async (file: any) => {
  console.log(file);
  console.log('typeof file', typeof file);
  const { createReadStream, filename } = await file;

  const key = v4();

  return new Promise((resolve, reject) => {
    S3.upload(
      {
        ...S3DefaultParams,
        Body: createReadStream(),
        Key: `${key}/${filename}`,
        Bucket: process.env.AWS_BUCKET_NAME,
      },
      (e, data) => {
        console.log(e);
        console.log(data);
        if (e) {
          console.log('error uploading...', e);
          reject(e);
        } else {
          console.log('successfully uploaded file...', data);
          resolve(data);
        }
      },
    );
  });
};
