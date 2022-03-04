import { InputFile } from '../../shared/input-file';
import { lstat } from 'fs/promises';
import { promisify } from 'util';
import { formatBytes } from '../../shared/format-bytes';

const sizeOf = promisify(require('image-size'));

export const filePathsToInputFiles = async (
  filePaths: string[]
): Promise<InputFile[]> => {
  const inputFiles: InputFile[] = [];
  for (const filePath of filePaths) {
    const [dimensions, fileStat] = await Promise.all([
      sizeOf(filePath),
      lstat(filePath),
    ]);
    let fileName = filePath.split(/[\/\\]/).pop();
    const outputDirectory = filePath
      .replace(fileName, '')
      .substring(0, filePath.length - 1);
    const fileExtension = '.' + fileName.split('.').pop();
    fileName = fileName.split('.').slice(0, -1).join('.');
    const size = formatBytes(fileStat.size);
    inputFiles.push({
      filePath,
      fileName,
      fileExtension,
      size,
      outputDirectory,
      quality: 80,
      dimensions,
      newDimensions: { ...dimensions },
    });
  }
  return inputFiles;
};
