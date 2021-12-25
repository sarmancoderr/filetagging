import readdir from '../lib/readdir'

export const state = () => ({
    files: [],
    currentPath: require('os').homedir()
})

export const mutations = {
    files (state, files) {
        state.files = files
    },
    setCurrentPath (state, path) {
        state.currentPath = path
    }
}

export const getters = {}

export const actions = {
    async readDir (ctx) {
        const data = await readdir(ctx.state.currentPath)
        ctx.commit('files', data)
    },
    async upLevel (ctx) {
        ctx.commit('setCurrentPath', require('path').resolve(ctx.state.currentPath, '..'))
    }
}
