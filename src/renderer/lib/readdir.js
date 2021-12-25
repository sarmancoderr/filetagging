const fsP = require('fs/promises')
const path = require('path')

module.exports = async function readDir (pathFile) {
    const data = await fsP.readdir(pathFile)
    const listFilesDirs = await Promise.all(data.map(async file => {
        const stats = await fsP.stat(path.join(pathFile, file))
        return {
            ...stats,
            filenName: file,
            isFile: stats.isFile(),
            dir: pathFile,
            fullPath: path.resolve(pathFile, file)
        }
    }))
    return listFilesDirs
}
