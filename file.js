const fs = require('fs');

//-----ファイル一覧-----//

const FileType = {
    File: 'file',
    Directory: 'directory',
    Unknown: 'unknown'
}
const getFileType = path => {
    try {
        const stat = fs.statSync(path);

        switch (true) {
            case stat.isFile():
                return FileType.File;

            case stat.isDirectory():
                return FileType.Directory;

            default:
                return FileType.Unknown;
        }

    } catch (e) {
        return FileType.Unknown;
    }
}
const listFiles = dirPath => {
    const ret = [];
    const paths = fs.readdirSync(dirPath);

    paths.forEach(a => {
        const path = `${dirPath}/${a}`;

        switch (getFileType(path)) {
            case FileType.File:
                ret.push(path);
                break;

            case FileType.Directory:
                ret.push(...listFiles(path));
                break;

            default:
        }
    })

    return ret;
};
exports.listFiles = listFiles;

//-----ディレクトリ作成-----//


exports.create = (directory_String) => {

    const directory_Array = directory_String.split("/").slice(1);


    for (let loop1 = 0; loop1 < directory_Array.length; loop1++) {

        let directory = ".";

        for (let loop2 = 0; loop2 <= loop1; loop2++) {
            directory += `/${directory_Array[loop2]}`;
        }
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
            console.log(`CreateDirectory: ${directory}`)
        }
    }
}