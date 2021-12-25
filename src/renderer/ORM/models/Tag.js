import { Model } from '@vuex-orm/core'
import FileTag from './FileTag'

export default class Tag extends Model {
    static entity = 'tags'

    static fields () {
        return {
            id: this.attr(null),
            name: this.string(),
            files: this.belongsToMany(File, FileTag, 'tag_id', 'file_id')
        }
    }
}
