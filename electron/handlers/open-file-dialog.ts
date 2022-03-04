import { InputFile } from '../../shared/input-file';
import { dialog, ipcMain, IpcMainInvokeEvent } from 'electron';
import { filePathsToInputFiles } from '../lib/file-paths-to-input-files';

ipcMain.handle(
  'open-file-dialog',
  async (event: IpcMainInvokeEvent, message: any): Promise<InputFile[]> => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'] },
          { name: 'All Files', extensions: ['*'] },
        ],
      });

      if (result.canceled) {
        return [];
      }

      return await filePathsToInputFiles(result.filePaths);
    } catch (error: any) {
      //dialog.showErrorBox('Error', error.message);
      return [];
    }
  }
);
