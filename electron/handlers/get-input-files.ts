import { ipcMain } from 'electron';
import { filePathsToInputFiles } from '../lib/file-paths-to-input-files';

ipcMain.handle('get-input-files', (_, filePaths: string[]) => {
  return filePathsToInputFiles(filePaths);
});
