<template>
  <v-app>
    <v-app-bar app clipped-left fixed>
      <v-app-bar-nav-icon />

      <v-toolbar-title>Tag files</v-toolbar-title>

      <v-spacer />

      <v-btn color="primary" elevation="0" @click="upLevel">
        Subir un nivel
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer fixed app clipped>
      <v-card elevation="0">
        <v-card-title primary-title>
          <h3 class="headline mb-0">Listado de etiquetas</h3>
        </v-card-title>
        <v-card-text />
      </v-card>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
