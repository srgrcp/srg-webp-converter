import { InputFile } from "@shared/input-file";
import Image from "./image";

/**
 * @todo Fix the issue with the image not being properly displayed when using the custom loader
 */
export default function InputFileList({ inputFiles }: { inputFiles: InputFile[] }) {
  return (
    <div className='flex flex-col flex-grow w-full overflow-hidden bg-slate-700 rounded-lg shadow-md shadow-slate-400/50'>
      <div className="flex flex-col flex-grow w-full overflow-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-600">
        <div className="divide-y divide-slate-600">
          {inputFiles.map((inputFile) => (
            <div className="w-full flex hover:bg-slate-800" key={inputFile.filePath}>
              <div className="flex w-14 h-14 justify-center items-center">
                <div className="w-10 h-10 rounded-md overflow-hidden">
                  <img
                    className="object-cover min-h-full min-w-full"
                    src={inputFile.filePath}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-grow justify-center">
                <p className="font-bold text-slate-300 w-11/12 truncate">{inputFile.fileName}{inputFile.fileExtension}</p>
                <p className="text-slate-500 text-sm w-11/12">{inputFile.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
