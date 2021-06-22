<template>
  <div>
    <v-app-bar color="transparent" elevation="0">
      <v-app-bar-nav-icon
          v-bind:style="[drawer ? {'margin-left':'70px'} : {'margin-left': '10px'}]"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      
      <div style="margin-left: 140px">
        <v-tooltip v-if="!$vuetify.theme.dark" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" small fab @click="darkMode">
              <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
            </v-btn>
          </template>
          <span>Activer Mode Sombre</span>
        </v-tooltip>

        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" small fab @click="darkMode">
              <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
            </v-btn>
          </template>
          <span>Désactiver Mode Sombre</span>
        </v-tooltip>
      </div>
      <v-btn icon @click.prevent="performLogout">
        <span class="material-icons"> logout </span>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
//import Popup from './Popup.vue'
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(v) {
        return this.$store.commit("toggleDrawer", v);
      },
    },
  },
  methods: {
    darkMode() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
        },
    performLogout() {
      this.$store.dispatch("performLogoutAction");
      this.$router.push("/login");
    },
    toggleDrawer: function () {
      this.$store.commit("toggleDrawerState");
    },
    /*darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },*/
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
        if (theme == "true") {
            this.$vuetify.theme.dark = true;
        } else {
            this.$vuetify.theme.dark = false;
        }
    }
},
};
</script>

