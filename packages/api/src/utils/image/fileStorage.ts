import { ReadStream } from 'fs';

const { FILE_STROAGE } = process.env;

/*
Credit: https://github.com/withspectrum/spectrum/blob/alpha/api/utils/file-system.js
*/

const getUploadImageFn = () => {
  switch (FILE_STROAGE) {
    case 'local':
      return require('./local/fileSystem').localImageUpload;

    case 's3':
    default:
      return require('./s3/upload').Upload;
  }
};

const uploadImageFn = getUploadImageFn();

export const uploadImage = async (
  createReadStream: () => ReadStream,
  filename: string,
  key?: string,
) => {
  uploadImageFn(createReadStream, filename, key);
};
