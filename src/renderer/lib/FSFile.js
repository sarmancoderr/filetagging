import File from '../ORM/models/File'
import Tag from '../ORM/models/Tag'

const path = require('path')

export default class FSFile {
    constructor (fileName, stats, pathFile) {
        this.fileName = fileName
        this.isFile = stats.isFile()
        this.dir = pathFile
        this.fullPath = path.resolve(pathFile, fileName)
    }

    async fileDB () {
        const q = File.query().withAll().where('path', this.fullPath)

        if (!q.exists()) {
            return await File.create({
                data: {
                    path: this.fullPath
                }
            })
        } else {
            console.log('ya existia')
            return q.first()
        }
    }

    async setTag () {
        const _fileDB = await this.fileDB()
        console.log(_fileDB.file_id)
        File.update({
            where: {
                file_id: _fileDB.file_id
            },
            update: {
                tags: [Tag.create({ data: { name: 'aaa' } })]
            }
        })
    }
}
