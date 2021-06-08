import AWS from 'aws-sdk';
import fs from 'fs';
import 'dotenv-safe/config';

/*
enum Visibility {
    public
    private
}

input S3ObjectInput {
    bucket: String!
    region: String!
    localUri: String
    visibility: Visibility
    key: String
    mimeType: String
}

type S3Object {
    bucket: String!
    region: String!
    key: String!
}
*/

export const S3 = new AWS.S3({
  signatureVersion: 's3v4',
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
});

async function getSignedUrl(key: string) {
  return new Promise((resolve, reject) => {
    const params = { Bucket: process.env.AWS_ACCESS_KEY, Key: key };
    S3.getSignedUrl('getObject', params, (err, url) => {
      if (err) reject(err);
      resolve(url);
    });
  });
}

// eslint-disable-next-line consistent-return
export const uploadFile = async (file: any) => {
  const fileStream = fs.createReadStream(file.path);
  let params;
  const fileName = `abb-${Date.now()}.jpg`;
  params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
  };
  try {
    S3.upload(params, (e: any, _: any) => {
      if (e) {
        console.log(e);
        throw new Error(e);
      }
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Expires: 60,
      };
    }).promise();
    const URL = await getSignedUrl(fileName);
    console.log('URL', URL);
    return URL;
  } catch (e) {
    console.error(e);
  }
};
export const getFileStream = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME,
  };
  // @ts-ignore
  return S3.getObject(downloadParams).createReadStream() as string;
};
