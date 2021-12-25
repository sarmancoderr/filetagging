import { uuid } from 'uuidv4'

export default class Filename {
    constructor (path) {
        this.id = uuid()
        this.path = path
    }
}
