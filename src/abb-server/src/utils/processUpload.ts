import { createWriteStream } from 'fs';
import { nanoid } from 'nanoid';

export interface Upload {
  filename: string;
  stream: any;
  mimetype: string;
  createWriteStream: () => string;
}
// @ts-ignore
const storeUpload = async (stream, mimetype): Promise<any> => {
  const extension = mimetype.split('/')[1];
  const id = `${nanoid(10)}.${extension}`;
  const path = `images/${id}`;

  return new Promise((resolve, reject) => {
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject);
  });
};

export const processUpload = async (upload: any) => {
  const { stream, mimetype } = await upload;
  const { id } = await storeUpload(stream, mimetype);
  return id;
};
