import { InputFile } from '@shared/input-file'
import React, { useState } from 'react'
import Input from '../../input'

export type InputFileSettingsProps = {
  inputFile: InputFile
  isExpanded: boolean
  setImageQuality: (image: InputFile, quality: number) => void
  setImageOutputDirectory: (image: InputFile) => void
  setImageWidth: (image: InputFile, width: number, { keepAspectRatio }: { keepAspectRatio: boolean }) => void
  setImageHeight: (image: InputFile, height: number, { keepAspectRatio }: { keepAspectRatio: boolean }) => void
}

export default function InputFileSettings({ inputFile, isExpanded, setImageQuality, setImageOutputDirectory, setImageWidth, setImageHeight }: InputFileSettingsProps) {
  const [keepAspectRatio, setKeepAspectRatio] = useState(true)

  return (
    <div className={'w-full text-slate-300 p-4 ' + (isExpanded ? 'flex' : 'hidden')}>
      <div className='w-full flex flex-wrap bg-slate-800/50 p-4 rounded-md'>
        <div className='flex flex-col flex-grow mb-4 mx-2'>
          <label className='text-sm pl-2 mb-1' htmlFor="quality">Quality</label>
          <Input
            type="number" id='quality'
            value={inputFile.quality}
            onChange={(e) => setImageQuality(inputFile, parseInt(e.target.value || '0'))}
          />
        </div>
        <div className='flex flex-col mb-4 mx-2'>
          <label className='text-sm pl-2 mb-1' htmlFor="resize">Resize</label>
          <div className='flex flex-nowrap items-center'>
            <Input
              className='rounded-r-none border-r-0 w-20 text-right'
              value={inputFile.newDimensions.width} type="number" id='resize'
              onChange={(e) => setImageWidth(inputFile, parseInt(e.target.value || '0'), { keepAspectRatio })}
            />
            <Input
              className='rounded-none border-r-0 border-l-0 w-7 text-center'
              value='x'
              disabled
              readOnly
            />
            <Input
              className='rounded-l-none border-l-0 w-20' type="number"
              value={inputFile.newDimensions.height}
              onChange={(e) => setImageHeight(inputFile, parseInt(e.target.value || '0'), { keepAspectRatio })}
            />
            <button className='p-2 items-center' onClick={() => setKeepAspectRatio(wasKeeping => !wasKeeping)}>
              <svg xmlns="http://www.w3.org/2000/svg" className={"h-5 w-5 " + (keepAspectRatio ? 'text-slate-50': 'text-slate-500')} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div className='flex flex-col flex-grow mb-4 mx-2'>
          <label className='text-sm pl-2 mb-1' htmlFor="out">Output folder</label>
          <div className='flex flex-row flex-grow'>
            <Input
              className='rounded-r-none flex flex-grow' type="text" id='out'
              value={inputFile.outputDirectory}
              readOnly
            />
            <button
              className='bg-indigo-500 border-0 text-slate-50 font-bold px-3 py-1 rounded-r-md transition ease-in-out hover:bg-indigo-400'
              onClick={() => setImageOutputDirectory(inputFile)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
