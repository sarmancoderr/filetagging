import { Model } from '@vuex-orm/core'
import Tag from './Tag'

export default class File extends Model {
    static entity = 'files'

    static primaryKey = 'file_id'

    static fields () {
        return {
            file_id: this.uid(),
            path: this.string(),
            tags: this.hasMany(Tag, 'tags_id')
        }
    }
}
