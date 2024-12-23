import { addFilesToUrdf, dataTransferToFiles } from "@/urdf/dragDrop";
import { openFile } from "@/utils";
import { FC, useContext, useEffect, useRef } from "react";
import { EditorContext } from "../LowCodeEditor/editorContext";
interface FileSelectorProps {

}
const FileSelector:FC<FileSelectorProps> = ()=>{
    const {urdfInstance} = useContext(EditorContext);
    const dropRef = useRef<HTMLDivElement|null>(null);
    useEffect(()=>{
      if(urdfInstance && dropRef.current){
        const dragInFn = (e:DragEvent) => e.preventDefault();
        const dropFileFn = (e:DragEvent) => {
            e.preventDefault();
            //convert the files
            if (e.dataTransfer) {
                dataTransferToFiles(e.dataTransfer).then(files => {
                    addFilesToUrdf(urdfInstance,files);
                });
            }
        };
        //drag to add file folder
        dropRef.current.addEventListener('dragover', dragInFn);
        dropRef.current.addEventListener('dragenter', dragInFn);
        dropRef.current.addEventListener('drop', dropFileFn);
        return ()=>{
            dropRef.current?.removeEventListener('dragover', dragInFn);
            dropRef.current?.removeEventListener('dragenter', dragInFn);
            dropRef.current?.removeEventListener('drop', dropFileFn);
        }
      }
    },[urdfInstance,dropRef]);
    const openURDFFile = async()=>{
        if(!urdfInstance) return;
        const changeEvent = await openFile("*");
        const files:Record<string,File> = Object.create(null);
        const inputFiles = (changeEvent.target as HTMLInputElement).files;
        for(let f of inputFiles!) {
            files[f.webkitRelativePath] = f;
        }
        addFilesToUrdf(urdfInstance,files);
    }
    return (<div onClick={openURDFFile} ref={dropRef} className="w-[60px] h-[60px] border border-dashed flex items-center justify-center">
        <span>+</span>
    </div>)
}

export default FileSelector;