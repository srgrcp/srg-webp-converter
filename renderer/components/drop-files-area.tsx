export default function DropFilesArea({ handleOpenFiles }) {
  
  return (
    <>
      <p className="mb-6 font-bold text-xl text-slate-800 dark:text-slate-300">Select images to convert</p>

      <div
        className="w-full max-w-md h-60 border-4 border-dashed border-slate-300 dark:border-slate-900 rounded-xl bg-slate-300/50 dark:bg-slate-900/50 flex flex-col justify-center items-center cursor-pointer"
        onClick={handleOpenFiles}
      >
        <p className="text-slate-400 font-bold">Drag & Drop your files here</p>
      </div>
    </>
  );
}
