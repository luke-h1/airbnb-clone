import { ReadStream } from 'fs';
import { v4 } from 'uuid';
import { S3Object } from '../../../interfaces/s3';
import { S3, S3DefaultParams } from './s3';

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
