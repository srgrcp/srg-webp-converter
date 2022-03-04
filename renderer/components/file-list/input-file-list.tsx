import { Dimensions, InputFile } from "@shared/input-file";
import Image from "../image";
import InputFileRow from "./input-file-row";

export type InputFileListProps = {
  inputFiles: InputFile[];
}

/**
 * @todo Fix the issue with the image not being properly displayed when using the custom loader
 */
export default function InputFileList({ inputFiles }: InputFileListProps) {
  return (
    <div className='flex flex-col flex-grow w-full overflow-hidden bg-slate-700 rounded-lg border border-slate-600'>
      <div className="flex flex-col flex-grow w-full overflow-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-600">
        <div className="divide-y divide-slate-600">
          {inputFiles.map((inputFile) => (
            <InputFileRow key={inputFile.filePath} inputFile={inputFile} />
          ))}
        </div>
      </div>
    </div>
  );
}
