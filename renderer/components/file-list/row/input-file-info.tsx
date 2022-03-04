import { InputFile } from '@shared/input-file'
import React from 'react'

export type InputFileInfoProps = {
  inputFile: InputFile
  setIsExpanded: (setter: (isExpanded: boolean) => boolean) => void
}

export default function InputFileInfo({ inputFile, setIsExpanded }: InputFileInfoProps) {
  return (
    <div
      className='w-full flex hover:bg-slate-800 cursor-pointer'
      onClick={() => setIsExpanded(wasExpanded => !wasExpanded)}
    >
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
        <div className="flex justify-start">
          <span className="text-slate-400 text-sm flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            {inputFile.size}
          </span>
          <span className="text-slate-400 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {inputFile.dimensions.width}x{inputFile.dimensions.height}
          </span>
        </div>
      </div>
    </div>
  )
}
