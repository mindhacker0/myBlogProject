// Converts a datatransfer structer into an object with all paths and files
// listed out. Returns a promise that resolves with the file structure.
export function dataTransferToFiles(dataTransfer) {

    if (!(dataTransfer instanceof DataTransfer)) {

        throw new Error('Data must be of type "DataTransfer"', dataTransfer);

    }

    const files = {};

    // recurse down the webkit file structure resolving
    // the paths to files names to store in the `files`
    // object
    function recurseDirectory(item) {

        if (item.isFile) {

            return new Promise(resolve => {
                item.file(file => {
                    files[item.fullPath] = file;
                    resolve();
                });
            });

        } else {

            const reader = item.createReader();

            return new Promise(resolve => {

                const promises = [];

                // exhaustively read all the directory entries
                function readNextEntries() {

                    reader.readEntries(et => {

                        if (et.length === 0) {

                            Promise.all(promises).then(() => resolve());

                        } else {

                            et.forEach(e => {

                                promises.push(recurseDirectory(e));

                            });
                            readNextEntries();

                        }

                    });

                }

                readNextEntries();

            });
        }
    }

    return new Promise(resolve => {

        // Traverse down the tree and add the files into the zip
        const dtitems = dataTransfer.items && [...dataTransfer.items];
        const dtfiles = [...dataTransfer.files];

        if (dtitems && dtitems.length && dtitems[0].webkitGetAsEntry) {

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
                .forEach(f => files['/' + f.name] = f);

            resolve(files);

        }
    });
}

export function addFilesToUrdf(viewer,files){
    const cleanFilePath = path => {
        return path
            .replace(/\\/g, '/')
            .split(/\//g)
            .reduce((acc, el) => {

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
    viewer.urdf = filesNames.filter(n => /urdf$/i.test(n)).shift();
}