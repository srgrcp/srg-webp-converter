import { dialog, ipcMain } from "electron";

ipcMain.handle('select-output-directory', async () => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    if (result.canceled) {
      return '';
    }

    return result.filePaths[0];
  } catch (error) {
    console.log(error);
    return '';
  }
})
