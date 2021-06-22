<template>
  <v-navigation-drawer app style="background: url(~assets/navv.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width:330px;
  "
  :style="{'background-color': '#03244d'}"
  v-model="drawer"
  >
    <v-list dense height="150" elevation="17"  >
      <v-list-item>
        <v-list-item-action>
          <v-img @click="logg()" src="../assets/logo.png" style="margin-left:10px" width="130px" height="auto" ></v-img>
          <v-list-item-title style="color:#d9dab0;margin-left:40px "><i><h6>Beyond Quality    '</h6></i></v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <div v-if="role=='admin'">
    <v-list dense shaped style="padding-top:60px">

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        router
        :to="item.route"
        class="white--text"

      >

        <v-list-item-icon>
          <v-icon medium  style="color:white"> {{ item.icon }} </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text"  style="color:white;font-weight: bold;margin-top: 10px;
                        margin-bottom: 10px">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

<div style="padding-top: 100px;padding-left: 15px">
      <v-card
          class="ma-xl-auto"
          max-width="380"
          style="border-radius:20px;"
          :elevation="24"
      >
        <v-list-item three-line style="">
          <v-list-item-content>
            <div class="overline mb-3">
              {{name.role}}
            </div>
            <v-list-item-title class="headline mb-2">
               {{name.full_name}}
            </v-list-item-title>
            <v-list-item-subtitle>Email : {{name.email}}</v-list-item-subtitle>
          </v-list-item-content>

          
        </v-list-item>
      </v-card>
      </div >
      </v-list>
      </div>
      <div v-else-if="role=='client'">
     <v-list dense shaped style="padding-top:60px">

      <v-list-item
        v-for="(item, i) in clients"
        :key="i"
        router
        :to="item.route"
        class="black--text"

      >

        <v-list-item-icon>
          <v-icon medium  style="color:white"> {{ item.icon }} </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text"  style="color:white;font-weight: bold;margin-top: 10px;
                        margin-bottom: 10px">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

<div style="padding-top: 100px;padding-left: 15px">
      <v-card
          class="ma-xl-auto"
          max-width="380"
          style="border-radius:20px;"
          :elevation="24"
      >
        <v-list-item three-line style="">
          <v-list-item-content>
            <div class="overline mb-3">
              {{name.role}}
            </div>
            <v-list-item-title class="headline mb-2">
               {{name.full_name}}
            </v-list-item-title>
            <v-list-item-subtitle>Email : {{name.email}}</v-list-item-subtitle>
          </v-list-item-content>

          
        </v-list-item>
      </v-card>
      </div >
      </v-list>    
      </div>
         <div v-else-if="role=='responsable'">
     <v-list dense shaped style="padding-top:60px">

      <v-list-item
        v-for="(item, i) in responsable"
        :key="i"
        router
        :to="item.route"
        class="black--text"

      >

        <v-list-item-icon>
          <v-icon medium  style="color:white"> {{ item.icon }} </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text"  style="color:white;font-weight: bold;margin-top: 10px;
                        margin-bottom: 10px">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

<div style="padding-top: 100px;padding-left: 15px">
      <v-card
          class="ma-xl-auto"
          max-width="380"
          style="border-radius:20px;"
          :elevation="24"
      >
        <v-list-item three-line style="">
          <v-list-item-content>
            <div class="overline mb-3">
              {{name.role}}
            </div>
            <v-list-item-title class="headline mb-2">
               {{name.full_name}}
            </v-list-item-title>
            <v-list-item-subtitle>Email : {{name.email}}</v-list-item-subtitle>
          </v-list-item-content>

          
        </v-list-item>
      </v-card>
      </div >
      </v-list>    
      </div>
    <v-spacer></v-spacer>
    
  </v-navigation-drawer>

</template>
<script>
// <v-img src="../assets/webMaintenance.gif" height="140"></v-img>
//import Popup from './Popup.vue'
export default {
  data: () => ({
    items: [
      { text: "  Admin Dashboad", icon: "widgets", route: "/Dashboard" },
      
      { text: "Utilisateurs", icon: "fa fa-users", route: "/employees" },
      { text: "Missions", icon: "fas fa-briefcase", route: "/missions" },
      { text: "Clients", icon: "fa fa-users", route: "/clients" },
     // { text: "Pointage", icon: "fas fa-user-check", route: "/pointage" },
    //  { text: "Rapport", icon: "as fa-clipboard-list", route: "/rapport" },
   //   { text: "Articles", icon: "article", route: "/Articles" }
    ],
     responsable: [
      { text: "Missions", icon: "fas fa-briefcase", route: "/missions" },
     // { text: "Pointage", icon: "fas fa-user-check", route: "/pointage" },
    //  { text: "Rapport", icon: "as fa-clipboard-list", route: "/rapport" },
   //   { text: "Articles", icon: "article", route: "/Articles" }
    ],
     clients: [
      //  { text: 'Mon Compte', icon: 'mdi-account' },
        {text: "Missions", icon: "fas fa-briefcase", route: "/clientmissions" },
      ],
  }),
  components: {
    //Popup
  },
  computed: {
    drawer: {
      get () { return this.$store.getters.drawer },
      set (v) { return this.$store.commit('toggleDrawer', v) },
      },
      loggedIn(){ return this.$store.getters.loggedIn},
      name() { return this.$store.getters.getUser; },
      role() { return this.$store.getters.getRole; },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
<style lang="scss">
h4,
p {
  color: #e9b035;
  text-align: center;
}
v-list-item-title {
  color: white;
}
</style>
