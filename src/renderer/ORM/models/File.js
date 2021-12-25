import { Model } from '@vuex-orm/core'
import FileTag from './FileTag'
import Tag from './Tag'

export default class File extends Model {
    static entity = 'files'

    static fields () {
        return {
            id: this.attr(null),
            path: this.string(),
        }
    }
}
