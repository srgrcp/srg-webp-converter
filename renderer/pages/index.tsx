import { useRouter } from 'next/router';
import { useCallback } from 'react';
import DropFilesArea from '../components/drop-files-area'
import { useGetInputFiles, useOpenFileDialog } from '../store/callbacks';

export default function Home() {
  const router = useRouter();
  const openFileDialog = useOpenFileDialog();
  const getInputFiles = useGetInputFiles();

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
  const getInputFilesAndRedirect = useCallback(
    async (filePaths: string[]) => {
      const filesCount = await getInputFiles(filePaths);
      if (filesCount) {
        router.push("/list");
      }
    },
    [router, getInputFiles],
  )

  return (
    <div className='container mx-auto py-5 px-4 md:px-8 lg:px-12 2xl:px-16 h-screen flex items-center'>
      <div className='flex flex-grow flex-col items-center w-full'>
        <DropFilesArea handleOpenFiles={openFileDialogAndRedirect} getInputFiles={getInputFilesAndRedirect} />
      </div>
    </div>
  )
}
