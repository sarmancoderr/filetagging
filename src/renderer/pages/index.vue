<template>
  <div>
    <h1>Listado de archivos</h1>
    <v-data-iterator :items="files">
      <template #default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card @click="() => doActionFor(item)">
              <v-card-title primary-title>
                <div>
                  <div>
                    <v-icon v-if="!item.isFile">mdi-folder</v-icon>
                    <v-icon v-else>mdi-file</v-icon>
                  </div>
                  <h3 class="headline mb-0">{{ item.filenName }}</h3>
                </div>
              </v-card-title>
              <v-card-text>
                <v-chip
                  v-for="tag in tagsFor(item)" :key="tag.name"
                  close @click:close="removeRelation(tag.relationId)"
                >
                  {{ tag.name }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <v-dialog v-if="showFileTaggingModal" :value="showFileTaggingModal" @click:outside="clearAutocomplete">
      <v-card>
        <v-card-title>
          Poniendo etiquetas a {{ fileTagging.filenName }}
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="tagSelection" :items="db.tags" :search-input.sync="newTagName"
            label="Poniendo etiquetas" item-text="name" item-value="name"
          >
            <template #no-data>
              <v-card elevation="0">
                <v-card-text>
                  <v-chip small color="success" @click="createTag">
                    Crear etiqueta
                  </v-chip>
                </v-card-text>
              </v-card>
            </template>
          </v-autocomplete>
          <v-chip
            v-for="tag in tagsFor(fileTagging)" :key="tag.name"
            close @click:close="removeTF(tag)"
          >
            {{ tag.name }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
    data () {
        return {
            tagSelection: '',
            fileTagging: null,
            newTagName: ''
        }
    },
    computed: {
        ...mapState('fs', ['files', 'currentPath']),
        ...mapState('db', ['db']),
        ...mapGetters('db', ['tagsFor']),
        showFileTaggingModal () {
            return this.fileTagging !== null
        }
    },
    watch: {
        currentPath () {
            this.readDir()
        },
        tagSelection () {
            this.createTag()
        }
    },
    mounted () {
        this.readDir()
    },
    methods: {
        ...mapActions('fs', ['readDir']),
        ...mapActions('db', ['createFilename', 'createTag',
            'renameTag', 'createRelation',
            'getIdFilename', 'getTagId']),
        ...mapMutations('db', ['removeRelation']),
        ...mapMutations('fs', ['setCurrentPath']),
        doActionFor (item) {
            if (item.isFile) {
                this.fileTagging = item
            } else {
                this.setCurrentPath(item.fullPath)
            }
        },
        removeRelation () {},
        async createTag () {
            if (!this.newTagName) return
            this.createRelation({
                fileId: await this.getIdFilename(this.fileTagging),
                tagId: await this.getTagId(this.newTagName)
            })
        },
        removeTF (relation) {
            this.$store.commit('db/removeRelation', relation)
            // this.removeRelation(relation)
        },
        clearAutocomplete () {
            this.tagSelection = ''
            this.newTagName = ''
            this.fileTagging = null
        }
    }
}
</script>
