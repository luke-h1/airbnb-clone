import { ReadStream } from 'fs';
import { v4 } from 'uuid';
import AWS from 'aws-sdk';
import { S3Object } from '../../../interfaces/s3';
import { S3, S3DefaultParams } from './s3';

const s3 = new AWS.S3({
  signatureVersion: 's3v4',
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const Upload = async (
  createReadStream: () => ReadStream,
  filename: string,
  key: string,
) => new Promise<string>((res, rej) => {
  S3.upload(
    {
      ...S3DefaultParams,
      Body: createReadStream(),
      Key: `${key}/${filename}-${v4()}`,
      Bucket: process.env.AWS_BUCKET_NAME,
    },
    // eslint-disable-next-line consistent-return
    (e: unknown, data: S3Object) => {
      if (e) {
        rej(e);
        console.log(e);
        return e;
      }
      console.log('✅ uploaded file', data);
      res(data.Location);
      return data.Location;
    },
  );
});

export const Delete = async (Key: string) => {
  const params = { Bucket: process.env.AWS_BUCKET_NAME, Key };
  return new Promise((res, rej) => {
    s3.deleteObject(params, (e, data) => {
      if (e) {
        console.log(e, e.stack);
        rej(e);
        return false;
      }
      console.log(data);
      res(data);
      return true;
    });
  });
};
