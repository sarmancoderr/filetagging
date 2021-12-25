import VuexORM from '@vuex-orm/core'
import Tag from './models/Tag'
import File from './models/File'
import FileTag from './models/FileTag'

export const database = new VuexORM.Database()

database.register(Tag)
database.register(File)

database.register(FileTag)

export default database
