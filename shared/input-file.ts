export type InputFile = {
  filePath: string;
  fileName: string;
  fileExtension: string;
  size: string;
  quality?: number;
  outputDirectory?: string;
  dimensions: Dimensions;
  newDimensions: Dimensions;
};

export type Dimensions = {
  width: number;
  height: number;
};
