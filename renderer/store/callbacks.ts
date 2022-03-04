import { Dimensions, InputFile } from '@shared/input-file';
import { useRecoilCallback } from 'recoil';
import { webpConverter } from '../lib/webp-converter';
import { converterState } from './state';

export const useOpenFileDialog = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const release = snapshot.retain();
        const inputFiles = await webpConverter.openFiles();
        const _converterState = await snapshot.getPromise(converterState);

        set(converterState, { ..._converterState, inputFiles });
        release();
        return inputFiles.length;
      },
    []
  );
};

export const useGetInputFiles = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (filePaths: string[]) => {
        const release = snapshot.retain();
        const inputFiles = await webpConverter.getInputFiles(filePaths);
        const _converterState = await snapshot.getPromise(converterState);

        set(converterState, { ..._converterState, inputFiles });
        release();
        return inputFiles;
      },
    []
  );
};

export const useSetInputFiles = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (inputFiles: InputFile[]) => {
        const release = snapshot.retain();
        const _converterState = await snapshot.getPromise(converterState);

        set(converterState, { ..._converterState, inputFiles });
        release();
        return inputFiles.length;
      },
    []
  );
};

export const useConvertFiles = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const release = snapshot.retain();
        const inputFilesState = await snapshot.getPromise(converterState);
        const inputFiles = inputFilesState.inputFiles;

        set(converterState, { ...inputFilesState, isConverting: true });
        await webpConverter.convertFiles(inputFiles);
        set(converterState, { ...inputFilesState, isConverting: false });

        release();
      },
    []
  );
};

export const useSelectOutputDirectory = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const release = snapshot.retain();

        const outputDirectory = await webpConverter.selectOutputDirectory();
        const _converterState = await snapshot.getPromise(converterState);

        set(converterState, { ..._converterState, outputDirectory });
        release();
        return outputDirectory;
      },
    []
  );
};

export const useSetGlobalQuality = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (quality: number) => {
        const release = snapshot.retain();
        const _converterState = await snapshot.getPromise(converterState);

        set(converterState, { ..._converterState, globalQuality: quality });
        release();
      },
    []
  );
};

export const useApplyGlobalSettings = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const release = snapshot.retain();
        const _converterState = await snapshot.getPromise(converterState);

        const inputFiles = _converterState.inputFiles;
        const globalQuality = _converterState.globalQuality;
        const outputDirectory = _converterState.outputDirectory;

        const newInputFiles = inputFiles.map((inputFile) => {
          return {
            ...inputFile,
            quality: globalQuality,
            outputDirectory,
          };
        });
        set(converterState, { ..._converterState, inputFiles: newInputFiles });
        release();
      },
    []
  );
};

export const useSetImageQuality = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (image: InputFile, quality: number) => {
        const release = snapshot.retain();
        const _converterState = await snapshot.getPromise(converterState);

        const inputFiles = _converterState.inputFiles;
        const newInputFiles = inputFiles.map((inputFile, i) => {
          if (inputFile.filePath === image.filePath) {
            return {
              ...inputFile,
              quality,
            };
          }
          return inputFile;
        });
        set(converterState, { ..._converterState, inputFiles: newInputFiles });
        release();
      },
    []
  );
};

export const useSetImageOutputDirectory = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (image: InputFile) => {
        const release = snapshot.retain();
        const _converterState = await snapshot.getPromise(converterState);

        const outputDirectory = await webpConverter.selectOutputDirectory();
        const inputFiles = _converterState.inputFiles;
        const newInputFiles = inputFiles.map((inputFile, i) => {
          if (inputFile.filePath === image.filePath) {
            return {
              ...inputFile,
              outputDirectory,
            };
          }
          return inputFile;
        });
        set(converterState, { ..._converterState, inputFiles: newInputFiles });
        release();
      },
    []
  );
};

export const useSetImageDimensions = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (image: InputFile, newDimensions: Dimensions) => {
        const release = snapshot.retain();
        const _converterState = await snapshot.getPromise(converterState);

        const inputFiles = _converterState.inputFiles;
        const newInputFiles = inputFiles.map((inputFile, i) => {
          if (inputFile.filePath === image.filePath) {
            return {
              ...inputFile,
              newDimensions,
            };
          }
          return inputFile;
        });
        set(converterState, { ..._converterState, inputFiles: newInputFiles });
        release();
      },
    []
  );
};

export const useSetImageWidth = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (
        image: InputFile,
        width: number,
        { keepAspectRatio }: { keepAspectRatio: boolean }
      ) => {
        const release = snapshot.retain();
        const _converterState = await snapshot.getPromise(converterState);

        const newDimensions: Dimensions = {
          width,
          height: image.newDimensions.height,
        };
        if (keepAspectRatio) {
          newDimensions.height = Math.round(
            (newDimensions.width / image.dimensions.width) *
              image.dimensions.height
          );
        }

        const inputFiles = _converterState.inputFiles;
        const newInputFiles = inputFiles.map((inputFile, i) => {
          if (inputFile.filePath === image.filePath) {
            return {
              ...inputFile,
              newDimensions,
            };
          }
          return inputFile;
        });
        set(converterState, { ..._converterState, inputFiles: newInputFiles });
        release();
      },
    []
  );
};

export const useSetImageHeight = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      async (
        image: InputFile,
        height: number,
        { keepAspectRatio }: { keepAspectRatio: boolean }
      ) => {
        const release = snapshot.retain();
        const _converterState = await snapshot.getPromise(converterState);

        const newDimensions: Dimensions = {
          width: image.newDimensions.width,
          height,
        };
        if (keepAspectRatio) {
          newDimensions.width = Math.round(
            (newDimensions.height / image.dimensions.height) *
              image.dimensions.width
          );
        }

        const inputFiles = _converterState.inputFiles;
        const newInputFiles = inputFiles.map((inputFile, i) => {
          if (inputFile.filePath === image.filePath) {
            return {
              ...inputFile,
              newDimensions,
            };
          }
          return inputFile;
        });
        set(converterState, { ..._converterState, inputFiles: newInputFiles });
        release();
      },
    []
  );
};
