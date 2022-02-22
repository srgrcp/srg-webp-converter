import Link from 'next/link';
import { useState } from 'react';
import { useRecoilValue } from 'recoil'
import ConvertFilesSettingsModal from '../components/convert-files-settings-modal';
import InputFileList from '../components/input-file-list';
import { useConvertFiles, useSelectOutputDirectory, useApplyGlobalSettings } from '../store/callbacks';
import { selectAllInputFiles, selectIsConverting, selectOutputDirectory as sOutputDirectory } from '../store/selectors';
import { useGlobalQuality } from '../store/state';

export default function List() {
  const [isSettingsModalOpened, setIsSettingsModalOpened] = useState(false);
  const inputFiles = useRecoilValue(selectAllInputFiles);
  const outputDirectory = useRecoilValue(sOutputDirectory);
  const convertFiles = useConvertFiles();
  const selectOutputDirectory = useSelectOutputDirectory();
  const [globalQuality, setGlobalQuality] = useGlobalQuality();
  const applyGlobalSettings = useApplyGlobalSettings();
  const isConverting = useRecoilValue(selectIsConverting);

  return (
    <div className='container mx-auto py-5 px-4 md:px-8 lg:px-12 2xl:px-16 h-screen flex items-center'>
      <div className='flex h-full flex-col items-center w-full relative'>
        <button
          className='absolute top-0 right-0 px-5 py-1 rounded-md border border-slate-50/20 bg-transparent text-slate-50 transition ease-in-out hover:bg-slate-50/5'
          onClick={() => setIsSettingsModalOpened(true)}
        >Settings</button>

        <ConvertFilesSettingsModal
          isOpened={isSettingsModalOpened}
          onClose={() => setIsSettingsModalOpened(false)}
          selectOutputDirectory={selectOutputDirectory}
          outputDirectory={outputDirectory}
          globalQuality={globalQuality}
          setGlobalQuality={setGlobalQuality}
          applyGlobalSettings={applyGlobalSettings}
        />

        <p className="mb-6 font-bold text-xl text-slate-800 dark:text-slate-300">Imported images</p>

        <InputFileList inputFiles={inputFiles} />

        <div className='flex w-full py-7 justify-center items-center'>
          <Link href='/' passHref>
            <a className='font-bold text-indigo-500 border-2 border-indigo-500 rounded-md transition ease-in-out hover:bg-indigo-500 hover:text-slate-50 px-8 py-2 mr-1 flex justify-center flex-grow'>Back</a>
          </Link>
          <button className='font-bold bg-indigo-500 border-2 border-indigo-500 text-slate-50 rounded-md transition ease-in-out disabled:bg-indigo-400 disabled:border-indigo-400 disabled:cursor-not-allowed hover:bg-indigo-400 hover:border-indigo-400 px-8 py-2 ml-1 flex justify-center flex-grow' onClick={convertFiles} disabled={isConverting}>
          <svg className={"animate-spin -ml-1 mr-3 h-5 w-5 text-slate-50 " + (isConverting ? '': 'hidden')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
            {isConverting ? 'Processing...': 'Convert'}
          </button>
        </div>
      </div>
    </div>
  )
}
