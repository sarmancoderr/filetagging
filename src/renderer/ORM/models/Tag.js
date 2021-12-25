import { Model } from '@vuex-orm/core'

export default class Tag extends Model {
    static entity = 'tags'

    static primaryKey = 'tag_id'

    static fields () {
        return {
            tag_id: this.uid(),
            name: this.string()
        }
    }
}
