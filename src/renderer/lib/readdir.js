const fsP = require('fs/promises')
const path = require('path')
const { default: FSFile } = require('./FSFile')

module.exports = async function readDir (pathFile) {
    const data = await fsP.readdir(pathFile)
    const listFilesDirs = await Promise.all(data.map(async file => {
        const stats = await fsP.stat(path.join(pathFile, file))
        return new FSFile(file, stats, pathFile)
    }))
    return listFilesDirs
}
