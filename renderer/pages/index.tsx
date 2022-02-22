import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil'
import DropFilesArea from '../components/drop-files-area'
import { useOpenFileDialog } from '../store/callbacks';
import { selectInputFilesLength } from '../store/selectors';

export default function Home() {
  const inputFilesCount = useRecoilValue(selectInputFilesLength);
  const router = useRouter();
  const openFileDialog = useOpenFileDialog();

  const openFileDialogAndRedirect = useCallback(
    async () => {
      const filesCount = await openFileDialog();
      if (filesCount) {
        router.push("/list");
      }
    },
    [router, openFileDialog],
  )

  return (
    <div className='container mx-auto py-5 px-4 md:px-8 lg:px-12 2xl:px-16 h-screen flex items-center'>
      <div className='flex flex-grow flex-col items-center w-full'>
        { !inputFilesCount && <DropFilesArea handleOpenFiles={openFileDialogAndRedirect} />}
      </div>
    </div>
  )
}
