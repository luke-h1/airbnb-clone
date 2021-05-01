import { nanoid } from 'nanoid';
import { createWriteStream } from 'fs';

const storeUpload = async (stream: any, mimetype: string): Promise<any> => {
  const extension = mimetype.split('/')[1];
  const id = `${nanoid()}.${extension}`;
  const path = `images/${id}`;

  return new Promise((resolve, reject) => stream
    .pipe(createWriteStream(path))
    .on('finish', () => resolve({ id, path }))
    .on('error', reject));
};

export const processUpload = async (upload: any) => {
  const { stream, mimetype } = await upload;
  const { id } = await storeUpload(stream, mimetype);
  return id;
};
