import { InputFile } from "@shared/input-file";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('webpConverter', {
  openFiles: async (): Promise<InputFile[]> => {
    const inputFiles = await ipcRenderer.invoke('open-file-dialog');

    return inputFiles;
  },
  convertFiles: async (inputFiles: InputFile[]): Promise<void> => {
    await ipcRenderer.invoke('convert-files', inputFiles);
  },
  selectOutputDirectory: async (): Promise<string> => {
    return await ipcRenderer.invoke('select-output-directory');
  }
});
