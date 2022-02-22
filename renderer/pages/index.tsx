import { InputFile } from '@shared/input-file';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil'
import DropFilesArea from '../components/drop-files-area'
import { useOpenFileDialog, useSetInputFiles } from '../store/callbacks';
import { selectInputFilesLength } from '../store/selectors';

export default function Home() {
  const inputFilesCount = useRecoilValue(selectInputFilesLength);
  const router = useRouter();
  const openFileDialog = useOpenFileDialog();
  const setInputFiles = useSetInputFiles();

  const openFileDialogAndRedirect = useCallback(
    async () => {
      const filesCount = await openFileDialog();
      if (filesCount) {
        router.push("/list");
      }
    },
    [router, openFileDialog],
  )

  // Used when files are dropped
  const setInputFilesAndRedirect = useCallback(
    async (files: InputFile[]) => {
      const filesCount = await setInputFiles(files);
      if (filesCount) {
        router.push("/list");
      }
    },
    [router, setInputFiles],
  )

  return (
    <div className='container mx-auto py-5 px-4 md:px-8 lg:px-12 2xl:px-16 h-screen flex items-center'>
      <div className='flex flex-grow flex-col items-center w-full'>
        { !inputFilesCount && <DropFilesArea handleOpenFiles={openFileDialogAndRedirect} setInputFiles={setInputFilesAndRedirect} />}
      </div>
    </div>
  )
}
