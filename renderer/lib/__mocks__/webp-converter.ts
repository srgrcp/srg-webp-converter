import { InputFile } from "@shared/input-file";
import { WebpConverter } from "../webp-converter";

export const webpConverter: WebpConverter = {
  openFiles: () => Promise.resolve<InputFile[]>([
    {
      fileName: "test",
      fileExtension: ".png",
      filePath: "test.png",
      size: '1 MB',
    }
  ]),
  convertFiles: () => Promise.resolve(),
  selectOutputDirectory: () => Promise.resolve('path/to/output/directory'),
}
