import { InputFile } from "@shared/input-file";
import { dialog, ipcMain, IpcMainInvokeEvent } from "electron";
import { lstat } from "fs/promises";
import { formatBytes } from "../lib/format-bytes";

ipcMain.handle('open-file-dialog', async (event: IpcMainInvokeEvent, message: any): Promise<InputFile[]> => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'] },
        { name: 'All Files', extensions: ['*'] }
      ],
    });

    if (result.canceled) {
      return [];
    }

    const inputFiles: InputFile[] = [];
    for (const filePath of result.filePaths) {
      const fileStat = await lstat(filePath);
      let fileName = filePath.split(/[\/\\]/).pop();
      const outputDirectory = filePath.replace(fileName, '').substring(0, filePath.length - 1);
      const fileExtension = '.' + fileName.split('.').pop();
      fileName = fileName.split('.').slice(0, -1).join('.');
      const size = formatBytes(fileStat.size);
      inputFiles.push({
        filePath,
        fileName,
        fileExtension,
        size,
        outputDirectory,
        quality: 80,
      });
    }
    return inputFiles;
  } catch (error: any) {
    //dialog.showErrorBox('Error', error.message);
    return [];
  }
});
