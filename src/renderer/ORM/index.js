import VuexORM from '@vuex-orm/core'
import Tag from './models/Tag'
import File from './models/File'

export const database = new VuexORM.Database()

database.register(Tag)
database.register(File)

export default database
