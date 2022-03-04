import React from 'react'
import Input from './input'

export type ModalProps = {
  isOpened: boolean
  onClose: () => void
  selectOutputDirectory: () => Promise<string>
  outputDirectory: string
  globalQuality: number
  setGlobalQuality: (quality: number) => void
  applyGlobalSettings: () => Promise<void>
}

export default function ConvertFilesSettingsModal({
    isOpened,
    onClose,
    selectOutputDirectory,
    outputDirectory,
    globalQuality,
    setGlobalQuality,
    applyGlobalSettings
  }: ModalProps) {
  return (
    <>
      <div className={'fixed top-0 left-0 w-screen h-screen bg-black/50 cursor-pointer ' + (isOpened ? 'flex': 'hidden')} onClick={onClose}></div>
      <div className={'fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex-col max-w-full p-4 rounded-xl border border-slate-700 dark:bg-slate-800 dark:text-slate-50 ' + (isOpened ? 'flex': 'hidden')}>
        <div className='flex flex-wrap'>
          <div className='flex flex-col flex-grow mb-4 mr-2'>
            <label className='text-sm pl-2 mb-1' htmlFor="quality">Quality</label>
            <Input value={globalQuality} onChange={e => setGlobalQuality(parseInt(e.target.value))} type="number" id='quality' />
          </div>
          <div className='flex flex-col flex-grow mb-4 ml-2'>
            <label className='text-sm pl-2 mb-1' htmlFor="out">Output folder</label>
            <div className='flex flex-row flex-grow'>
              <Input className='rounded-r-none flex flex-grow' type="text" id='out' value={outputDirectory} readOnly />
              <button
                className='bg-indigo-500 border-0 text-slate-50 font-bold px-3 py-1 rounded-r-md transition ease-in-out hover:bg-indigo-400'
                onClick={selectOutputDirectory}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className='w-full flex'>
          <button
            className='font-bold bg-indigo-500 border-2 border-indigo-500 text-slate-50 rounded-md transition ease-in-out hover:bg-indigo-400 hover:border-indigo-400 px-8 py-2 ml-1 flex justify-center flex-grow'
            onClick={() => {applyGlobalSettings(); onClose();}}
          >Apply to all</button>
        </div>
      </div>
    </>
  )
}
