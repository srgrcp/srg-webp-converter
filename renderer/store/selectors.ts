import { selector } from "recoil";
import { converterState } from "./state";

export const selectAllInputFiles = selector({
  key: "selectAllInputFiles",
  get: ({ get }) => {
    return get(converterState).inputFiles;
  },
});

export const selectInputFilesLength = selector({
  key: "selectInputFilesLength",
  get: ({ get }) => {
    return get(converterState).inputFiles.length;
  },
});

export const selectOutputDirectory = selector({
  key: "selectOutputDirectory",
  get: ({ get }) => {
    return get(converterState).outputDirectory;
  },
});

export const selectGlobalQuality = selector({
  key: "selectGlobalQuality",
  get: ({ get }) => {
    return get(converterState).globalQuality;
  },
});

export const selectIsConverting = selector({
  key: "selectIsConverting",
  get: ({ get }) => {
    return get(converterState).isConverting;
  },
});
