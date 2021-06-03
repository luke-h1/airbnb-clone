import { nanoid } from 'nanoid';
import { createWriteStream } from 'fs';

const storeUpload = async (stream: any, mimetype: string): Promise<any> => {
  // aseq2
  console.log('stream', stream);
  console.log('mimetype', mimetype);
  console.log('I break here :)');
  const extension = mimetype.split('/')[1];
  console.log('extension', extension);
  const id = `${nanoid(10)}.${extension}`;
  console.log(id);
  const path = `images/${id}`;

  return new Promise((resolve, reject) => stream
    .pipe(createWriteStream(path))
    .on('finish', () => resolve({ id, path }))
    .on('error', reject));
};

export const processUpload = async (upload: any) => {
  const { stream, mimetype } = await upload;
  console.log('stream, mimetype', stream, mimetype);
  const { id } = await storeUpload(stream, mimetype);
  console.log('id', id);
  return id;
};
