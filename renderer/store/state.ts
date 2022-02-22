import { InputFile } from "@shared/input-file";
import { atom, useRecoilValue } from "recoil";
import { useSetGlobalQuality } from "./callbacks";
import { selectGlobalQuality } from "./selectors";

export type ConverterState = {
  inputFiles: InputFile[];
  outputDirectory: string;
  globalQuality: number;
  isConverting: boolean;
}

export const converterState = atom<ConverterState>({
  key: "converterState",
  default: {
    inputFiles: [],
    outputDirectory: '',
    globalQuality: 80,
    isConverting: false,
  },
});

export const useGlobalQuality = (): [number, (quality: number) => Promise<void>] => {
  return [useRecoilValue(selectGlobalQuality), useSetGlobalQuality()];
}
