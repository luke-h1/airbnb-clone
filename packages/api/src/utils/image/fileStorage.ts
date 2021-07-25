const { FILE_STROAGE } = process.env;

const getUploadImageFn = () => {
  switch (FILE_STROAGE) {
    case 'local':
      return require('./local/fileSystem').localImageUpload;

    case 's3':
    default:
      return require('./s3/upload').Upload;
  }
};
