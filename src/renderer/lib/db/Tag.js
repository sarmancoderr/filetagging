import { uuid } from 'uuidv4'

export default class Tag {
    constructor (name) {
        this.id = uuid()
        this.name = name
    }
}
