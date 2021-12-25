const { Model } = require('@vuex-orm/core')

export default class FileTag extends Model {
    static entity = 'file_tag'

    static primaryKey = ['file_id', 'tag_id']

    static fileds () {
        return {
            file_id: this.attr(),
            tag_id: this.attr()
        }
    }
}
