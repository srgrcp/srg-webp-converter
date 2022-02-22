import { InputFile } from "../../shared/input-file";
import { exec } from "child_process";
import { ipcMain } from "electron";
import { cwebp } from "../lib/cwebp";

ipcMain.handle('convert-files', async (_, files: InputFile[]) => {
  try {
    for (const file of files) {
      exec(`${cwebp} "${file.filePath}" -o "${file.outputDirectory}/${file.fileName}.webp" -q ${file.quality} -short -progress`, (error, stdout, stderr) => {
        if (error !== null) {
          console.log(error);
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
})
