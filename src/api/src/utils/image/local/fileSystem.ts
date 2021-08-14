import { v4 } from 'uuid';
import fs, { ReadStream } from 'fs';
import { projectRoot } from '../../../config';

/*
Credit: https://github.com/withspectrum/spectrum/blob/alpha/api/utils/file-system.js
*/

const STORAGE_DIR = `${projectRoot}/uploads`;
const RR_MODE = 0o777;

const dirExists = (path: string): Promise<boolean> => new Promise((res) => fs.access(path, fs.constants.F_OK, (err) => res(!err)));

const createUploadsDir = (path: string): Promise<void> => new Promise((res) => fs.mkdir(path, RR_MODE, (err) => {
  if (err) throw new Error(err as any);
  res();
}));

export const localImageUpload = async (
  createReadStream: () => ReadStream,
  filename: string,
) => {
  if (!(await dirExists(STORAGE_DIR))) {
    await createUploadsDir(STORAGE_DIR);
  }
  const stream = createReadStream();
  const filePath = `${v4()}-${filename}`;
  stream.pipe(fs.createWriteStream(`${STORAGE_DIR}/${filePath}`));
  stream.on('end', () => {
    let url: string = '';
    url = encodeURI(`${STORAGE_DIR}/${filePath}`);
    return url;
  });
};
