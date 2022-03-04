import { InputFile } from '@shared/input-file'
import React, { useState } from 'react'
import { useSetImageHeight, useSetImageOutputDirectory, useSetImageQuality, useSetImageWidth } from '../../store/callbacks'
import InputFileInfo from './row/input-file-info'
import InputFileSettings from './row/input-file-settings'

export type InputFileRowProps = {
  inputFile: InputFile
}

export default function InputFileRow({ inputFile }: InputFileRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const setImageQuality = useSetImageQuality();
  const setImageOutputDirectory = useSetImageOutputDirectory();
  const setImageWidth = useSetImageWidth();
  const setImageHeight = useSetImageHeight();

  return (
    <div className="w-full flex flex-col">
      <InputFileInfo inputFile={inputFile} setIsExpanded={setIsExpanded} />
      <InputFileSettings
        inputFile={inputFile}
        isExpanded={isExpanded}
        setImageQuality={setImageQuality}
        setImageOutputDirectory={setImageOutputDirectory}
        setImageWidth={setImageWidth}
        setImageHeight={setImageHeight}
      />
    </div>
  )
}
