// Converts a datatransfer structer into an object with all paths and files
import URDFCustomManipulator from "./URDFCustomManipulator";

// listed out. Returns a promise that resolves with the file structure.
export function dataTransferToFiles(dataTransfer:DataTransfer) {

    if (!(dataTransfer instanceof DataTransfer)) {

        throw new Error('Data must be of type "DataTransfer"');

    }

    const files:Record<string, File> = {};

    // recurse down the webkit file structure resolving
    // the paths to files names to store in the `files`
    // object
    function recurseDirectory(item: FileSystemEntry | null) {

        if (item?.isFile) {

            return new Promise<void>(resolve => {
                (item as FileSystemFileEntry).file((file: File) => {
                    files[item.fullPath] = file;
                    resolve();
                });
            });

        } else if (item?.isDirectory) {

            const reader = (item as FileSystemDirectoryEntry).createReader();

            return new Promise<void>(resolve => {

                const promises: Promise<void>[] = [];

                // exhaustively read all the directory entries
                function readNextEntries() {

                    reader.readEntries((et: any[]) => {

                        if (et.length === 0) {

                            Promise.all(promises).then(() => resolve());

                        } else {

                            et.forEach((e: any) => {
                                const promise = recurseDirectory(e);
                                if (promise) {
                                    promises.push(promise);
                                }
                            });
                            readNextEntries();

                        }

                    });

                }

                readNextEntries();

            });
        }
    }

    return new Promise<Record<string, File>>(resolve => {

        // Traverse down the tree and add the files into the zip
        const dtitems = dataTransfer.items && [...dataTransfer.items];
        const dtfiles = [...dataTransfer.files];

        if (dtitems && dtitems.length && typeof dtitems[0].webkitGetAsEntry === 'function') {

            const promises = [];
            for (let i = 0; i < dtitems.length; i++) {
                const item = dtitems[i];
                const entry = item.webkitGetAsEntry();

                promises.push(recurseDirectory(entry));

            }
            Promise.all(promises).then(() => resolve(files));

        } else {

            // add a '/' prefix to math the file directory entry
            // on webkit browsers
            dtfiles
                .filter(f => f.size !== 0)
                .forEach(f => {
                    const key = '/' + f.name;
                    files[key] = f;
                });

            resolve(files);

        }
    });
}

export function addFilesToUrdf(viewer:URDFCustomManipulator,files:Record<string,File>){
    const cleanFilePath = (path: string) => {
        return path
            .replace(/\\/g, '/')
            .split(/\//g)
            .reduce((acc: any[], el: string) => {

                if (el === '..') acc.pop();
                else if (el !== '.') acc.push(el);
                return acc;

            }, [])
            .join('/');
    };
    // set the loader url modifier to check the list
    // of files
    const fileNames = Object.keys(files).map(n => cleanFilePath(n));
    viewer.urlModifierFunc = url => {

        // find the matching file given the requested url
        const cleaned = cleanFilePath(url.replace(viewer.package, ''));
        const fileName = fileNames
            .filter(name => {

                // check if the end of file and url are the same
                const len = Math.min(name.length, cleaned.length);
                return cleaned.substr(cleaned.length - len) === name.substr(name.length - len);

            }).pop();

        if (fileName !== undefined) {

            // revoke the url after it's been used
            const bloburl = URL.createObjectURL(files[fileName]);
            requestAnimationFrame(() => URL.revokeObjectURL(bloburl));

            return bloburl;

        }
        return url;
    };
    const filesNames = Object.keys(files);
    const urdfFile = filesNames.filter(n => /urdf$/i.test(n)).shift();
    if (!urdfFile) {
        throw new Error('No URDF file found in the provided files');
    }
    viewer.urdf = urdfFile;
}