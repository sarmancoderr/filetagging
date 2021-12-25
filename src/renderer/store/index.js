import VuexORM from '@vuex-orm/core'
import database from '../ORM'

export const plugins = [
    VuexORM.install(database, { namespace: 'dbtags' })
]
