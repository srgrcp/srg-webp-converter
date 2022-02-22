import { useRecoilCallback } from "recoil";
import { webpConverter } from "../lib/webp-converter";
import { converterState } from "./state";

export const useOpenFileDialog = () => {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    const release = snapshot.retain();
    const inputFiles = await webpConverter.openFiles();
    const _converterState = await snapshot.getPromise(converterState);

    set(converterState, ({ ..._converterState, inputFiles }));
    release();
    return inputFiles.length;
  }, []);
};

export const useConvertFiles = () => {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    const release = snapshot.retain();
    const inputFilesState = await snapshot.getPromise(converterState);
    const inputFiles = inputFilesState.inputFiles;
    
    set(converterState, ({ ...inputFilesState, isConverting: true }));
    await webpConverter.convertFiles(inputFiles);
    set(converterState, ({ ...inputFilesState, isConverting: false }));

    release();
  }, []);
}

export const useSelectOutputDirectory = () => {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    const release = snapshot.retain();

    const outputDirectory = await webpConverter.selectOutputDirectory();
    const _converterState = await snapshot.getPromise(converterState);

    set(converterState, ({ ..._converterState, outputDirectory }));
    release();
    return outputDirectory;
  }, []);
}

export const useSetGlobalQuality = () => {
  return useRecoilCallback(({ set, snapshot }) => async (quality: number) => {
    const release = snapshot.retain();
    const _converterState = await snapshot.getPromise(converterState);

    set(converterState, ({ ..._converterState, globalQuality: quality }));
    release();
  }, []);
}

export const useApplyGlobalSettings = () => {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    const release = snapshot.retain();
    const _converterState = await snapshot.getPromise(converterState);

    const inputFiles = _converterState.inputFiles;
    const globalQuality = _converterState.globalQuality;
    const outputDirectory = _converterState.outputDirectory;

    const newInputFiles = inputFiles.map(inputFile => {
      return {
        ...inputFile,
        quality: globalQuality,
        outputDirectory,
      };
    });
    set(converterState, ({ ..._converterState, inputFiles: newInputFiles }));
    release();
  }, []);
}
