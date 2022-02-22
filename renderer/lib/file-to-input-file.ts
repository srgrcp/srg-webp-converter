import { InputFile } from "@shared/input-file";
import { formatBytes } from "./format-bytes";

export function toInputFile(file: File): InputFile {
  const filePath = file.path;
  let fileName = filePath.split(/[\/\\]/).pop();
  const outputDirectory = filePath.replace(fileName, '').substring(0, filePath.length - 1);
  const fileExtension = '.' + fileName.split('.').pop();
  fileName = fileName.split('.').slice(0, -1).join('.');
  const size = formatBytes(file.size);
  return {
    filePath,
    fileName,
    fileExtension,
    size,
    outputDirectory,
    quality: 80,
  };
}
