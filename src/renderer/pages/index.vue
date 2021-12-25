<template>
  <div>
    <h1>Listado de archivos</h1>
    <v-btn @click="getfile">fget file</v-btn>
    <v-btn @click="setTag">set tag</v-btn>
  </div>
</template>

<script>
import readdir from '../lib/readdir'
import File from '../ORM/models/File'
export default {
    data () {
        return {
            currentDir: require('os').homedir(),
            files: []
        }
    },
    async mounted () {
        const list = await readdir(this.currentDir)
        this.files = list

        await File.create({
            data: {
                path: list[0].fullPath,
                tags: [
                    { name: 'aaa' }
                ]
            }
        })

        const listFiles = File.query().with('tags').get()
        console.log(listFiles)
    },
    methods: {
        async getfile () {
            console.log(await this.files[0].fileDB())
        },
        async setTag () {
            await this.files[0].setTag('aaa')
        }
    }
}
</script>
