import Filename from '../lib/db/Filename'
import Tag from '../lib/db/Tag'
import TagFilename from '../lib/db/TagFilename'

const initialState = {
    currentDB: require('os').homedir(),
    tags: [],
    filenames: [],
    tagFilenames: []
}

export const state = () => ({
    tagsSelected: [],
    db: {
        ...initialState
    }
})

export const mutations = {
    clearState (state) {
        state.db = initialState
    },
    tag (state, tag) {
        state.db.tags.push(tag)
    },
    file (state, file) {
        state.db.filenames.push(file)
    },
    relation (state, relation) {
        state.db.tagFilenames.push(relation)
    },
    tagSelection (state, tag) {
        if (!state.tagsSelected.filter(ctag => tag.name === ctag.name)[0]) {
            state.tagsSelected.push(tag)
        }
    },
    removeTagSelection (state, tag) {
        state.tagsSelected = state.tagsSelected.filter(ctag => tag.name !== ctag.name)
    },
    removeRelation (state, relation) {
        state.db.tagFilenames = state.db.tagFilenames.filter(tf => tf.id !== relation.relationId)
        const idTag = state.db.tags.filter(t => t.name === relation.name)[0].id
        const relations = state.db.tagFilenames.filter(t => t.tagReference === idTag)
        if (relations.length === 0) {
            state.db.tags = state.db.tags.filter(t => t.id !== idTag)
        }
    }
}

export const getters = {
    tags: state => {
        if (state.tagsSelected.length === 0) {
            return state.db.tags
        } else {
            return state.db.tags
        }
    },
    fileWithTags (state) {
        const { filenames, tagFilenames } = state.db

        const tagsId = state.tagsSelected.map(a => a.id)
        console.log(tagsId)

        return tagFilenames.filter(tf => tagsId.indexOf(tf.tagReference))
            .map(tf => filenames.filter(f => f.id === tf.filenameReference)[0])
    },
    tagsFor: state => file => {
        const { tags, filenames, tagFilenames } = state.db
        const results = filenames.filter(f => f.path === file.fullPath)
        const fid = results.length > 0 ? results[0].id : null
        if (!fid) return []
        return tagFilenames.filter(tf => tf.filenameReference === fid)
            .map(tf => {
                const tag = tags.filter(t => tf.tagReference === t.id)[0]
                return {
                    ...tag,
                    relationId: tf.id
                }
            })
    }
}

export const actions = {
    openDB (ctx, path) {
        ctx.commit('clearState')
    },
    saveDB () {},

    createFilename (ctx, path) {},
    getIdFilename (ctx, file) {
        const filename = ctx.state.db.filenames.filter(a => a.path === file.fullPath)[0]
        if (!filename) {
            const newTag = new Filename(file.fullPath)
            ctx.commit('file', newTag)
            return newTag.id
        } else {
            return filename.id
        }
    },

    createTag (ctx, path) {},
    renameTag (ctx, id, newName) {},
    getTagId (ctx, tagName) {
        const tag = ctx.state.db.tags.filter(a => a.name === tagName)[0]
        if (!tag) {
            const newTag = new Tag(tagName)
            ctx.commit('tag', newTag)
            return newTag.id
        } else {
            return tag.id
        }
    },

    createRelation (ctx, { fileId, tagId }) {
        const q = ctx.state.db.tagFilenames.filter(t => {
            return t.tagReference === tagId && t.filenameReference === fileId
        })[0]
        if (q) {
            return
        }
        const relation = new TagFilename(tagId, fileId)
        ctx.commit('relation', relation)
    }
}
