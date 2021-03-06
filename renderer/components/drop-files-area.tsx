import { DragEvent } from "react";

export type DropFilesAreaProps = {
  handleOpenFiles: () => Promise<void>;
  getInputFiles: (filePaths: string[]) => Promise<void>;
}

export default function DropFilesArea({ handleOpenFiles, getInputFiles }: DropFilesAreaProps) {

  function dropHandler(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      const filePaths: string[] = []
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          filePaths.push(file.path);
        }
      }
      getInputFiles(filePaths);
    } 
  
    removeDragData(ev);
  }

  /**
   * Prevent default drag behavior (open/execute files)
   */
  function dragOverHandler(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  function removeDragData(ev: DragEvent<HTMLDivElement>) {
    if (ev.dataTransfer.items) {
      ev.dataTransfer.items.clear();
    } else {
      ev.dataTransfer.clearData();
    }
  }

  return (
    <>
      <h1 className="mb-6 font-bold text-xl text-slate-800 dark:text-slate-300">Select images to convert</h1>

      <div
        className="w-full max-w-md h-60 border-4 border-dashed border-slate-300 dark:border-slate-900 rounded-xl bg-slate-300/50 dark:bg-slate-900/50 flex flex-col justify-center items-center cursor-pointer"
        data-testid="drop-files-area"
        onClick={handleOpenFiles}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
      >
        <p className="text-slate-400 font-bold">Drag & Drop your files here</p>
      </div>
    </>
  );
}
