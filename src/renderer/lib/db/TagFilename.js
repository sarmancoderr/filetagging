import { uuid } from 'uuidv4'

export default class TagFilename {
    constructor (tagReference, filenameReference) {
        this.id = uuid()
        this.tagReference = tagReference
        this.filenameReference = filenameReference
    }
}
