import { InputFile } from '@shared/input-file';

export type WebpConverter = {
  openFiles(): Promise<InputFile[]>;
  convertFiles(inputFiles: InputFile[]): Promise<void>;
  selectOutputDirectory(): Promise<string>;
  getInputFiles(filePaths: string[]): Promise<InputFile[]>;
};

const webpConverterMock: WebpConverter = {
  openFiles: () => Promise.resolve([]),
  convertFiles: () => Promise.resolve(),
  selectOutputDirectory: () => Promise.resolve(''),
  getInputFiles: () => Promise.resolve([]),
};

const isBuilding = typeof window === 'undefined';

export const webpConverter: WebpConverter = isBuilding
  ? webpConverterMock
  : window.webpConverter;
